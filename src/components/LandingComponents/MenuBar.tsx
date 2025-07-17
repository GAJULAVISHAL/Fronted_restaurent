import { useNavigate } from 'react-router-dom';

export const MenuBar = () => {
    const navigate = useNavigate(); 
    return (
        <div className="flex justify-center items-center z-50 fixed top-0 left-0 right-0">
            <div className="flex justify-between items-center bg-[#668cff]/50 backdrop-blur-[10px] rounded-2xl m-4 p-2 w-4/5">
                <div className="flex items-center">
                    <span className="text-xl font-bold text-white">Delish</span>
                </div>
                <div className="flex items-center gap-4">
                    <button className="text-white font-bold px-4 py-2 rounded-2xl hover:bg-white/10 transition-colors" onClick={() => navigate('/login')}>LogIn</button>
                    <button className="bg-[#f5abec] text-white font-bold px-4 py-2 rounded-2xl hover:bg-[#f5abec]/80 transition-colors" onClick={() => navigate('/signup')}>Get Started</button>
                    
                </div>
            </div>
        </div>
    )
}