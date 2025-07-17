export const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-12">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">Delish</h3>
                            <p className="text-gray-400">Making food ordering smarter, faster, and easier for businesses worldwide.</p>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><a href="#features" className="text-gray-400 hover:text-white transition duration-300">Features</a></li>
                                <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition duration-300">How It Works</a></li>
                                <li><a href="#benefits" className="text-gray-400 hover:text-white transition duration-300">Benefits</a></li>
                                <li><a href="#testimonials" className="text-gray-400 hover:text-white transition duration-300">Testimonials</a></li>
                                <li><a href="#pricing" className="text-gray-400 hover:text-white transition duration-300">Pricing</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Support</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Help Center</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">FAQ</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Contact Us</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Contact</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>Email: info@delish.com</li>
                                <li>Phone: (123) 456-7890</li>
                                <li>Address: 123 Main St, City, Country</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                        &copy; 2025 Delish. All rights reserved.
                    </div>
                </div>
            </footer>
    )
}
