import ActiveOrderCard from "./ActiveOrderCard";
import { ActiveOrder } from "../../types";

interface ActiveOrdersPageProps {
  orders: ActiveOrder[];
  onComplete: (id: string) => void;
  onCancel?: (id: string) => void;
}

export const ActiveOrdersPage = ({
  orders,
  onComplete
}: ActiveOrdersPageProps) => {
  return (
    <div className="bg-gray-50 max-h-screen p-6 font-sans">
      {orders.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">No active orders</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 items-start">
          {orders.map((order) => (
            <ActiveOrderCard
              key={order.id}
              order={order}
              onComplete={onComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
