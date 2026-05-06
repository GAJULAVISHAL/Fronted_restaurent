import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../apiClient";

export const PublicMenuPage =()=>{
    let {restaurantId} = useParams();
    const [menuItems, setMenuItems] = useState([]);

    useEffect(()=>{
        const fetchMenu = async()=>{
            // Here you would typically fetch the public menu data for the restaurant using the restaurantId
            const response = await apiClient.get(`/api/v1/menu/public/${restaurantId}`);
            setMenuItems(response.data.Availableitems);
        };
        fetchMenu();
    },[restaurantId])
    return(<div>Public Menu Page for Restaurant: {restaurantId}</div>);
}