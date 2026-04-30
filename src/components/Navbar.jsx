import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, Newspaper, GraduationCap, Phone, CalendarDays } from 'lucide-react';
import { InteractiveMenu } from "@/components/ui/modern-mobile-menu";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { label: 'home', icon: Home, path: '/' },
        { label: 'news', icon: Newspaper, path: '/news' },
        { label: 'book', icon: CalendarDays, path: '/book' },
        { label: 'learn', icon: GraduationCap, path: '/learn' },
        { label: 'contact', icon: Phone, path: '/contact' },
    ];

    const activeIndex = menuItems.findIndex(i => i.path === location.pathname);

    const handleMobileClick = (item) => {
        const target = menuItems.find(i => i.label === item.label);
        if (target) navigate(target.path);
    };

    return (
        <>
            {/* DESKTOP NAVBAR */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 left-0 w-full z-50 hidden md:flex justify-between items-center px-12 py-6 bg-transparent shadow-xl rounded-xl"
            >
                <div className="text-white font-black text-2xl tracking-tighter italic">
                    SMASHER'S <span className="text-blue-200">CLUB</span>
                </div>

                <div className="flex items-center gap-10">
                    <ul className="flex gap-8 text-white font-semibold text-sm uppercase tracking-widest">
                        <li className={`hover:text-blue-200 transition-colors cursor-pointer ${location.pathname === '/about' ? 'text-blue-300' : ''}`}>
                            <Link to="/about">Find Players</Link>
                        </li>
                        <li className={`hover:text-blue-200 transition-colors cursor-pointer ${location.pathname === '/news' ? 'text-blue-300' : ''}`}>
                            <Link to="/news">News</Link>
                        </li>
                        <li className={`hover:text-blue-200 transition-colors cursor-pointer ${location.pathname === '/learn' ? 'text-blue-300' : ''}`}>
                            <Link to="/learn">Learn</Link>
                        </li>
                        <li className={`hover:text-blue-200 transition-colors cursor-pointer ${location.pathname === '/contact' ? 'text-blue-300' : ''}`}>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>

                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255,255,255,0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-[#61995E] px-6 py-2 rounded-full font-bold uppercase text-xs tracking-wider shadow-lg"
                    >
                        <Link to="/book">Book a Court</Link>
                    </motion.button>
                </div>
            </motion.nav>

            {/* MOBILE NAVBAR */}
            <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[500px] z-50 pointer-events-none">
                <div className="pointer-events-auto bg-white/10 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/20 px-2">
                    <InteractiveMenu
                        items={menuItems}
                        accentColor="#ffffff"
                        activeIndex={activeIndex !== -1 ? activeIndex : 0}
                        onItemClick={handleMobileClick}
                    />
                </div>
            </div>

            {/* MOBILE LOGO (Fixed at top for branding) */}
            <div className="md:hidden fixed top-0 left-0 w-full p-6 z-50 flex justify-center pointer-events-none">
                <div className="text-white font-black text-2xl italic tracking-tighter drop-shadow-md">
                    SMASHER'S <span className="text-blue-200">CLUB</span>
                </div>
            </div>
        </>
    );
};

export default Navbar;