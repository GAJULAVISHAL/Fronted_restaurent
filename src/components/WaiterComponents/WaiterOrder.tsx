import { useState } from "react";
import { FoodCard } from "./FoodCard";
import { ClearOrder, PlaceOrder } from "./WaiterButtons";
import { item as MenuItem } from "../../hooks/Fetchitems";
import { OrderItem } from "../../types"; 

interface NewOrderPageProps {
  onPlaceOrder: (orderData: { tableNumber: number; items: OrderItem[] }) => Promise<void>;
  menuItems: MenuItem[];
}

export const tableOptions = ['1', '2', '3', '4', '5'];
export const NewOrderPage = ({ onPlaceOrder, menuItems }: NewOrderPageProps) => {
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [orderStatus, setOrderStatus] = useState<string>("");
  const [tableNumber, setTableNumber] = useState<number>(0);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);


  const HandleAddItem = (item: MenuItem) => {
    setSelectedItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setTotalPrice((prev) => prev + item.price);
  };

  const HandleSubItem = (item: MenuItem) => {
    setSelectedItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing && existing.quantity > 1) {
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter((i) => i.id !== item.id);
    });
    setTotalPrice((prev) => Math.max(0, prev - item.price));
  };

  const HandleOrder = async () => {
    if (!tableNumber || selectedItems.length === 0) {
      setOrderStatus("Please select items and a table number.");
      return;
    }
    setIsPlacingOrder(true);
    setOrderStatus("Placing order...");
    try {
      await onPlaceOrder({ tableNumber, items: selectedItems });
      setOrderStatus("Order placed successfully!");
      setSelectedItems([]);
      setTotalPrice(0);
      setTableNumber(0);
      // The parent component handles success and navigation
    } catch (e) {
      console.error("Error placing order:", e);
      setOrderStatus("Failed to place order. Please try again.");
      setIsPlacingOrder(false); // Re-enable button on failure
    }
  };

  const HandleCancel = () => {
    setSelectedItems([]);
    setTotalPrice(0);
    setTableNumber(0);
    setOrderStatus("");
  };

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <div className="relative mb-6">
            <input type="text" placeholder="Search for food or drinks..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 text-md text-gray-700 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} title={item.name} price={item.price}
                quantity={selectedItems.find(i => i.id === item.id)?.quantity || 0}
                onAdd={() => HandleAddItem(item)} onSub={() => HandleSubItem(item)} />
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          <div className="sticky top-24 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Current Order</h2>
            <div>
              <label htmlFor="table-select" className="block mb-2 text-sm font-medium text-slate-600">Select Table Number</label>
              <select id="table-select" className="w-full p-2.5 text-slate-900 bg-slate-50 border border-slate-300 rounded-lg"
                onChange={(e) => setTableNumber(Number(e.target.value))} value={tableNumber}>
                <option value="0" disabled>Select a table</option>
                {tableOptions.map(num => <option key={num} value={num}>{`Table ${num}`}</option>)}
              </select>
            </div>
            <hr className="my-4 border-slate-200" />
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {selectedItems.length > 0 ? (
                selectedItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center animate-fade-in">
                    <div>
                      <p className="font-semibold text-slate-700">{item.name}</p>
                      <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-slate-600">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-center py-8">Your cart is empty.</p>
              )}
            </div>
            {selectedItems.length > 0 && (
              <>
                <hr className="my-5 border-dashed border-slate-300" />
                <div className="flex justify-between items-center text-xl font-bold text-slate-800">
                  <p>Total</p><p>₹{totalPrice.toFixed(2)}</p>
                </div>
              </>
            )}
            <div className="mt-6 space-y-3">
              <PlaceOrder HandleClick={HandleOrder} disabled={isPlacingOrder || selectedItems.length === 0 || tableNumber === 0} />
              <ClearOrder HandleClick={HandleCancel} disabled={selectedItems.length === 0} />
              {orderStatus && <p className={`text-sm text-center pt-2 ${orderStatus.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>{orderStatus}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};