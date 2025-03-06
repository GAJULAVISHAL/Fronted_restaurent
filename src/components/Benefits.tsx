export const Benefits = () => {
    return (
        <section id="benefits" className="container mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-blue-600 mb-4">Why Choose Delish</h2>
                    <p className="text-gray-600 max-w-lg mx-auto">Benefits that make our platform stand out</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600">
                        <h3 className="text-xl font-semibold mb-2">Time-Saving</h3>
                        <p className="text-gray-600">Reduce manual effort and save valuable time that you can reinvest in your business growth.</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600">
                        <h3 className="text-xl font-semibold mb-2">Efficiency</h3>
                        <p className="text-gray-600">Streamline your order management process with automated workflows and real-time updates.</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600">
                        <h3 className="text-xl font-semibold mb-2">Customization</h3>
                        <p className="text-gray-600">Tailor the platform to your business needs with flexible settings and configurations.</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600">
                        <h3 className="text-xl font-semibold mb-2">Scalability</h3>
                        <p className="text-gray-600">Grow your business without hassle as our platform scales with your needs and requirements.</p>
                    </div>
                </div>
            </section>
    )
}
