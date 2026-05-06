import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { tabs, testimonials } from "../components/LandingComponents/LandingData"
import { LandingHeader } from "../components/LandingComponents/LandingHeader"
import { HeroSection } from "../components/LandingComponents/HeroSection"
import { FeaturesSection } from "../components/LandingComponents/FeaturesSection"
import { PricingSection } from "../components/LandingComponents/PricingSection"
import { TestimonialsSection } from "../components/LandingComponents/TestimonialsSection"
import { LandingFooter } from "../components/LandingComponents/LandingFooter"

export const LandingPage = () => {
    const [activeTab, setActiveTab] = useState(tabs[0].key)
    const currentTab = tabs.find((tab) => tab.key === activeTab) ?? tabs[0]
    const [menuStep, setMenuStep] = useState(0)
    const [orderStep, setOrderStep] = useState(0)
    const [analytics, setAnalytics] = useState({
        orders: 0,
        revenue: 0,
        menus: 0,
    })
    const navigate = useNavigate()

    const menuSkeletonItems = useMemo(
        () => ["Truffle Pasta", "Crispy Tacos", "Citrus Salad", "Miso Ramen", "Berry Tart"],
        []
    )

    const orderSkeletonItems = useMemo(
        () => ["2x Spicy Bowl", "1x Mint Soda", "1x Garlic Bread"],
        []
    )

    const analyticsTargets = useMemo(
        () => ({ orders: 128, revenue: 7420, menus: 64 }),
        []
    )

    useEffect(() => {
        const intervalId = setInterval(() => {
            setActiveTab((prevTab) => {
                const currentIndex = tabs.findIndex((tab) => tab.key === prevTab)
                const nextIndex = (currentIndex + 1) % tabs.length
                return tabs[nextIndex].key
            })
        }, 3000)

        return () => clearInterval(intervalId)
    }, [])

    useEffect(() => {
        const menuInterval = setInterval(() => {
            setMenuStep((prev) => (prev + 1) % (menuSkeletonItems.length + 1))
        }, 700)

        return () => clearInterval(menuInterval)
    }, [menuSkeletonItems.length])

    useEffect(() => {
        const orderInterval = setInterval(() => {
            setOrderStep((prev) => (prev + 1) % (orderSkeletonItems.length + 1))
        }, 900)

        return () => clearInterval(orderInterval)
    }, [orderSkeletonItems.length])

    useEffect(() => {
        const analyticsInterval = setInterval(() => {
            setAnalytics((prev) => ({
                orders: Math.min(prev.orders + 1, analyticsTargets.orders),
                revenue: Math.min(prev.revenue + 35, analyticsTargets.revenue),
                menus: Math.min(prev.menus + 1, analyticsTargets.menus),
            }))
        }, 40)

        return () => clearInterval(analyticsInterval)
    }, [analyticsTargets])
    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-white flex justify-center">
            <div className="w-full">
                <LandingHeader
                    onLogin={() => navigate("/login")}
                    onSignup={() => navigate("/signup")}
                />
                <HeroSection
                    tabs={tabs}
                    activeTab={activeTab}
                    currentTab={currentTab}
                    onTabChange={setActiveTab}
                    onSignup={() => navigate("/signup")}
                />
                <FeaturesSection
                    menuSkeletonItems={menuSkeletonItems}
                    orderSkeletonItems={orderSkeletonItems}
                    menuStep={menuStep}
                    orderStep={orderStep}
                    analytics={analytics}
                />
                <PricingSection onCta={() => navigate("/signup")} />
                <TestimonialsSection testimonials={testimonials} />
                <LandingFooter />
            </div>
        </div>
    )
}