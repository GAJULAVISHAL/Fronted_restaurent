import { Plus, Minus } from 'lucide-react';

// The component no longer needs to receive the full item, only its own handlers.
interface FoodCardProps {
  title: string;
  price: number;
  quantity: number; // The current quantity of this item in the cart
  onAdd: () => void;
  onSub: () => void;
}

export const FoodCard = ({ title, price, quantity, onAdd, onSub }: FoodCardProps) => {
  return (
    // Main container: A clean, bordered card.
    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between">

      {/* Left side: Item information */}
      <div>
        <h3 className="text-md font-bold text-slate-800">{title}</h3>
        <p className="text-sm font-semibold text-blue-600 mt-1">₹{price}</p>
      </div>

      {/* Right side: Action controls */}
      <div className="flex items-center gap-2">

        <button
          onClick={()=>{if(quantity > 0) onSub()}}
          className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
          aria-label={`Remove one ${title}`}
        >
          <Minus size={16} />
        </button>
        
        <button
          onClick={onAdd}
          className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
          aria-label={`Add one ${title}`}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};