import { ReactNode } from "react"
import { Minus, X } from "lucide-react"
import { Minimise } from "../Icons"

type HeroTab = {
    key: string
    tabIcon: ReactNode
    tabName: string
    tabContent: ReactNode
}

type HeroSectionProps = {
    tabs: HeroTab[]
    activeTab: string
    currentTab: HeroTab
    onTabChange: (key: string) => void
    onSignup: () => void
}

export const HeroSection = ({ tabs, activeTab, currentTab, onTabChange, onSignup }: HeroSectionProps) => {
    return (
        <section className="m-2 p-2 relative bg-white overflow-hidden" id="demo">
            <div className="relative z-20 mx-auto w-full max-w-[84rem] px-4">
                <div className="flex flex-col items-start mt-4 px-2">
                    <h1 className="text-6xl mt-2 font-bold text-left text-neutral-900 relative max-w-4xl">Digitize Your Restaurant. Simplify Everything.</h1>
                    <div className="mt-6 w-full items-start ">
                        <p className="max-w-2xl text-neutral-600">
                            Stop managing chaos and start streamlining your restaurant. Our intuitive platform gives you absolute control over menu management, real-time order routing, one-click digital menus, and advanced analytics.
                        </p>
                        <div className="flex gap-4 mt-4">
                            <a className="cursor-pointer border-2 p-4 text-white text-lg bg-blue-600 rounded-lg" onClick={onSignup}>Sign up</a>
                        </div>
                    </div>
                    <div className="w-full relative my-8 overflow-hidden shadow-2xl pb-4 rounded-2xl">
                        <div className="flex items-center justify-between py-2 pl-2 bg-gray-100">
                            <div className="no-visible-scrollbar flex items-center justify-center gap-2">
                                {tabs.map((tab) => (
                                    <div key={tab.key} className="flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => onTabChange(tab.key)}
                                            className={`flex items-center gap-2 rounded-[8px] mr-1 px-2 py-1.5 text-sm font-medium ${activeTab === tab.key
                                                ? "bg-blue-600 text-white shadow-sm border-neutral-600"
                                                : "text-neutral-500 hover:text-neutral-900 hover:bg-white"
                                                }`}
                                        >
                                            {tab.tabIcon}
                                            <span>{tab.tabName}</span>
                                        </button>
                                        <div className="mx-1 h-4 w-px bg-neutral-300"></div>
                                    </div>
                                ))}

                            </div>
                            <div className="cursor-default flex text-sm text-neutral-600 items-center p-1 mr-2 overflow-x-auto mask-r-from-90%">
                                <div><Minus height={16} width={16} /></div>
                                <div className="mx-1 h-4 w-px bg-neutral-400"></div>
                                <Minimise />
                                <div className="mx-1 h-4 w-px bg-neutral-400"></div>
                                <div>
                                    <X height={16} width={16} />
                                </div>
                            </div>
                        </div>
                        <div className="w-full bg-grey-100/50 px-4 pt-4">
                            <div className="relative border rounded-lg p-4 mask-b-from-70%">
                                {currentTab.tabContent}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
