import { AlarmClock, CookingPotIcon, HandPlatterIcon, Image, PencilLine, ShieldUserIcon, ToggleRight, Trash } from "lucide-react"
import { MdAdd } from "react-icons/md"

export const MenuCard = ({ item }: { item: string }) => {
    return (
        <div className="border-2 h-40 w-56 p-2 rounded-xl">
            <div className="h-[65%] flex items-center justify-center">
                <Image color="#404040" />
            </div>
            <div className="flex flex-col gap-2">
                <h2 className="text-sm font-bold">{item}</h2>
                <div className="flex items-center justify-between ">
                    <ToggleRight size={20} />
                    <div className="flex gap-2">
                        <PencilLine size={18} />
                        <Trash size={18} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export const OrderCard = ({ button, items }: { button: string, items: string[] }) => {
    return (
        <div className="border-2 rounded-lg w-60 min-h-36">
            <div className="flex items-center justify-between  p-2">
                <h3>Table 1</h3>
                <AlarmClock size={16} />
            </div>
            <div className="border mr-2"></div>
            <div className="p-2">
                {items.map(item => {
                    return <h3>{item}</h3>
                })}
            </div>
            <div className="border mr-2"></div>
            <div className="flex items-center justify-center p-2"><button className="bg-blue-600 text-white p-1 rounded-md">{button}</button></div>
        </div>
    )
}

export const testimonials = [
    {
        name: "Mira Tan",
        copy: "Guests scan, order, and pay without a single delay.",
    },
    {
        name: "Rahul Verma",
        copy: "We switched in one evening. By the next morning, menu edits, live orders, and table status were already part of the routine. That is the kind of setup you keep.",
    },
    {
        name: "Lana Ortiz",
        copy: "Fast, clean, and easy to teach.",
    },
    {
        name: "Jonas Kim",
        copy: "Kitchen tickets show up instantly. No more shouting across the line.",
    },
    {
        name: "Ayesha Khan",
        copy: "The analytics are simple but powerful. We finally know our peak table turns and our slowest categories without exporting anything.",
    },
    {
        name: "Diego Souza",
        copy: "Our team stopped texting order updates. Everything is just there.",
    },
    {
        name: "Priya Nair",
        copy: "We trained two new waiters in under an hour. The UI makes sense without a manual, which is rare.",
    },
    {
        name: "Ethan Cole",
        copy: "Looks polished. Feels dependable.",
    },
    {
        name: "Sara Patel",
        copy: "From QR menu to kitchen prep, the whole flow is tight. We shaved minutes off each order during rush hours and it stacks up fast.",
    },
    {
        name: "Hugo Meier",
        copy: "The table map is the feature we did not know we needed.",
    },
    {
        name: "Nina Rossi",
        copy: "Stable, quick, and friendly. It just works.",
    },
]

export const TestimonialCard = ({ name, copy }: { name: string; copy: string }) => {
    return (
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_8px_20px_-16px_rgba(15,23,42,0.4)]">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-sky-400 to-emerald-300 text-xs font-semibold text-white">
                    <span aria-hidden>*</span>
                </div>
                <div>
                    <div className="text-sm font-semibold text-neutral-900">{name}</div>
                </div>
            </div>
            <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{copy}</p>
        </div>
    )
}

export const tabs = [
    {
        key: "admin",
        tabIcon: <ShieldUserIcon height={18} width={18} />,
        tabName: "Admin",
        tabContent: (
            <div className="h-96 text-xs overflow-hidden">
                <div className="h-full flex m-1">
                    <div className="flex flex-col items-start justify-between mr-2">
                        <div className="flex flex-col items-start">
                            <h2 className="text-blue-600 font-bold">Delish</h2>
                            <div className="w-full border my-1"></div>
                            <div className="flex flex-col items-start gap-2">
                                <p className="p-1">Dashbord</p>
                                <p className="bg-white border-2 rounded-lg p-1 shadow-md">Menu</p>
                                <p className="p-1">Settings</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-2 mb-2">
                            <p className="p-1">QR Code</p>
                            <p className="p-1">Logout</p>
                        </div>
                    </div>

                    <div className="border mr-2"></div>

                    <div className="flex flex-col items-start mr-2">
                        <h2 className="font-bold">Categories</h2>
                        <div className="w-full border my-1"></div>
                        <div className="flex flex-col gap-2 ">
                            <p>Catergory A</p>
                            <p>Catergory B</p>
                            <p>Catergory C</p>
                            <p>Catergory D</p>
                        </div>
                    </div>

                    <div className="border mr-2"></div>

                    <div className="flex min-w-0 flex-1 flex-col ml-2">
                        <div className="flex items-center px-1 justify-between mb-2">
                            <h2 className="font-bold text-sm">Menu Management</h2>
                            <button className="flex items-center bg-blue-600 text-white rounded-lg p-2"><MdAdd size={12} />Add New Item</button>
                        </div>
                        <div className="grid flex-1 grid-cols-1 gap-2 overflow-y-auto pr-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            <MenuCard item="Item-1" />
                            <MenuCard item="Item-2" />
                            <MenuCard item="Item-3" />
                            <MenuCard item="Item-4" />
                            <MenuCard item="Item-5" />
                            <MenuCard item="Item-6" />
                            <MenuCard item="Item-7" />
                            <MenuCard item="Item-8" />
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
    {
        key: "waiter",
        tabIcon: <HandPlatterIcon height={18} width={18} />,
        tabName: "Waiter",
        tabContent: (
            <div className="h-96 text-xs overflow-hidden">
                <div className="h-full flex m-1">
                    <div className="flex flex-col items-start justify-between mr-2">
                        <div className="flex flex-col items-start">
                            <h2 className="text-blue-600 font-bold">Delish</h2>
                            <div className="w-full border my-1"></div>
                            <div className="flex flex-col items-start gap-2">
                                <p className="p-1">Place Order</p>
                                <p className="p-1">Active Orders</p>
                                <p className="bg-white border-2 rounded-lg p-1 shadow-md">Table Map</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-2 mb-2">
                            <p className="p-1">Logout</p>
                        </div>
                    </div>

                    <div className="border mr-2"></div>

                    <div className="flex min-w-0 flex-1 flex-col ml-2">
                        <div className="flex items-center px-1 justify-between mb-2">
                            <h2 className="font-bold text-sm">Table Map</h2>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="relative m-8 transform transition-transform">
                                <div className="w-14 h-14 bg-neutral-400 border-neutral-900 border-2 rounded-2xl shadow-md flex flex-col items-center justify-center cursor-pointer relative z-10">
                                    <h3 className="text-white text-sm font-bold">Table 1</h3>
                                </div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -top-5 left-1/2 -translate-x-1/2 rounded-b-none rounded-t-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -bottom-5 left-1/2 -translate-x-1/2 rounded-t-none rounded-b-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -left-5 top-1/2 -translate-y-1/2 rounded-r-none rounded-l-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -right-5 top-1/2 -translate-y-1/2 rounded-l-none rounded-r-lg">
                                </div>

                            </div>
                            <div className="relative m-8 transform transition-transform">
                                <div className="w-24 h-14 bg-neutral-400 border-neutral-900 border-2 rounded-2xl shadow-md flex flex-col items-center justify-center cursor-pointer relative z-50">
                                    <h3 className="text-white text-sm font-bold">Table 2</h3>
                                </div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -top-5 left-4 rounded-b-none rounded-t-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -top-5 right-4 rounded-b-none rounded-t-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -bottom-5 left-4 rounded-t-none rounded-b-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -bottom-5 right-4 rounded-t-none rounded-b-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -left-5 top-1/2 -translate-y-1/2 rounded-r-none rounded-l-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -right-5 top-1/2 -translate-y-1/2 rounded-l-none rounded-r-lg">
                                </div>

                            </div>
                            <div className="relative m-8 transform transition-transform">
                                <div className="w-32 h-14 bg-neutral-400 border-neutral-900 border-2 rounded-2xl shadow-md flex flex-col items-center justify-center cursor-pointer relative z-10">
                                    <h3 className="text-white text-sm font-bold">Table 3</h3>
                                </div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -top-5 left-1/2 -translate-x-1/2 rounded-b-none rounded-t-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -top-5 left-8 -translate-x-1/2 rounded-b-none rounded-t-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -top-5 right-3 -translate-x-1/2 rounded-b-none rounded-t-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -bottom-5 left-1/2 -translate-x-1/2 rounded-t-none rounded-b-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -bottom-5 left-8 -translate-x-1/2 rounded-t-none rounded-b-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -bottom-5 right-3 -translate-x-1/2 rounded-t-none rounded-b-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -left-5 top-1/2 -translate-y-1/2 rounded-r-none rounded-l-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -right-5 top-1/2 -translate-y-1/2 rounded-l-none rounded-r-lg">
                                </div>

                            </div>
                            <div className="relative m-8 transform transition-transform">
                                <div className="w-14 h-14 bg-neutral-400 border-neutral-900 border-2 rounded-2xl shadow-md flex flex-col items-center justify-center cursor-pointer relative z-10">
                                    <h3 className="text-white text-xs font-bold">Table 4</h3>
                                </div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -top-5 left-1/2 -translate-x-1/2 rounded-b-none rounded-t-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -bottom-5 left-1/2 -translate-x-1/2 rounded-t-none rounded-b-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -left-5 top-1/2 -translate-y-1/2 rounded-r-none rounded-l-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -right-5 top-1/2 -translate-y-1/2 rounded-l-none rounded-r-lg">
                                </div>

                            </div>
                            <div className="relative m-8 transform transition-transform">
                                <div className="w-14 h-14 bg-neutral-400 border-neutral-900 border-2 rounded-2xl shadow-md flex flex-col items-center justify-center cursor-pointer relative z-10">
                                    <h3 className="text-white text-xs font-bold">Table 5</h3>
                                </div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -top-5 left-1/2 -translate-x-1/2 rounded-b-none rounded-t-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -bottom-5 left-1/2 -translate-x-1/2 rounded-t-none rounded-b-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -left-5 top-1/2 -translate-y-1/2 rounded-r-none rounded-l-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -right-5 top-1/2 -translate-y-1/2 rounded-l-none rounded-r-lg">
                                </div>

                            </div>
                            <div className="relative m-8 transform transition-transform">
                                <div className="w-14 h-14 bg-neutral-400 border-neutral-900 border-2 rounded-2xl shadow-md flex flex-col items-center justify-center cursor-pointer relative z-10">
                                    <h3 className="text-white text-xs font-bold">Table 6</h3>
                                </div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -top-5 left-1/2 -translate-x-1/2 rounded-b-none rounded-t-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -bottom-5 left-1/2 -translate-x-1/2 rounded-t-none rounded-b-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -left-5 top-1/2 -translate-y-1/2 rounded-r-none rounded-l-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -right-5 top-1/2 -translate-y-1/2 rounded-l-none rounded-r-lg">
                                </div>

                            </div>
                            <div className="relative m-8 transform transition-transform">
                                <div className="w-24 h-14 bg-neutral-400 border-neutral-900 border-2 rounded-2xl shadow-md flex flex-col items-center justify-center cursor-pointer relative z-50">
                                    <h3 className="text-white text-sm font-bold">Table 7</h3>
                                </div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -top-5 left-4 rounded-b-none rounded-t-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -top-5 right-4 rounded-b-none rounded-t-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -bottom-5 left-4 rounded-t-none rounded-b-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -bottom-5 right-4 rounded-t-none rounded-b-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -left-5 top-1/2 -translate-y-1/2 rounded-r-none rounded-l-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -right-5 top-1/2 -translate-y-1/2 rounded-l-none rounded-r-lg">
                                </div>

                            </div>
                            <div className="relative m-8 transform transition-transform">
                                <div className="w-32 h-14 bg-neutral-400 border-neutral-900 border-2 rounded-2xl shadow-md flex flex-col items-center justify-center cursor-pointer relative z-10">
                                    <h3 className="text-white text-sm font-bold">Table 8</h3>
                                </div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -top-5 left-1/2 -translate-x-1/2 rounded-b-none rounded-t-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -top-5 left-8 -translate-x-1/2 rounded-b-none rounded-t-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -top-5 right-3 -translate-x-1/2 rounded-b-none rounded-t-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -bottom-5 left-1/2 -translate-x-1/2 rounded-t-none rounded-b-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -bottom-5 left-8 -translate-x-1/2 rounded-t-none rounded-b-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -bottom-5 right-3 -translate-x-1/2 rounded-t-none rounded-b-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -left-5 top-1/2 -translate-y-1/2 rounded-r-none rounded-l-lg"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 bg-neutral-400 border-neutral-900 shadow-sm transition-all duration-300 -right-5 top-1/2 -translate-y-1/2 rounded-l-none rounded-r-lg">
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
    {
        key: "kitchen",
        tabIcon: <CookingPotIcon height={18} width={18} />,
        tabName: "Kitchen",
        tabContent: (
            <div className="h-96 text-xs overflow-hidden">
                <div className="h-full flex m-1">
                    <div className="flex flex-col items-start justify-between mr-2">
                        <div className="flex flex-col items-start">
                            <h2 className="text-blue-600 font-bold">Delish</h2>
                            <div className="w-full border my-1"></div>
                            <div className="flex flex-col items-start gap-2">
                                <p className="bg-white border-2 rounded-lg p-1 shadow-md">Orders</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-2 mb-2">
                            <p className="p-1">Logout</p>
                        </div>
                    </div>

                    <div className="border mr-2"></div>

                    <div className="flex min-w-0 flex-1 flex-col ml-2">
                        <div className="flex items-center px-1 justify-between mb-2">
                            <h2 className="font-bold text-sm">Orders</h2>
                        </div>
                        <div className="grid flex-1 grid-cols-1 gap-2 overflow-y-auto pr-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            <div className="flex flex-col items-start  gap-3">
                                <h2>New Orders</h2>
                                <OrderCard items={["1x Item - 1", "1x Item - 2", "2x Item - 3"]} button={"Start Preparing"} />
                                <OrderCard items={["1x Item - 1", "1x Item - 2", "2x Item - 3", "2x Item - 4"]} button={"Start Preparing"} />
                            </div>
                            <div className="border-l-2 pl-2 flex flex-col items-start gap-3">
                                <h2>Preparing</h2>
                                <OrderCard items={["1x Item - 1", "1x Item - 2", "2x Item - 3"]} button={"Mark As Ready"} />
                                <OrderCard items={["1x Item - 1", "1x Item - 2", "2x Item - 3", "2x Item - 4"]} button={"Mark As Ready"} />
                            </div>
                            <div className="border-l-2 pl-2 flex flex-col items-start gap-3">
                                <h2>Ready For Pickup</h2>
                                <OrderCard items={["1x Item - 1", "1x Item - 2", "2x Item - 3"]} button={"Mark As Picked Up"} />
                                <OrderCard items={["1x Item -  1", "1x Item - 2", "2x Item - 3", "2x Item - 4"]} button={"Mark As Picked Up"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
]
