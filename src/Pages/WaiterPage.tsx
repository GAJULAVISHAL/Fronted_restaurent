// src/pages/WaiterPage.tsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { WaiterSidebar } from '../components/WaiterComponents/WaiterNavBar';
import { NewOrderPage } from '../components/WaiterComponents/WaiterOrder';
import { useItems } from '../hooks/Fetchitems';
import { WaiterLoading } from '../components/Loading';
import { ActiveOrder, OrderItem } from '../types'; 

export type WaiterView =  'new-order';

export const WaiterPage = () => {
    const [activeView, setActiveView] = useState<WaiterView>('new-order');
    const { items: menuItems, loading: isLoading } = useItems();

    const [socket, setSocket] = useState<WebSocket | null>(null);

    // 2. Effect to establish and manage the WebSocket connection
    useEffect(() => {
        const newSocket = new WebSocket(`ws://localhost:8080/?token=${localStorage.getItem('token')}`);
        setSocket(newSocket);

        newSocket.onopen = () => console.log("Waiter WebSocket Connected");
        newSocket.onclose = () => console.log("Waiter WebSocket Disconnected");


        return () => newSocket.close(); // Cleanup on unmount
    }, []); // Runs only once

    // 3. Handler function to place an order (passed to NewOrderPage)
    const handlePlaceOrder = async (orderData: { tableNumber: number; items: OrderItem[] }) => {
        const { tableNumber, items } = orderData;

        if (!tableNumber || items.length === 0 || !socket) {
            throw new Error("Cannot place order: Missing table, items, or socket connection.");
        }

        // a. Post to the backend to save in DB
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/order/placeOrder`, {
            tableNumber: tableNumber,
            items: items.map(item => ({ menuItemId: item.id, quantity: item.quantity })),
        }, {
            headers: { Authorization: `${localStorage.getItem('token')}` }
        });

        // b. Prepare the full order object to broadcast
        const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const orderForSocket: ActiveOrder = {
            tableNumber,
            items,
            totalPrice,
            createdAt: Date.now(), // Add a timestamp
        };

        // c. Broadcast the new order via WebSocket
        socket.send(JSON.stringify(orderForSocket));
    };

    const viewTitles: Record<WaiterView, string> = {
        'new-order': 'Create New Order',
    };

    const renderActiveView = () => {
        if (isLoading) {
            return <WaiterLoading />;
        }

        switch (activeView) {

            case 'new-order':
                return (
                    <NewOrderPage 
                        onPlaceOrder={handlePlaceOrder} 
                        menuItems={menuItems}
                    />
                );
            
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen font-sans">
            <WaiterSidebar activeView={activeView} setActiveView={setActiveView} />
            <main className="pt-20 md:pt-8 px-4 sm:px-6 lg:px-8 md:ml-64">
                <h1 className="text-3xl font-bold text-slate-800 mb-6">
                    {viewTitles[activeView]}
                </h1>
                {renderActiveView()}
            </main>
        </div>
    );
};