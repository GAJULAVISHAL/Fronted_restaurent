export const Features = () => {
    return (
        <section id="features" className="container mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-blue-600 mb-4">Powerful Features</h2>
                    <p className="text-gray-600 max-w-lg mx-auto">Everything you need to manage your food ordering business efficiently</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                        <div className="text-blue-500 text-4xl mb-4">📋</div>
                        <h3 className="text-xl font-semibold mb-2">Order Placement</h3>
                        <p className="text-gray-600">Easily place and track orders in real-time with our intuitive interface.</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                        <div className="text-blue-500 text-4xl mb-4">🍽️</div>
                        <h3 className="text-xl font-semibold mb-2">Menu Management</h3>
                        <p className="text-gray-600">Add, update, or remove menu items with just a few clicks.</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                        <div className="text-blue-500 text-4xl mb-4">🔔</div>
                        <h3 className="text-xl font-semibold mb-2">Order Receiving</h3>
                        <p className="text-gray-600">Get instant notifications for new orders and manage them efficiently.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                        <div className="text-blue-500 text-4xl mb-4">⚙️</div>
                        <h3 className="text-xl font-semibold mb-2">CRUD Operations</h3>
                        <p className="text-gray-600">Efficiently manage your menu and orders with full database capabilities.</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                        <div className="text-blue-500 text-4xl mb-4">👆</div>
                        <h3 className="text-xl font-semibold mb-2">User-Friendly Interface</h3>
                        <p className="text-gray-600">Designed for simplicity and ease of use, ensuring a smooth experience.</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                        <div className="text-blue-500 text-4xl mb-4">📊</div>
                        <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
                        <p className="text-gray-600">Track your performance with comprehensive, easy-to-understand analytics.</p>
                    </div>
                </div>
            </section>
    )
}
