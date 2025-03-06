import { useItems } from "../hooks/Fetchitems"
import { FoodCard } from "./FoodCard"
import { WaiterLoading } from "./Loading"
import { useState, useEffect } from "react"
import { ClearOrder, PlaceOrder } from "./WaiterButtons"
import axios from "axios"

interface Item {
  id: number,
  name: string,
  price: number,
  quantity: number
}
export const WaiterBody = () => {
  const { loading, items } = useItems()
  const [selectedItems, setSelectedItems] = useState<Item[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [orderStatus, setOrderStatus] = useState<string>("")
  const [tableNumber, setTabelNumber] = useState<number>(0)
  const [socket, setSocket] = useState<WebSocket | null>(null);
  
  const categories = [
    '1',
    '2',
    '3',
    '4',
    '5',
  ]

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log('Connection established');
      setSocket(newSocket)
    }
    newSocket.onmessage = (message) => {
      console.log('Message received:', message.data);
    }

  }, [])
   
  if(!socket){
    return(
      <div>
        loading ....
      </div>
    )
  }

  const HandleAddItem = (item: Item) => {
    setSelectedItems((prevItems) => {
      const exisistingItem = prevItems.find((i) => i.name === item.name)
      if (exisistingItem) {
        const updatedItems = prevItems.map((i) => i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i)
        return updatedItems
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    setTotalPrice((prevTotal) => prevTotal + item.price)
  };

  const HandleSubItem = (item: Item) => {
    setSelectedItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.name === item.name);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          // Remove the item if the quantity is 1
          const updatedItems = prevItems.filter((i) => i.name !== item.name);
          return updatedItems;
        }

        // Decrease the quantity otherwise
        const updatedItems = prevItems.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity - 1 } : i
        );
        return updatedItems;
      }

      return prevItems;
    });

    setTotalPrice((prev) => (prev - item.price < 0 ? prev : prev - item.price));
  }

  const HandleOrder = async () => {
    if (!tableNumber || selectedItems.length === 0) {
      setOrderStatus("Please select items and provide a table number.");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/order/placeOrder`, {
        tableNumber,
        items: selectedItems.map(item => ({
          menuItemId: item.id,
          quantity: item.quantity
        }))
      }, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })

      setOrderStatus("Order placed successfully!");
      console.log(selectedItems)
      socket.send(JSON.stringify({tableNumber,items : selectedItems,totalPrice,}))
      console.log("Order response:", res.data);
    } catch (e) {
      console.error("Error placing order:", e);
      setOrderStatus("Failed to place order.")
    }
  }

  const HandleCancel = ()=>{
    setSelectedItems([])
    setTotalPrice(0)
    setTabelNumber(0)
    setOrderStatus("")
  }

  // useEffect(() => {
  //   console.log(`Updated Total Price: ₹${totalPrice}`);
  //   console.log("Updated Selected Items:", selectedItems);
  //   console.log(tableNumber)
  // }, [totalPrice, selectedItems, tableNumber]);

  const filteredItems = searchQuery
    ? items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : items

  if (loading) {
    return (
      <WaiterLoading />
    )
  }

  return (
    <div>
      <div className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left Section */}
          <div className="flex flex-col items-center w-full lg:w-2/3">
            {/* Search Bar */}
            <div className="w-full max-w-md mb-4">
              <input
                type="text"
                placeholder="Search for items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            {/* Item Cards */}
            <div className="flex flex-wrap w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-4 w-full">
                {filteredItems.map((item) => (
                  <FoodCard
                    key={item.name}
                    title={item.name}
                    price={item.price}
                    imageUrl={item.imageUrl}
                    onAdd={() => HandleAddItem({ ...item, quantity: 1 })}
                    onSub={() => HandleSubItem({ ...item, quantity: 1 })}
                  />
                ))}
                {filteredItems.length === 0 && (
                  <div className="col-span-3 text-gray-500 text-center">
                    No items found!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Section (Selected Items) */}
          <div className=" mt-6 p-4 bg-gray-100 rounded-lg max-h-fit min-h-96 max-w-lg lg:w-1/3 sticky top-28">
            <div className="flex justify-between">
              <div className="w-52">
                <div>
                  <h2 className="text-lg font-semibold mb-2">Selected Items:</h2>
                  <div></div>
                </div>
                {selectedItems.length > 0 ? (
                  <ul>
                    {selectedItems.map((item, index) => (
                      <li
                        key={index}
                        className="flex justify-between py-1 border-b last:border-none"
                      >
                        <span>{item.name}({item.quantity})</span>
                        <span>₹{item.price}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No items added yet.</p>
                )}
                <h3 className="text-lg font-bold mt-4">Total: ₹{totalPrice}</h3>
                <div className="flex gap-4 flex-col sticky bottom-0">
                  <div>
                    <PlaceOrder HandleClick={HandleOrder} />
                    {orderStatus && <p>{orderStatus}</p>}
                  </div>
                  <div>
                    <ClearOrder HandleClick={HandleCancel}/>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="table" className="block mb-2 text-sm font-medium text-gray-900 ">Select Table :</label>
                <select id="table" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " onChange={(e) => {
                  setTabelNumber(Number(e.target.value))
                }}>
                  <option selected>0</option>
                  {
                    categories.map(category => <option key={category} value={category}>{category}</option>)
                  }

                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}