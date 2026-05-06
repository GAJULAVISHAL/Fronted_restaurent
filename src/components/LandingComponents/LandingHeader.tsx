type LandingHeaderProps = {
    onLogin: () => void
    onSignup: () => void
}

export const LandingHeader = ({ onLogin, onSignup }: LandingHeaderProps) => {
    return (
        <header className="w-full sticky top-0 z-50 border-b border-neural-100 bg-white">
            <div className="mx-auto flex h-16 items-center px-4">
                <div className="text-2xl font-bold text-center px-2 mr-2">
                    <a href="/">Delish</a>
                </div>
                <div className="w-full flex items-center justify-between">
                    <nav className="flex items-center text-sm text-neutral-600">
                        <a className="space-x-1 px-3 py-2 font-medium" href="#features">Features</a>
                        <div className="mx-1 h-4 w-px bg-neutral-300"></div>
                        <a className="space-x-1 px-3 py-2 font-medium" href="#pricing">Pricing</a>
                        <div className="mx-1 h-4 w-px bg-neutral-300"></div>
                        <a className="space-x-1 px-3 py-2 font-medium" href="#testimonials">Testimonials</a>
                        <div className="mx-1 h-4 w-px bg-neutral-300"></div>
                        <a className="space-x-1 px-3 py-2 font-medium" href="#contact">Contact</a>
                    </nav>
                    <div className="flex items-center">
                        <a className="cursor-pointer px-3 py-2 font-medium" onClick={onLogin}>Login</a>
                        <div className="mx-1 h-4 w-px bg-neutral-300"></div>
                        <a className="cursor-pointer mx-3 my-2 p-2 font-medium text-white bg-blue-600 rounded-lg" onClick={onSignup}>Signup</a>
                    </div>
                </div>
            </div>
        </header>
    )
}
