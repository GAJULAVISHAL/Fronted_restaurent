// src/pages/KitchenPage.tsx
import { useState, useEffect } from "react";
import { KitchenOrderCard, Order } from "../components/KitchenComponents/KitchenOrderCard";
import { Sidebar } from "../components/KitchenComponents/AppBar"; // Import the new Sidebar

// The Hamburger Menu Icon component
const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

export const KitchenPage = () => {
    // State to manage sidebar visibility
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const [orders, setOrders] = useState<Record<string, Order[]>>({
        new: [],
        preparing: [],
        ready: [],
    });

    useEffect(() => {
        const ws = new WebSocket(`ws:localhost:8080/?token=${localStorage.getItem('token')}`);
        ws.onopen = () => console.log("Connected to WebSocket Server");
        ws.onmessage = (event) => {
            const newOrderData = JSON.parse(event.data);
            const newOrder: Order = { ...newOrderData, timestamp: Date.now() };
            setOrders((prev) => ({ ...prev, new: [newOrder, ...prev.new] }));
        };
        ws.onclose = () => console.log("Disconnected from WebSocket Server");
        return () => ws.close();
    }, []);
    
    // ... (Your existing moveOrder and clearOrder functions remain unchanged)
    const moveOrder = (orderId: string, from: string, to: string) => {
        const orderToMove = orders[from].find(order => order.id === orderId);
        if (!orderToMove) return;

        setOrders(prev => ({
            ...prev,
            [from]: prev[from].filter(order => order.id !== orderId),
            [to]: [orderToMove, ...prev[to]]
        }));
    };

    const clearOrder = (orderId: string) => {
        setOrders(prev => ({...prev, ready: prev.ready.filter(o => o.id !== orderId)}));
    };


    return (
        <div className="bg-slate-100 min-h-screen">
            {/* The Sidebar is now a sibling to the main content */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main content area */}
            <main className="p-4 sm:p-6 lg:p-8">
                {/* A small header bar just for the toggle button and page title */}
                <header className="mb-6 flex items-center">
                    <button 
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-md text-slate-600 hover:bg-slate-200"
                    >
                        <MenuIcon />
                    </button>
                    <h1 className="text-2xl font-bold text-slate-800 ml-4">Kitchen View</h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* New Orders Column */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl font-bold text-blue-600 pb-2">New Orders ({orders.new.length})</h2>
                        {orders.new.map(order => (
                            <KitchenOrderCard 
                                key={order.id} 
                                order={order} 
                                onAction={() => moveOrder(order.id, 'new', 'preparing')}
                                actionText="Start Preparing"
                                statusColor="blue"
                            />
                        ))}
                    </div>

                    {/* Preparing Column */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl font-bold text-amber-600 pb-2">Preparing ({orders.preparing.length})</h2>
                        {orders.preparing.map(order => (
                            <KitchenOrderCard 
                                key={order.id} 
                                order={order} 
                                onAction={() => moveOrder(order.id, 'preparing', 'ready')}
                                actionText="Mark as Ready"
                                statusColor="amber"
                            />
                        ))}
                    </div>

                    {/* Ready Column */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl font-bold text-green-600 pb-2">Ready for Pickup ({orders.ready.length})</h2>
                        {orders.ready.map(order => (
                             <KitchenOrderCard 
                                key={order.id} 
                                order={order} 
                                onAction={() => clearOrder(order.id)}
                                actionText="Clear"
                                statusColor="green"
                                isDone
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};