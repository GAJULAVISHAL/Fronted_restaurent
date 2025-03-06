import { AppBar } from "../components/AppBar"
import { KitchenBody } from "../components/KitchenBody"

export const KitchenPage = () => {
    return (
        <div className="bg-gray-700 min-h-screen relative">
            <AppBar/>
            <KitchenBody/>
        </div>
    )
}