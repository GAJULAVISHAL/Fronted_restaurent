import { useState } from "react";
import { CancelIcon, DeleteIcon, PencilIcon, SaveIcon } from "./Icons";

interface ItemProps {
    id: number;
    name: string;
    price: number;
    onSave: (id: number, newName: string, newPrice: number) => void;
    onDelete: (id: number) => void;
}
  
export const Items = ({ id, name, price, onSave, onDelete }: ItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(name);
    const [editPrice, setEditPrice] = useState(price);
    const [isDeleting, setIsDeleting] = useState(false);
  
    const handleSave = () => {
        onSave(id, editName, editPrice);
        setIsEditing(false);
    };
  
    const handleCancel = () => {
        setEditName(name);
        setEditPrice(price);
        setIsEditing(false);
    };

    const handleDelete = () => {
        setIsDeleting(true);
        onDelete(id);
    }
  
    if (isDeleting) {
        return null; // Immediately remove from view
    }

    return (
        <div className="flex items-center gap-4 bg-[#141414] px-4 min-h-[72px] py-2 justify-between rounded-lg p-4 m-4">
            {isEditing ? (
                <div className="flex flex-col justify-center">
                    <input
                        className="bg-[#1f1f1f] text-white p-1 rounded"
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                    />
                    <input
                        className="bg-[#1f1f1f] text-white p-1 rounded mt-2"
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(Number(e.target.value))}
                    />
                </div>
            ) : (
                <div className="flex flex-col justify-center">
                    <p className="text-[#FFFFFF] text-base font-medium leading-normal line-clamp-1">{name}</p>
                    <p className="text-[#FFFFFF] text-base font-normal leading-normal">RS - {price}</p>
                </div>
            )}
  
            <div className="flex gap-5">
                {isEditing ? (
                    <>
                        <button onClick={handleSave} className="text-green-500"><SaveIcon/></button>
                        <button onClick={handleCancel} className="text-red-500"><CancelIcon/></button>
                        <button onClick={handleDelete} className="text-red-500"><DeleteIcon/></button>
                    </>
                ) : (
                    <div className="shrink-0 cursor-pointer" onClick={() => setIsEditing(true)}>
                        <PencilIcon />
                    </div>
                )}
            </div>
        </div>
    );
};