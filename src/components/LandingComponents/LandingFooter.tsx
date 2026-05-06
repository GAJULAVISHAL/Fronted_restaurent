export const LandingFooter = () => {
    return (
        <footer className="mt-8 border-t border-neutral-200 bg-white" id="contact">
            <div className="mx-auto flex w-full max-w-[84rem] flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-neutral-500 md:flex-row">
                <div className="flex items-center gap-2 text-neutral-900">
                    <span className="text-base font-semibold">Delish</span>
                    <span className="text-neutral-400">|</span>
                    <span>Smart restaurant ops</span>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <a className="hover:text-neutral-900" href="#features">Features</a>
                    <a className="hover:text-neutral-900" href="#pricing">Pricing</a>
                    <a className="hover:text-neutral-900" href="#contact">Contact</a>
                </div>
                <div className="text-xs text-neutral-400">(c) 2026 Delish. All rights reserved.</div>
            </div>
        </footer>
    )
}
