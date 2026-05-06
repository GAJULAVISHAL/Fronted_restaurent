type PricingSectionProps = {
    onCta: () => void
}

export const PricingSection = ({ onCta }: PricingSectionProps) => {
    return (
        <section className="m-2 mb-4 p-2 relative flex items-center justify-center bg-white overflow-hidden" id="pricing">
            <div className="mx-auto flex w-full max-w-[84rem] flex-col items-center gap-6 px-4">
                <div className="text-center">
                    <h2 className="mt-3 text-black font-bold text-center text-4xl">Free to start</h2>
                    <p className="mt-3 text-neutral-600 max-w-2xl">
                        Everything you need to launch a digital menu and manage orders without cost.
                    </p>
                </div>
                <div className="w-full flex justify-center">
                    <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.5)]">
                        <div>
                            <p className="text-md font-bold text-blue-500">Free</p>
                            <p className="mt-1 text-md text-blue-600">Access to core features</p>
                        </div>
                        <div className="mt-6 flex items-end gap-2">
                            <span className="text-md text-blue-500">$</span>
                            <span className="text-6xl font-semibold text-blue-600">0</span>
                            <span className="text-md text-blue-400 line-through">$9</span>
                        </div>
                        <button className="mt-6 w-full rounded-lg border bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md" onClick={onCta}>
                            Digitalize Now
                        </button>
                        <ul className="mt-6 space-y-3 text-sm text-neutral-600">
                            <li className="flex items-start gap-2">
                                <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">✓</span>
                                Access to core menu tools
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">✓</span>
                                QR menus for every table
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">✓</span>
                                Real-time order routing
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">✓</span>
                                Fully responsive on any device
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">✓</span>
                                Onboarding guides included
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
