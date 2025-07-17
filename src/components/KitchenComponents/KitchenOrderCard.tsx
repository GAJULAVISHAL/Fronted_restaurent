// src/components/KitchenOrderCard.tsx
import { useState, useEffect } from "react";

// Define shared types
export interface Order {
    id: string;
    tableNumber: number;
    totalPrice: number;
    timestamp: number;
    items: { name: string; price: number; category: string; quantity: number; }[];
}

export type ActionColor = 'blue' | 'amber' | 'green' | 'gray';

interface KitchenCardProps {
    order: Order;
    onAction: () => void;
    actionText: string;
    statusColor: ActionColor;
    isDone?: boolean;
}

const formatElapsedTime = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ${seconds % 60}s`;
};

export const KitchenOrderCard = ({ order, onAction, actionText, statusColor, isDone }: KitchenCardProps) => {
    const [elapsedTime, setElapsedTime] = useState(() => formatElapsedTime(order.timestamp));

    useEffect(() => {
        if (isDone) return; // Stop timer if the order is done
        const interval = setInterval(() => {
            setElapsedTime(formatElapsedTime(order.timestamp));
        }, 1000);
        return () => clearInterval(interval);
    }, [order.timestamp, isDone]);

    // Color mapping for borders and buttons
    const statusClasses = {
        blue: { border: 'border-blue-500', button: 'bg-blue-500 hover:bg-blue-600' },
        amber: { border: 'border-amber-500', button: 'bg-amber-500 hover:bg-amber-600' },
        green: { border: 'border-green-500', button: 'bg-green-500 hover:bg-green-600' },
        gray: { border: 'border-slate-400', button: 'bg-slate-500 hover:bg-slate-600' },
    };

    return (
        <div className={`bg-white rounded-lg shadow-md p-4 flex flex-col gap-4 border-l-4 ${statusClasses[statusColor].border} ${isDone ? 'opacity-70' : ''}`}>
            {/* Card Header */}
            <div className="flex justify-between items-center">
                <div className="font-bold text-lg text-slate-800">Table {order.tableNumber}</div>
                <div className={`text-sm font-semibold ${isDone ? 'text-slate-500' : 'text-red-600'}`}>
                    <span>⏰</span> {elapsedTime}
                </div>
            </div>

            {/* Items List */}
            <div className="flex flex-col gap-3 border-t border-slate-200 pt-3 text-slate-700">
                {order.items.map((item, index) => (
                    <div key={index}>
                        <div className="flex justify-start items-center">
                            <span className="font-bold text-lg text-slate-900 w-8">{item.quantity}x</span>
                            <span className="flex-1">{item.name}</span>
                        </div>
                         {item.category && <p className="text-slate-500 text-sm ml-8 -mt-1">{item.category}</p>}
                    </div>
                ))}
            </div>

            {/* Card Footer with Action Button */}
            <div className="border-t border-slate-200 pt-3 mt-auto">
                 <button 
                    onClick={onAction}
                    className={`w-full ${statusClasses[statusColor].button} text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${statusClasses[statusColor].border}`}
                >
                    {actionText}
                </button>
            </div>
        </div>
    );
};