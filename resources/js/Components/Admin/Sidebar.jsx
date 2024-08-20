import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, usePage } from '@inertiajs/react';
import { HiOutlineX, HiOutlineSearch, HiOutlineLogout, HiChevronDown } from "react-icons/hi";
import navItems from '../../Data/adminLinks';

const NavItem = ({ item: { dropdown, label, icon: Icon, href }, activeDropdown, setActiveDropdown }) => {
    const isActive = activeDropdown === label;
    return dropdown ? (
        <div className="relative">
            <div onClick={() => setActiveDropdown(isActive ? null : label)} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-border cursor-pointer text-text-medium">
                <span className="flex items-center">
                    <Icon className="mr-2 text-lg" /> {label}
                </span>
                <HiChevronDown className={`ml-2 transition-transform ${isActive ? 'rotate-180' : ''}`} />
            </div>
            {isActive && (
                <ul className="mt-2 w-full bg-surface rounded-lg overflow-hidden">
                    {dropdown.map(({ href, label }, index) => (
                        <li key={index}>
                            <Link href={href} className="block px-4 py-2 text-sm rounded-lg transition hover:bg-border text-text-medium">
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    ) : (
        <Link href={href} className="flex items-center p-2.5 rounded-lg hover:bg-border text-text-medium">
            <Icon className="mr-2 text-lg" /> {label}
        </Link>
    );
};

const Sidebar = ({ isMobile, setSidebarOpen }) => {
    const { auth } = usePage().props;
    const [activeDropdown, setActiveDropdown] = useState(null);

    return (
        <motion.aside initial={{ x: isMobile ? "-100%" : 0 }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", bounce: 0, duration: 0.4 }} className="fixed inset-y-0 left-0 z-50 w-[300px] bg-surface md:relative px-4 flex flex-col">
            
            {isMobile && (
                <HiOutlineX className='h-6 w-6 absolute top-4 right-4 cursor-pointer' onClick={() => setSidebarOpen?.(false)} />
            )}
            
            <nav className="mt-8 flex-grow">
                <img className="mx-auto" width="60" src="/images/default/branding/logo.webp" alt="Logo" />
                <div className="relative mt-8">
                    <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-text-medium" />
                    <input placeholder="Search..." className="pl-10 p-3 rounded-lg w-full bg-border text-15 leading-none font-medium focus:outline-none" />
                </div>
                <ul className="space-y-4 mt-5 text-15 font-medium">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <NavItem item={item} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} />
                        </li>
                    ))}
                </ul>
            </nav>
            
            <div className="mt-auto mb-4 flex items-center p-2.5 rounded-lg bg-border">
                <img src={auth.user.avatar || "/images/default/avatar.jpg"} alt="User Avatar" className="w-8 h-8 rounded-full mr-3" />
                <div className="flex-grow">
                    <p className="font-medium text-sm">{auth.user.name}</p>
                    <p className="text-text-medium text-xs">{auth.user.email}</p>
                </div>
                <Link href="/auth/logout">
                    <HiOutlineLogout className="text-xl text-text-medium cursor-pointer" />
                </Link>
            </div>
            
        </motion.aside>
    );
};

export default Sidebar;
