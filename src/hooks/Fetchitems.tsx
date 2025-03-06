import axios from "axios"
import { useEffect, useState } from "react"

export interface item{
    id : number,
    name : string,
    price : number,
    category : string,
    imageUrl : string
}

export const useItems = () => {

    const [loading , setLoading] = useState(true)
    const [items, setItems] = useState<item[]>([])

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/get`,{
            headers:{
                Authorization: localStorage.getItem('token')
            }
        })
        .then((res)=>{
            setItems(res.data.items)
            setLoading(false)
        })
    },[])

    return {loading, items, setItems}
}