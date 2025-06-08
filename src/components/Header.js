import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

function Header() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobileView, setMobileView] = useState(window.innerWidth <= 800);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/showresult?query=${encodeURIComponent(searchTerm)}`);
            setMobileMenuOpen(false); // закрываем панель
        }
    };


    useEffect(() => {
        const handleResize = () => {
            setMobileView(window.innerWidth <= 800);
            if (window.innerWidth > 800) setMobileMenuOpen(false);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
    }, [isMobileMenuOpen]);

    return (
        <>
            <header className="fixed top-0 w-full z-50 bg-gray-800 text-white">
                <div className="py-3 relative">
                    <div className={`max-w-screen-xl mx-auto px-4 flex items-center ${isMobileView ? 'justify-center relative' : 'justify-between'}`}>
                        <div className="flex items-center">
                            <h1 className="hover:text-gray-300 cursor-pointer">
                                <Link to="/" className="text-2xl sm:text-3xl font-bold mr-10">AnimeHub</Link>
                            </h1>

                            {!isMobileView && (
                                <nav>
                                    <ul className="flex gap-4">
                                        <li><Link to="/showallanime" className="hover:text-gray-300">Аниме</Link></li>
                                        <li><Link to="/showcultanime" className="hover:text-gray-300">Культовые Аниме</Link></li>
                                        <li><Link to="/random" className="hover:text-gray-300">Случайное Аниме</Link></li>
                                    </ul>
                                </nav>
                            )}
                        </div>

                        {!isMobileView && (
                            <form onSubmit={handleSearchSubmit} className="relative">
                                <span className="absolute inset-y-0 left-0 pl-2 flex items-center text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Название или Код"
                                    className="w-full max-w-[250px] pl-8 p-2 border border-gray-600 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </form>
                        )}

                        {isMobileView && (
                            <button className="absolute right-4" onClick={() => setMobileMenuOpen(true)}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                            </button>
                        )}
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-red-500" />
                </div>
            </header>

            <div className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col justify-between h-full">
                    <div>
                        <div className="flex items-center justify-between px-4 pt-4">
                            <h1 className="text-3xl font-bold text-left">AnimeHub</h1>
                            <button className="text-white" onClick={() => setMobileMenuOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <hr className="my-4 border-t border-gray-300 w-[88%] mx-auto" />

                        <ul className="flex flex-col gap-4 mt-6 px-4">
                            <li>
                                <Link
                                    to="/"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="mt-3 block w-full bg-red-500 hover:bg-red-800 text-white font-medium py-2 px-4 rounded transition text-center border-[2px] border-gray-300"
                                >
                                    Главная
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/showallanime"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="mt-[3px] block w-full bg-red-500 hover:bg-red-800 text-white font-medium py-2 px-4 rounded transition text-center border-[2px] border-gray-300"
                                >
                                    Аниме
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/showcultanime"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="mt-[3px] block w-full bg-red-500 hover:bg-red-800 text-white font-medium py-2 px-4 rounded transition text-center border-[2px] border-gray-300"
                                >
                                    Культовые Аниме
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/random"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="mt-[3px] block w-full bg-red-500 hover:bg-red-800 text-white font-medium py-2 px-4 rounded transition text-center border-[2px] border-gray-300"
                                >
                                    Случайное Аниме
                                </Link>
                            </li>
                        </ul>

                    </div>

                    {/* Поиск */}
                    <div className="p-4">
                        <hr className="my-4 border-t border-gray-300" />

                        <form onSubmit={handleSearchSubmit} className="relative">
                            <span className="absolute inset-y-0 left-0 pl-2 flex items-center text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                </svg>
                            </span>

                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Название или Код"
                                className="w-full max-w-[250px] pl-8 p-2 border border-gray-600 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Header;
