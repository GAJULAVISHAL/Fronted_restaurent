import { useState } from "react"
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

interface Item {
    title: string
    price: number
}
export const FoodCard = ({ title, price, imageUrl, onAdd, onSub, onClear}: {
    title: string,
    price: number,
    imageUrl: string,
    onAdd: (item: Item) => void,
    onSub: (item: Item) => void,
    onClear : (count : number) => void
}) => {

    const [count, setCount] = useState<number>(0)

    const cld = new Cloudinary({ cloud: { cloudName: 'duqbf6np3' } });

    const img = cld
        .image(imageUrl)
        .format('auto')
        .quality('auto')
        .resize(auto().gravity(autoGravity()).width(500).height(500));

    const HandleAdd = () => {
        onAdd({ title, price })
        setCount(count + 1)
    }

    const HandleSub = () => {
        onSub({ title, price })
        if (count > 0) {
            setCount(count - 1)
        }
    }

    const HandleClear = () => {
        onClear(count)
        setCount(0)
    }
 
    return (
        <div className="w-72 bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            {/* Image */}
            <div className="h-48 w-full">
                <AdvancedImage
                    cldImg={img}
                    alt={title}
                    className="rounded-lg w-full"

                />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col items-center">
                {/* Title and Price */}
                <div className="flex justify-between gap-8 mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 truncate max-w-[200px]">
                        {title}
                    </h3>
                    <span className="text-green-600 font-bold">
                        ₹{price}
                    </span>
                </div>

                {/* Counter */}
                <div className="flex items-center justify-between w-4/6 bg-gray-100 rounded-full p-1">
                    {/* Subtract Button */}
                    <button
                        onClick={HandleSub}
                        disabled={count === 0}
                        className="
                        p-2 rounded-full 
                        bg-red-500 text-white 
                        disabled:opacity-50 
                        hover:bg-red-600 
                        transition-colors
                    "
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 12H4"
                            />
                        </svg>
                    </button>

                    {/* Count */}
                    <span className="text-gray-700 font-medium px-4">
                        {count}
                    </span>

                    {/* Add Button */}
                    <button
                        onClick={HandleAdd}
                        className="
                        p-2 rounded-full 
                        bg-green-500 text-white 
                        hover:bg-green-600 
                        transition-colors
                    "
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}