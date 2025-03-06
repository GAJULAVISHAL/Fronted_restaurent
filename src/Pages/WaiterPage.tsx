import { AppBar } from "../components/AppBar"   
import { WaiterBody } from "../components/WaiterBody"

export const WaiterPage = () => {
    return (
        <div className="bg-gray-700 min-h-screen relative">
            <AppBar/>
            <WaiterBody/>
            
        </div>
    )
}