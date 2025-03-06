// import { useState } from "react"
import { MenuBar } from "../components/MenuBar"
import icecream from '../assets/images/icecream.png'
import chaat from '../assets/images/chaat.png'
import samosa from '../assets/images/samosa.png'
import fries from '../assets/images/fries.png'
import { Features } from "../components/Features"
import { Instructions } from "../components/Instructions"
import { Benefits } from "../components/Benefits"
import { Reviews } from "../components/Reviews"
import { Pricing } from "../components/Pricing"
import { Footer } from "../components/Footer"

export const LandingPage = () => {
    // const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div>
            <div className="bg-[#fcebfa] h-screen bg-cover bg-center ">
                <MenuBar />
                <div className="flex justify-center items-center z-50 opacity-100">
                    <div className="w-11/12 mt-[100px] flex flex-col md:flex-row justify-center gap-2">
                        {/* Hidden on mobile, visible on md screens and above */}
                        <div className="hidden md:flex w-1/4 flex-col gap-6">
                            <div>
                                <img src={icecream} alt="Fruit parfait" className="w-full object-contain" />
                            </div>
                            <div>
                                <img src={chaat} alt="Food platter" className="w-full object-contain" />
                            </div>
                        </div>

                        {/* Main content section */}
                        <div className="w-full md:w-2/3 flex justify-center items-center rounded-2xl shadow-lg bg-[#f9e4f7]">
                            <div className="flex flex-col items-center md:items-start text-center md:text-left p-6">
                                <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
                                    Welcome to <span className="text-6xl md:text-7xl block mt-2">DELISH</span>
                                </h1>
                                <p className="text-lg text-gray-700 mb-6">Order Smarter, Faster, and Easier!</p>
                                <p className="text-gray-600 mb-8 max-w-md">
                                    Manage food orders, update menus, and streamline your restaurant operations effortlessly with our intuitive platform.
                                </p>
                                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition duration-300">
                                        Try It Free
                                    </button>
                                    <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-full font-medium transition duration-300">
                                        <a href="#features">Explore Features</a>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Hidden on mobile, visible on md screens and above */}
                        <div className="hidden md:flex w-1/4 flex-col gap-6">
                            <div>
                                <img src={samosa} alt="Samosas" className="w-full object-contain" />
                            </div>
                            <div>
                                <img src={fries} alt="French fries" className="w-full object-contain" />
                            </div>
                        </div>
                    </div>
                </div>
                <Features />
                <Instructions />
                <Benefits />
                <Reviews />
                <Pricing />
                <section className="bg-blue-600 py-16">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Ordering Process?</h2>
                        <p className="text-blue-100 max-w-lg mx-auto mb-8">Join thousands of businesses that have revolutionized their food ordering system with Delish.</p>
                        <button className="bg-white hover:bg-blue-50 text-blue-600 px-8 py-3 rounded-full font-medium text-lg transition duration-300">
                            Sign Up Now
                        </button>
                    </div>
                </section>
                <Footer />
            </div>
        </div>
    )
}