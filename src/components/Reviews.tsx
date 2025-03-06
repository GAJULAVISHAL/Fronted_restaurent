export const Reviews = () => {
    return (
        <section id="testimonials" className="bg-blue-50 py-16">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-blue-600 mb-4">What Our Users Say</h2>
                        <p className="text-gray-600 max-w-lg mx-auto">Real feedback from businesses using our platform</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="text-yellow-400 text-xl mb-4">★★★★★</div>
                            <p className="text-gray-600 italic mb-4">"This platform has made our ordering process 10x faster! We've reduced order errors by 95% and improved customer satisfaction."</p>
                            <div className="font-semibold">John Smith</div>
                            <div className="text-gray-500 text-sm">Restaurant Owner</div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="text-yellow-400 text-xl mb-4">★★★★★</div>
                            <p className="text-gray-600 italic mb-4">"Delish helped us transition from pen-and-paper to digital seamlessly. Our staff adapted quickly and now we can't imagine running without it."</p>
                            <div className="font-semibold">Sarah Johnson</div>
                            <div className="text-gray-500 text-sm">Café Manager</div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="text-yellow-400 text-xl mb-4">★★★★☆</div>
                            <p className="text-gray-600 italic mb-4">"The analytics feature alone is worth the investment. We've been able to identify our best-selling items and optimize our menu accordingly."</p>
                            <div className="font-semibold">Michael Wong</div>
                            <div className="text-gray-500 text-sm">Food Truck Owner</div>
                        </div>
                    </div>
                </div>
            </section>
    )
}
