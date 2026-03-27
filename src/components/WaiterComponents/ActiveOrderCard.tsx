import { useState } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ActiveOrder } from "../../types";

interface ActiveOrderCardProps {
  order: ActiveOrder;
  onComplete: (id: string) => void;
}

const ActiveOrderCard = ({
  order,
  onComplete
}: ActiveOrderCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!order) return null;

  const calculateTotal = () => {
    return order.items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0,
    );
  };

  const total = calculateTotal();

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const CollapsedCard = ({ onClick, className = "" }: any) => (
    <div
      className={`w-full bg-[#1A7BF2] text-white rounded-[12px] shadow-sm p-4 flex justify-between items-center transition-all ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold">
          Table {order.table?.number ?? order.tableId}
        </span>
        <span className="bg-white/20 px-2 py-0.5 rounded-md text-sm font-medium">
          New
        </span>
      </div>
      <ChevronDown size={24} />
    </div>
  );

  return (
    <div className="relative w-full">
      {expanded && <CollapsedCard className="invisible pointer-events-none" />}

      {!expanded ? (
        <CollapsedCard
          className="cursor-pointer hover:bg-[#1565c0]"
          onClick={() => setExpanded(true)}
        />
      ) : (
        <div className="absolute p-1 top-0 left-0 w-full z-50 bg-white rounded-[12px] shadow-2xl border border-blue-500 overflow-hidden flex flex-col">
          <div
            className="bg-[#1A7BF2] m-1.5 p-2 cursor-pointer rounded-[11px] hover:bg-[#1565c0] transition-colors flex justify-between items-start"
            onClick={() => setExpanded(false)}
          >
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-bold text-white">
                  Order #{order.id.slice(-4)}
                </h2>
                <div className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-md">
                  New
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white">
                Table {order.table?.number ?? order.tableId}
              </h3>
            </div>
            <button
              className="text-white p-1 hover:bg-white/20 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(false);
              }}
            >
              <ChevronUp size={24} />
            </button>
          </div>

          <div className="p-3">
            <h4 className="text-lg font-bold text-gray-900 mb-2">
              Order Details
            </h4>

            <div className="space-y-2 mb-4">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex  text-gray-800 font-medium">
                  <span className="font-bold mr-2 text-gray-600">
                    {item.quantity}x
                  </span>
                  <span className="flex-grow">
                    {item.name} - ₹ {item.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="h-px w-full bg-blue-100 mb-4"></div>

            <div className="flex justify-center items-center gap-2 mb-8">
              <span className="text-2xl font-bold text-gray-900">Total:</span>
              <span className="text-3xl font-bold text-[#1A7BF2]">
                ₹{total.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-center ">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsProcessing(true);
                  Promise.resolve(onComplete(order.id)).finally(() =>
                    setIsProcessing(false),
                  );
                  
                }}
                disabled={isProcessing}
                className="p-3 px-4 flex items-center justify-center gap-2 bg-[#1A7BF2] active:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-200 transition-transform active:scale-95 group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <div>
                  <Check size={20} />
                </div>
                <span className="font-semibold text-sm leading-tight">
                  Bill
                  <br />
                  It!
                </span>
              </button>
            </div>

            <div className="text-center mt-6 text-gray-500 text-sm font-medium">
              Ordered at {formatTime(order.createdAt)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveOrderCard;
