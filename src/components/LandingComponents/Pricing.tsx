import { useNavigate } from "react-router-dom"

export const Pricing = () => {
    const navigate = useNavigate()
    return (
        <section id="pricing" className="container mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-blue-600 mb-4">Simple, Transparent Pricing</h2>
                </div>

                <div className="flex justify-center items-center flex-col md:flex-row gap-8">
                    

                    <div className="bg-blue-600 text-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 transform scale-105">
                        <div className="bg-pink-500 text-white text-xs font-bold uppercase py-1 px-2 rounded-full inline-block mb-2">Popular</div>
                        <h3 className="text-xl font-semibold mb-4">Pro Plan</h3>
                        <div className="text-4xl font-bold mb-4">$0<span className="text-blue-200 text-lg font-normal">/month</span></div>
                        <ul className="space-y-2 mb-6">
                            <li className="flex items-center"><span className="text-pink-300 mr-2">✓</span> Advanced order management</li>
                            <li className="flex items-center"><span className="text-pink-300 mr-2">✓</span> Unlimited menu items</li>
                            <li className="flex items-center"><span className="text-pink-300 mr-2">✓</span> Priority support</li>
                            <li className="flex items-center"><span className="text-pink-300 mr-2">✓</span> Advanced analytics</li>
                            <li className="flex items-center"><span className="text-pink-300 mr-2">✓</span> Custom branding</li>
                        </ul>
                        <button className="w-full bg-white text-blue-600 py-2 rounded-lg transition duration-300 hover:bg-blue-50 " 
                        onClick={()=>{navigate('/signin')}}>
                            Start Free Trial
                        </button>
                    </div>

                   
                </div>
            </section>
    )
}
