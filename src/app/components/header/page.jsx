"use client";

import Image from "next/image";
import logo from "../../../../public/logo.png";
import { useGlobalContext } from '@/context/store';
import Link from 'next/link';
import { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { useRouter, usePathname } from 'next/navigation';
import { IoMenu } from 'react-icons/io5';

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const [toggle, setToggle] = useState(false);
    const { setSelectedOperationType } = useGlobalContext();

    const itemsNav = [
        { title: 'Ventas', onClick: () => { router.push('/home'); setSelectedOperationType('Venta'); setToggle(false); } },
        { title: 'Alquileres', onClick: () => { router.push('/home'); setSelectedOperationType('Alquiler Temporario'); setToggle(false); } },
        { title: 'Auxiliares', onClick: () => { router.push('/auxiliar'); setToggle(false); } },
        { title: 'Contacto', onClick: () => { router.push('/contact'); setToggle(false); } },
    ];

    return (
        <>
            {/* Navbar */}
            <header className="fixed top-0 w-full z-30 bg-opacity-90 bg-custom-4">
                <div className="flex justify-between items-center h-[123px] xl:px-40 px-4">
                    {/* Logo */}

                    <div className="ml-2 mb-4 w-[74px] h-[74px] overflow-hidden cursor-pointer transition-transform scale-110 hover:scale-[1.2]">
                        <Image
                            src={logo}
                            alt="logo"
                            width={740}
                            height={740}
                            className="w-[107px] h-[107px] transform scale-[0.76]"
                            onClick={() => router.push('/')}
                        />
                    </div>

                    {/* Mobile Menu Icon */}
                    <div className="lg:hidden">
                        <IoMenu
                            className="w-8 h-8 cursor-pointer text-black"
                            aria-label="Open menu"
                            onClick={() => setToggle(true)}
                        />
                    </div>

                    {/* Desktop Links */}
                    <nav className="hidden lg:flex items-center gap-6 ">
                        {itemsNav.map((item) => (
                            <button
                                key={item.title}
                                onClick={item.onClick}
                                className="text-white text-sm hover:underline transition-all"
                            >
                                {item.title}
                            </button>
                        ))}
                    </nav>
                </div>
            </header>

            {/* Mobile Menu */}
            <div className={`fixed top-0 right-0 h-full w-64 bg-custom-3 bg-opacity-75 z-40 transition-transform duration-300 transform ${toggle ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
                <div className="flex flex-col p-4">
                    {/* Close Icon */}
                    <RxCross1
                        className="w-8 h-8 text-white self-end cursor-pointer mb-4"
                        aria-label="Close menu"
                        onClick={() => setToggle(false)}
                    />
                    {/* Mobile Links */}
                    {itemsNav.map((item) => (
                        <button
                            key={item.title}
                            onClick={item.onClick}
                            className="text-white text-xl p-4 hover:underline transition-all"
                        >
                            {item.title}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
