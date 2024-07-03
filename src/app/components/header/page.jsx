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

    const itemsNav = [
        { title: 'Ventas', onClick: () => { router.push('/home'); setSelectedOperationType('Venta'); setToggle(false); } },
        { title: 'Alquileres', onClick: () => { router.push('/home'); setSelectedOperationType('Alquiler'); setToggle(false); } },
        { title: 'Auxiliares', onClick: () => { router.push('/auxiliar'); setToggle(false); } },
        { title: 'Contacto', onClick: () => { router.push('/contact'); setToggle(false); } },
    ];

    const { setSelectedOperationType } = useGlobalContext();

    return (
        <>
            <div className="flex flex-col fixed top-0 w-full z-30 h-[123px]">
                <div className="flex flex-row justify-between xl:px-40 items-center px-4 my-auto h-full">
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

                    <div className="w-16 h-16 lg:hidden my-auto" hidden={toggle}>
                        <div
                            className="flex flex-col justify-around gap-0 px-2 py-4 hover:gap-1 transition-all w-full min-w-16 h-full hover:cursor-pointer"
                            onClick={() => setToggle(true)}
                        >
                            <div className="bg-[#000] w-full h-1" />
                            <div className="bg-[#000] w-full h-1" />
                            <div className="bg-[#000] w-full h-1" />
                        </div>
                    </div>

                    <div className="flex flex-row items-center gap-6 max-lg:hidden">
                        {itemsNav.map((item) => (
                            <div
                                className=""
                                onClick={item.onClick}
                                key={item.title}
                            >
                                <p className="text-sm cursor-pointer hover:underline text-[#fff] transition-all">{item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={`fixed top-0 right-0 h-full w-auto bg-custom-3 bg-opacity-75 z-40 transform ${toggle ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 lg:hidden`}>
                <div className="flex flex-col items-end mt-6 p-4 pl-8">
                    <div className="self-end mb-4">
                        <RxCross1
                            className="w-8 h-8 cursor-pointer text-white mr-4"
                            onClick={() => setToggle(false)}
                        />
                    </div>
                    {itemsNav.map((item) => (
                        <div
                            className="flex flex-row items-center p-4"
                            onClick={item.onClick}
                            key={item.title}
                        >
                            <p className="text-xl cursor-pointer hover:underline text-[#fff] transition-all">{item.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

