export const Instructions = () => {
    return (
        <section id="how-it-works" className="bg-blue-50 py-16">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-blue-600 mb-4">How It Works</h2>
                        <p className="text-gray-600 max-w-lg mx-auto">Get started in just a few simple steps</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-md text-center">
                            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                            <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
                            <p className="text-gray-600">Create an account in seconds with just your basic information.</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md text-center">
                            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                            <h3 className="text-xl font-semibold mb-2">Set Up Your Menu</h3>
                            <p className="text-gray-600">Add your menu items and customize them to your liking.</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md text-center">
                            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                            <h3 className="text-xl font-semibold mb-2">Start Taking Orders</h3>
                            <p className="text-gray-600">Receive and manage orders seamlessly through the platform.</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md text-center">
                            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
                            <h3 className="text-xl font-semibold mb-2">Track and Analyze</h3>
                            <p className="text-gray-600">Monitor your orders and performance to optimize your business.</p>
                        </div>
                    </div>
                </div>
            </section>
    )
        
}
