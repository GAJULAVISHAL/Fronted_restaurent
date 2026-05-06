import { useState, useEffect } from "react";
import {
  KitchenOrderCard,
  Order,
} from "../components/KitchenComponents/KitchenOrderCard";
import { KitchenSidebar } from "../components/KitchenComponents/AppBar";

export const KitchenPage = () => {
  // State to manage sidebar visibility
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const toggleSidebar = () => setSidebarCollapsed(!isSidebarCollapsed);

  const [orders, setOrders] = useState<Record<string, Order[]>>({
    new: [],
    preparing: [],
    ready: [],
  });

  useEffect(() => {
    const wsUrl = `ws://${window.location.hostname}:8080`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => console.log("Kitchen WebSocket Connected");
    ws.onmessage = (event) => {
      try {
        const newOrderData = JSON.parse(event.data);
        // Transform ActiveOrder to Order format
        const newOrder: Order = {
          id: newOrderData.id || `order-${Date.now()}`,
          tableId: newOrderData.tableId,
          table: newOrderData.table,
          totalPrice: newOrderData.totalPrice,
          timestamp: newOrderData.createdAt || Date.now(),
          items: newOrderData.items.map((item: any) => ({
            name: item.name,
            price: item.price,
            category: item.category, // Pass category if available (it might be undefined, which is now handled)
            quantity: item.quantity,
          })),
        };
        setOrders((prev) => ({ ...prev, new: [newOrder, ...prev.new] }));
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };
    ws.onerror = (error) => console.error("Kitchen WebSocket Error:", error);
    ws.onclose = (event) =>
      console.warn("Kitchen WebSocket Closed:", event.code, event.reason);
    return () => ws.close();
  }, []);

  // ... (Your existing moveOrder and clearOrder functions remain unchanged)
  const moveOrder = (orderId: string, from: string, to: string) => {
    const orderToMove = orders[from].find((order) => order.id === orderId);
    if (!orderToMove) return;

    setOrders((prev) => ({
      ...prev,
      [from]: prev[from].filter((order) => order.id !== orderId),
      [to]: [orderToMove, ...prev[to]],
    }));
  };

  const clearOrder = (orderId: string) => {
    setOrders((prev) => ({
      ...prev,
      ready: prev.ready.filter((o) => o.id !== orderId),
    }));
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      {/* The Sidebar is now a sibling to the main content */}
      <KitchenSidebar
        isSidebarCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />

      {/* Main content area */}
      <main
        className={`p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <header className="mb-6 flex items-center">
          <h1 className="text-2xl font-bold text-slate-800 ml-4">
            Kitchen View
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* New Orders Column */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-blue-600 pb-2">
              New Orders ({orders.new.length})
            </h2>
            {orders.new.map((order) => (
              <KitchenOrderCard
                key={order.id}
                order={order}
                onAction={() => moveOrder(order.id, "new", "preparing")}
                actionText="Start Preparing"
                statusColor="blue"
              />
            ))}
          </div>

          {/* Preparing Column */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-amber-600 pb-2">
              Preparing ({orders.preparing.length})
            </h2>
            {orders.preparing.map((order) => (
              <KitchenOrderCard
                key={order.id}
                order={order}
                onAction={() => moveOrder(order.id, "preparing", "ready")}
                actionText="Mark as Ready"
                statusColor="amber"
              />
            ))}
          </div>

          {/* Ready Column */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-green-600 pb-2">
              Ready for Pickup ({orders.ready.length})
            </h2>
            {orders.ready.map((order) => (
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
