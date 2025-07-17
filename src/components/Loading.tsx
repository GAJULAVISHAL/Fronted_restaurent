
export const AdminLoading = () => {
  return (
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      
      {Array.from({ length: 8 }).map((_, index) => (
        <div className="bg-white rounded-lg shadow-md overflow-hidden" key={index}>
          {/* Animated Pulse is a TailwindCSS class for a nice loading effect */}
          <div className="w-full h-40 bg-gray-300 animate-pulse"></div>
          <div className="p-4">
            <div className="h-4 w-20 bg-gray-300 rounded-full mb-3 animate-pulse"></div>
            <div className="h-6 w-3/4 bg-gray-300 rounded mb-2 animate-pulse"></div>
            <div className="h-5 w-1/2 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="h-7 w-24 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="flex space-x-2">
                <div className="h-8 w-8 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="h-8 w-8 bg-gray-300 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


const Spinner = () => (
  <div className="w-12 h-12 border-4 border-t-indigo-600 border-r-indigo-600 border-gray-200 rounded-full animate-spin"></div>
);

export const WaiterLoading = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-100">
      <div className='text-center'>
        <Spinner />
      </div>
    </div>
  );
};