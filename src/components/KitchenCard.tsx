import { useState, useEffect } from "react"

export const KitchenCard = () => {
    const [orders, setOrders] = useState<any[]>([])
    const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

    useEffect(() => {
        const ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL) // Replace with production WebSocket URL

        ws.onopen = () => {
            console.log("Connected to WebSocket Server")
        }

        ws.onmessage = (event) => {
            const newOrder = JSON.parse(event.data)
            setOrders((prevOrders) => [...prevOrders, newOrder])
            console.log("New Order Received:", newOrder)
        }

        ws.onclose = () => {
            console.log("Disconnected from WebSocket Server")
        }

        return () => {
            ws.close()
        }
    }, [])

    return (
        <>
            {orders.map((order, index) => {
                const isExpanded = expandedOrder === index;

                return (
                    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
                        <div key={index} className="mb-4 flex flex-col gap-4">
                            <div
                                className="flex justify-between items-center cursor-pointer p-4 bg-gray-100 rounded-lg"
                                onClick={() =>
                                    setExpandedOrder(isExpanded ? null : index)
                                }
                            >
                                <div>
                                    <h2 className="text-lg font-semibold">{order.id}</h2>
                                    <p className="text-gray-500 flex items-center gap-1">
                                        <span>⏰</span> 12:30 PM
                                    </p>
                                </div>
                                <button className="bg-gray-700 text-white px-3 py-1 text-sm rounded-lg flex items-center gap-1">
                                    <span>👥</span> Table {order.tableNumber}
                                </button>
                            </div>

                            {isExpanded && (
                                <div className="p-4 bg-white rounded-lg shadow">
                                    {order.items.map((item: any, itemIndex: number) => (
                                        <div key={itemIndex} className="bg-gray-100 p-4 rounded-lg mb-2">
                                            <div className="flex justify-between">
                                                <h3 className="font-semibold">{item.name}</h3>
                                                <span className="font-semibold">${item.price}</span>
                                            </div>
                                            <p className="text-gray-500 text-sm">{item.category}</p>
                                            <p className="text-gray-500 text-sm">x{item.quantity}</p>
                                        </div>
                                    ))}

                                    <div className="mt-4 flex justify-between border-t pt-4">
                                        <h3 className="font-semibold">Total</h3>
                                        <span className="font-semibold text-lg">${order.totalPrice}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </>
    )
}