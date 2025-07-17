// In WaiterButtons.jsx

// Primary action button
export const PlaceOrder = ({ HandleClick, disabled }:{
    HandleClick: () => void;
    disabled?: boolean;
}) => {
  return (
    <button
      onClick={HandleClick}
      disabled={disabled}
      className="w-full flex justify-center items-center gap-2 px-4 py-3 text-white font-bold bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed"
    >
      Place Order
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </button>
  );
};

// Secondary action button
export const ClearOrder = ({ HandleClick, disabled }:{
    HandleClick: () => void;
    disabled?: boolean;
}) => {
  return (
    <button
      onClick={HandleClick}
      disabled={disabled}
      className="w-full px-4 py-3 text-slate-700 font-bold bg-slate-200 rounded-lg hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 transition-all disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
    >
      Clear
    </button>
  );
};