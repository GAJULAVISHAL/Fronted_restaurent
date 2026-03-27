import { useState, useEffect } from "react";
import { useToast } from "../context/ToastContext";
import { WaiterSidebar } from "../components/WaiterComponents/WaiterNavBar";
import { NewOrderPage } from "../components/WaiterComponents/WaiterOrder";
import { ActiveOrdersPage } from "../components/WaiterComponents/ActiveOrders";
import { TableMapPage } from "../components/WaiterComponents/TableMap";
import { useItems, useTables } from "../hooks/Fetchinfo";
import { WaiterLoading } from "../components/Loading";
import { ActiveOrder, OrderItem } from "../types";
import { useAuth } from "../hooks/Authcontext";
import apiClient from "../apiClient";

export type WaiterView = "active-orders" | "table-map" | "new-order";

export const WaiterPage = () => {
  const [activeView, setActiveView] = useState<WaiterView>("new-order");
  const { items, loading } = useItems(true);
  const { tables, setTables, tablesLoading } = useTables();
  const { logout } = useAuth();

  // 1. Centralized state for orders and WebSocket
  const [activeOrders, setActiveOrders] = useState<ActiveOrder[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { showToast } = useToast();

  const toggleSidebar = () => setSidebarCollapsed(!isSidebarCollapsed);

  // 2. Fetch active orders on mount
  useEffect(() => {
    const fetchActiveOrders = async () => {
      try {
        const response = await apiClient.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/order/activeOrders`,
        );
        setActiveOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch active orders:", error);
      }
    };
    fetchActiveOrders();
  }, []);

  // 3. Effect to establish and manage the WebSocket connection (once on mount)
  useEffect(() => {
    const wsUrl = `ws://${window.location.hostname}:8080`;
    const newSocket = new WebSocket(wsUrl);

    setSocket(newSocket);

    newSocket.onopen = () =>
      console.log("Waiter WebSocket Connected (with Cookies)");

    newSocket.onerror = (event) => {
      console.error("Waiter WebSocket Error:", event);
    };

    newSocket.onclose = (event) => {
      console.warn("Waiter WebSocket Closed:", event.code, event.reason);
    };

    // Listen for messages if needed (e.g. order status updates)
    newSocket.onmessage = (event) => {
      try {
        const incomingOrder: ActiveOrder = JSON.parse(event.data);
        if (incomingOrder.id) {
          updateOrdersWithGrouping(incomingOrder);
          // Update table status to OCCUPIED when an order is received via WebSocket
          setTables((prevTables) =>
            prevTables.map((t) =>
              t.id === incomingOrder.tableId
                ? { ...t, status: "OCCUPIED" as any }
                : t,
            ),
          );
        }
      } catch (err) {
        console.error("Error processing websocket message", err);
      }
    };

    return () => newSocket.close();
  }, []); // Only establish the WebSocket connection once on mount

  const updateOrdersWithGrouping = (newOrder: ActiveOrder) => {
    setActiveOrders((prevOrders) => {
      const existingOrderIndex = prevOrders.findIndex(
        (o) => o.tableId === newOrder.tableId,
      );

      if (existingOrderIndex > -1) {
        const updatedOrders = [...prevOrders];
        const existingGroup = { ...updatedOrders[existingOrderIndex] };

        // Merge items
        const itemsMap = new Map<number, OrderItem>();
        existingGroup.items.forEach((item) =>
          itemsMap.set(item.id, { ...item }),
        );
        newOrder.items.forEach((item) => {
          const existingItem = itemsMap.get(item.id);
          if (existingItem) {
            existingItem.quantity += item.quantity;
          } else {
            itemsMap.set(item.id, { ...item });
          }
        });

        existingGroup.items = Array.from(itemsMap.values());
        existingGroup.totalPrice += newOrder.totalPrice;
        existingGroup.id = `table-${newOrder.tableId}`; // Ensure ID remains consistent for grouping
        updatedOrders[existingOrderIndex] = existingGroup;
        return updatedOrders;
      } else {
        // For new groups, use the table-ID format consistently
        return [
          { ...newOrder, id: `table-${newOrder.tableId}` },
          ...prevOrders,
        ];
      }
    });
  };

  // 4. Handler function to place an order (passed to NewOrderPage)
  const handlePlaceOrder = async (orderData: {
    tableId: number;
    items: OrderItem[];
  }) => {
    const { tableId, items } = orderData;

    if (!tableId || items.length === 0 || !socket) {
      throw new Error(
        "Cannot place order: Missing table, items, or socket connection.",
      );
    }

    if (socket.readyState !== WebSocket.OPEN) {
      showToast("Kitchen connection is not available. Please try again.", "error");
      throw new Error("WebSocket is not open.");
    }

    // Optimistically update table status in UI
    setTables((prevTables) =>
      prevTables.map((t) =>
        t.id === tableId ? { ...t, status: "OCCUPIED" as any } : t,
      ),
    );

    try {
      // a. Post to the backend to save in DB
      const response = await apiClient.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/order/placeOrder`,
        {
          tableId: tableId,
          items: items.map((item) => ({
            menuItemId: item.id,
            quantity: item.quantity,
          })),
        },
      );

      // b. Prepare the full order object to broadcast
      const totalPrice = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      const selectedTable = tables.find((t) => t.id === tableId);
      const orderForSocket: ActiveOrder = {
        id: response.data.order.id.toString(),
        tableId,
        table: selectedTable
          ? { id: selectedTable.id, number: selectedTable.number }
          : undefined,
        items: items.map((i) => ({ ...i })),
        totalPrice,
        createdAt: Date.now(),
      };

      // c. Broadcast the new order via WebSocket
      socket.send(JSON.stringify(orderForSocket));

      // d. Update local state with grouping
      updateOrdersWithGrouping(orderForSocket);

      showToast("Order placed successfully!");
    } catch (error) {
      console.error("Failed to place order:", error);
      showToast("Failed to place order. Please try again.", "error");
      throw error; // Re-throw so the component can handle local loading state if needed
    }
  };

  const BillTheOrder = async (groupedId: string) => {
    // groupedId is like 'table-1'
    const tableId = groupedId.split("-")[1];
    try {
      await apiClient.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/table/${tableId}/close`,
      );
      // Remove from local state
      setActiveOrders((prev) =>
        prev.filter((o) => `table-${o.tableId}` !== groupedId),
      );
      // Also update table status locally if needed
      setTables((prev) =>
        prev.map((t) =>
          t.id === Number(tableId)
            ? { ...t, status: "AVAILABLE" as any }
            : t,
        ),
      );
      showToast("Bill successfully processed!");
    } catch (err) {
      console.error("Failed to close table", err);
      showToast("Failed to process bill. Please try again.", "error");
    }
  }

  const viewTitles: Record<WaiterView, string> = {
    "active-orders": "Active Orders",
    "table-map": "Table Map",
    "new-order": "Create New Order",
  };

  const renderActiveView = () => {
    if (loading) {
      return <WaiterLoading />;
    }

    switch (activeView) {
      case "active-orders":
        return (
          <ActiveOrdersPage
            orders={activeOrders}
            onComplete={BillTheOrder}
          />
        );
      case "table-map":
        return (
          <TableMapPage
            tables={tables}
            setTables={setTables}
            tablesLoading={tablesLoading}
          />
        );
      case "new-order":
        // Pass the menu items, tables, and the handler function
        return (
          <NewOrderPage
            onPlaceOrder={handlePlaceOrder}
            menuItems={items}
            tables={tables}
          />
        );
      default:
        return (
          <NewOrderPage
            onPlaceOrder={handlePlaceOrder}
            menuItems={items}
            tables={tables}
          />
        );
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <WaiterSidebar
        logout={logout}
        activeView={activeView}
        setActiveView={setActiveView}
        isSidebarCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />
      <main
        className={`pt-20 md:pt-8 px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"
          }`}
      >
        <h1 className="text-3xl font-bold text-slate-800 mb-6">
          {viewTitles[activeView]}
        </h1>
        {renderActiveView()}
      </main>
    </div>
  );
};
