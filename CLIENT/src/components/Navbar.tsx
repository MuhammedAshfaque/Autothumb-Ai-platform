import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function Navbar() {
    const { isLoggedIn, user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    return (
        <>
            <motion.nav
                className="fixed top-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 bg-white/80 backdrop-blur border-b border-gray-200 text-gray-800"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
            >
                <Link to={'/'}>
                    <img src="/logo.svg" alt="logo" className="h-8.5 w-auto" />
                </Link>

                <div className="hidden md:flex items-center gap-8 transition duration-500 font-medium">
                    <Link to={'/'} className="hover:text-blue-600 transition">Home</Link>
                    <Link to={'/generate'} className="hover:text-blue-600 transition">Generate</Link>

                    {isLoggedIn ? (
                        <Link to={'/my-generation'} className="hover:text-blue-600 transition">
                            My Generation
                        </Link>
                    ) : (
                        <Link to={'/about'} className="hover:text-blue-600 transition">About</Link>
                    )}

                    <Link to={'/contact'} className="hover:text-blue-600 transition">Contact</Link>
                </div>

                <div className="flex items-center gap-2">
                    {isLoggedIn ? (
                        <div className="relative group">
                            <button className="rounded-full size-8 bg-blue-600 text-white font-semibold border border-blue-500">
                                {user?.name.charAt(0).toUpperCase()}
                            </button>
                            <div className="absolute hidden group-hover:block top-6 right-0 pt-4">
                                <button
                                    onClick={async () => logout()}
                                    className="px-4 py-2.5 bg-white border border-gray-300 hover:bg-gray-100 active:scale-95 transition-all rounded-full shadow-md"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className="hidden md:block px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white active:scale-95 transition-all rounded-full shadow-md"
                        >
                            Get Started
                        </button>
                    )}

                    <button onClick={() => setIsOpen(true)} className="md:hidden text-gray-700">
                        <MenuIcon size={26} className="active:scale-90 transition" />
                    </button>
                </div>
            </motion.nav>

            {/* For mobile phones */}
            <div
                className={`fixed inset-0 z-100 bg-white/90 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-400 text-gray-800 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <Link onClick={() => setIsOpen(false)} to={'/'} className="hover:text-blue-600 transition">
                    Home
                </Link>
                <Link onClick={() => setIsOpen(false)} to={'/generate'} className="hover:text-blue-600 transition">
                    Generate
                </Link>

                {isLoggedIn ? (
                    <Link
                        onClick={() => setIsOpen(false)}
                        to={'/my-generation'}
                        className="hover:text-blue-600 transition"
                    >
                        My Generation
                    </Link>
                ) : (
                    <Link onClick={() => setIsOpen(false)} to={'/about'} className="hover:text-blue-600 transition">
                        About
                    </Link>
                )}

                <Link onClick={() => setIsOpen(false)} to={'/contact'} className="hover:text-blue-600 transition">
                    Contact Us
                </Link>

                {isLoggedIn ? (
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            logout();
                        }}
                        className="px-6 py-2.5 bg-white border border-gray-300 hover:bg-gray-100 active:scale-95 transition-all rounded-full shadow-md"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        onClick={() => setIsOpen(false)}
                        to={'/login'}
                        className="hover:text-blue-600 transition"
                    >
                        Login
                    </Link>
                )}

                <button
                    onClick={() => setIsOpen(false)}
                    className="aspect-square size-10 p-1 bg-blue-600 hover:bg-blue-500 transition text-white rounded-md flex items-center justify-center"
                >
                    <XIcon />
                </button>
            </div>

        </>
    );
}