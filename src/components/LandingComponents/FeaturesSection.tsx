type AnalyticsSnapshot = {
    orders: number
    revenue: number
    menus: number
}

type FeaturesSectionProps = {
    menuSkeletonItems: string[]
    orderSkeletonItems: string[]
    menuStep: number
    orderStep: number
    analytics: AnalyticsSnapshot
}

export const FeaturesSection = ({
    menuSkeletonItems,
    orderSkeletonItems,
    menuStep,
    orderStep,
    analytics,
}: FeaturesSectionProps) => {
    return (
        <section className="m-2 p-2 relative flex items-center justify-center bg-white overflow-hidden" id="features">
            <div className="flex flex-col w-full max-w-[55%] h-200 items-center mt-8 mb-4">
                <div className="mb-8 text-center">
                    <h2 className="text-black font-bold text-center text-4xl">What We Provide</h2>
                </div>
                <div className="flex flex-col w-full gap-4">
                    <div className="grid flex-1 grid-cols-3 gap-4">
                        <div className="flex h-64 border-2 border-neutral-200 rounded-lg col-span-1 p-4 bg-white">
                            <div className="flex w-full flex-col gap-3 min-h-0">
                                <div>
                                    <p className="text-sm font-semibold text-neutral-900">Menu Management</p>
                                    <p className="text-xs text-neutral-500">Organize items and pricing.</p>
                                </div>
                                <div className="flex-1 min-h-0 rounded-lg border border-neutral-200 bg-neutral-50 px-2">
                                    <div className="flex h-full flex-col gap-2">
                                        <div className="flex min-h-0 flex-1 flex-col gap-2 pt-2">
                                            {menuSkeletonItems.slice(0, Math.min(menuStep, 4)).map((item) => (
                                                <div key={item} className="flex items-center justify-between rounded-md border border-neutral-200 bg-white px-2 py-1 text-xs text-neutral-700">
                                                    <span>{item}</span>
                                                    <span className="text-blue-600">$12</span>
                                                </div>
                                            ))}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-64 border-2 border-neutral-200 col-span-2 rounded-lg p-4 bg-white">
                            <div className="flex h-full flex-col gap-3 min-h-0">
                                <div>
                                    <p className="text-sm font-semibold text-neutral-900">Real Time Order Routing</p>
                                    <p className="text-xs text-neutral-500">Instant flow from floor to kitchen.</p>
                                </div>
                                <div className="grid flex-1 grid-cols-2 gap-3 min-h-0">
                                    <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3 min-h-0">
                                        <div className="text-xs font-semibold text-neutral-700">Waiter View</div>
                                        <div className="mt-2 space-y-2 min-h-0">
                                            {orderSkeletonItems.slice(orderStep, orderSkeletonItems.length).map((item) => (
                                                <div key={`waiter-${item}`} className="h-6 rounded-md bg-neutral-200/80"></div>
                                            ))}
                                            {orderStep === orderSkeletonItems.length && (
                                                <div className="h-6 rounded-md bg-neutral-200/80"></div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3 min-h-0">
                                        <div className="text-xs font-semibold text-neutral-700">Kitchen View</div>
                                        <div className="mt-2 space-y-2 min-h-0">
                                            {orderSkeletonItems.slice(0, orderStep).map((item) => (
                                                <div key={`kitchen-${item}`} className="flex items-center justify-between rounded-md border border-neutral-200 bg-white px-2 py-1 text-xs text-neutral-700">
                                                    <span>{item}</span>
                                                    <span className="text-blue-600">New</span>
                                                </div>
                                            ))}
                                            {orderStep === 0 && (
                                                <div className="h-6 rounded-md bg-neutral-200/80"></div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid flex-1 grid-cols-3 gap-4">
                        <div className="h-64 border-2 border-neutral-200 col-span-2 rounded-lg p-4 bg-white">
                            <div className="flex h-full flex-col gap-3 min-h-0">
                                <div>
                                    <p className="text-sm font-semibold text-neutral-900">One Click QR Menu</p>
                                    <p className="text-xs text-neutral-500">Publish menus instantly to every table.</p>
                                </div>
                                <div className="flex-1 min-h-0 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                                    <div className="flex h-full items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="relative flex h-20 w-20 items-center justify-center rounded-xl border border-neutral-200 bg-white">
                                                <svg
                                                    viewBox="0 0 120 120"
                                                    className="h-16 w-16 animate-pulse"
                                                    role="img"
                                                    aria-label="QR code"
                                                >
                                                    <rect x="0" y="0" width="120" height="120" rx="12" fill="#f8fafc" />
                                                    <rect x="12" y="12" width="30" height="30" fill="#1f2937" />
                                                    <rect x="18" y="18" width="18" height="18" fill="#ffffff" />
                                                    <rect x="78" y="12" width="30" height="30" fill="#1f2937" />
                                                    <rect x="84" y="18" width="18" height="18" fill="#ffffff" />
                                                    <rect x="12" y="78" width="30" height="30" fill="#1f2937" />
                                                    <rect x="18" y="84" width="18" height="18" fill="#ffffff" />
                                                    <rect x="54" y="54" width="8" height="8" fill="#1f2937" />
                                                    <rect x="68" y="54" width="8" height="8" fill="#1f2937" />
                                                    <rect x="54" y="68" width="8" height="8" fill="#1f2937" />
                                                    <rect x="68" y="68" width="8" height="8" fill="#1f2937" />
                                                    <rect x="44" y="44" width="8" height="8" fill="#1f2937" />
                                                </svg>
                                                <div className="absolute left-3 right-3 h-[2px] bg-blue-600/70 animate-[scan_2s_ease-in-out_infinite]"></div>
                                            </div>
                                            <div className="space-y-2 text-xs text-neutral-600">
                                                <div className="rounded-md bg-white px-3 py-2 border border-neutral-200">Generate menu in seconds</div>
                                                <div className="rounded-md bg-white px-3 py-2 border border-neutral-200">Print or share with tables</div>
                                            </div>
                                        </div>
                                        <div className="hidden md:flex flex-col items-end text-xs text-neutral-500">
                                            <span>Last published</span>
                                            <span className="text-neutral-900 font-semibold">Just now</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-64 border-2 border-neutral-200 rounded-lg col-span-1 p-4 bg-white">
                            <div className="flex h-full flex-col gap-3 min-h-0">
                                <div>
                                    <p className="text-sm font-semibold text-neutral-900">Table Flow</p>
                                    <p className="text-xs text-neutral-500">Busy vs. open at a glance.</p>
                                </div>
                                <div className="flex-1 min-h-0 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                                    <div className="grid grid-cols-2 gap-2">
                                        {["T1", "T2", "T3", "T4", "T5", "T6"].map((table, index) => {
                                            const isOccupied = index % 2 === 0
                                            return (
                                                <div
                                                    key={table}
                                                    className="flex items-center justify-between rounded-md border border-neutral-200 bg-white px-2 py-2 text-xs"
                                                >
                                                    <span className="text-neutral-700">{table}</span>
                                                    <span
                                                        className={`h-2 w-2 rounded-full ${isOccupied ? "bg-blue-600" : "bg-neutral-300"}`}
                                                    ></span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="mt-3 h- flex items-center gap-3 text-[10px] text-neutral-500">
                                        <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-600"></span>Occupied</div>
                                        <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-neutral-300"></span>Open</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid flex-1 grid-cols-3 gap-4">
                        <div className="h-64 border-2 border-neutral-200 col-span-3 rounded-lg p-4 bg-white">
                            <div className="flex h-full flex-col gap-3 min-h-0">
                                <div>
                                    <p className="text-sm font-semibold text-neutral-900">Analytical Dashboard</p>
                                    <p className="text-xs text-neutral-500">Trends, sales, and table turns.</p>
                                </div>
                                <div className="flex-1 min-h-0 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                                    <div className="grid h-full grid-cols-4 gap-3 auto-rows-fr min-h-0">
                                        <div className="flex h-full flex-col rounded-md border border-neutral-200 bg-white p-3 min-h-0">
                                            <div className="text-[10px] uppercase tracking-wide text-neutral-500">Orders</div>
                                            <div className="mt-2 text-2xl font-semibold text-neutral-900">{analytics.orders}</div>
                                            <div className="mt-auto flex items-end gap-1">
                                                {[18, 28, 16, 36, 22, 32].map((height, index) => (
                                                    <div
                                                        key={`bar-${index}`}
                                                        className="w-3 rounded-sm bg-blue-600/80"
                                                        style={{ height: `${height}px` }}
                                                    ></div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex h-full flex-col rounded-md border border-neutral-200 bg-white p-3 min-h-0">
                                            <div className="text-[10px] uppercase tracking-wide text-neutral-500">Revenue</div>
                                            <div className="mt-2 text-2xl font-semibold text-neutral-900">${analytics.revenue}</div>
                                            <div className="mt-auto grid grid-cols-2 gap-2 text-xs text-neutral-600 min-h-0">
                                                <div className="rounded-md bg-neutral-100 px-2 py-1">Weekly +12%</div>
                                                <div className="rounded-md bg-neutral-100 px-2 py-1">Peak Hour</div>
                                                <div className="rounded-md bg-neutral-100 px-2 py-1">Avg $24</div>
                                                <div className="rounded-md bg-neutral-100 px-2 py-1">Top Item</div>
                                            </div>
                                        </div>
                                        <div className="flex h-full flex-col rounded-md border border-neutral-200 bg-white p-3 min-h-0">
                                            <div className="text-[10px] uppercase tracking-wide text-neutral-500">Menu Count</div>
                                            <div className="mt-2 text-2xl font-semibold text-neutral-900">{analytics.menus}</div>
                                            <div className="mt-auto h-2 rounded-full bg-neutral-200">
                                                <div
                                                    className="h-2 rounded-full bg-blue-600"
                                                    style={{ width: `${Math.min(100, analytics.menus)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <div className="flex h-full flex-col rounded-md border border-neutral-200 bg-white p-3 min-h-0">
                                            <div className="text-[10px] uppercase tracking-wide text-neutral-500">Order Count</div>
                                            <div className="mt-2 text-2xl font-semibold text-neutral-900">{analytics.orders}</div>
                                            <div className="mt-auto flex items-center gap-2 text-xs text-neutral-600">
                                                <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                                                Active tables tracking
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
