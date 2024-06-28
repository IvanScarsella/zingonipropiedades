"use client";

import Image from "next/image";
import logo from "../../../../public/logo.png";
import styles from "./header.module.css";
import { useGlobalContext } from '@/context/store';
import Link from 'next/link';
import { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { IoIosWine } from 'react-icons/io';
import { useRouter, usePathname } from 'next/navigation';
import { IoMenu } from 'react-icons/io5';

export default function Header() {
    const router = useRouter();

    const pathname = usePathname()

    const [toggle, setToggle] = useState(false);

    const itemsNav = [
        { title: 'Ventas', onClick: () => { router.push('/home'); setSelectedOperationType('Venta') } },
        { title: 'Alquileres', onClick: () => { router.push('/home'); setSelectedOperationType('Alquiler') } },
        { title: 'Auxiliares', onClick: () => router.push('/auxiliar') },
        { title: 'Contacto', onClick: () => router.push('/contact') },
    ];

    const {
        setSelectedOperationType,
    } = useGlobalContext();

    return (
        <>
            <div className="flex flex-col fixed top-0 w-full z-30 h-[123px] ">
                <div className=" bg-custom-3  flex flex-row justify-between xl:px-40 items-center px-4 my-auto h-full">
                    <div className="ml-2 my-auto w-[74px] h-[74px] hover:scale-110 cursor-pointer transition-all">
                        <Image
                            src={logo}
                            alt="logo"
                            width={740}
                            height={740}
                            className="container h-[74px]"
                            onClick={() => router.push('/')}
                        />
                    </div>
                    <div className=" w-16 h-16 lg:hidden my-auto" hidden={toggle}>
                        <div
                            className="flex flex-col gap-1.5 px-2 py-5 hover:gap-1 transition-all w-full min-w-16 h-full hover:cursor-pointer"
                            onClick={() => setToggle((toggle) => !toggle)}
                        >
                            <div className="bg-[#000] w-full h-1" />
                            <div className="bg-[#000] w-full h-1" />
                            <div className="bg-[#000] w-full h-1" />
                        </div>
                    </div>
                    <div className="w-16 h-16 lg:hidden" hidden={!toggle}>
                        <RxCross1
                            className="w-full h-full"
                            onClick={() => setToggle((toggle) => !toggle)}
                        />
                    </div>
                    <div className="flex flex-row items-center gap-6 max-lg:hidden">
                        {itemsNav.map((item) => (
                            <div
                                className=" "
                                onClick={item.onClick}
                                key={item.title}
                            >
                                <p className="text-sm cursor-pointer hover:underline text-[#fff] transition-all">{item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {toggle ? (
                <div className="bg-custom-3 lg:hidden  fixed top-24 w-full z-30">
                    {itemsNav.map((item) => (
                        <div
                            className="flex flex-row items-center p-1 gap-2 pl-2"
                            onClick={item.onClick}
                            key={item.title}
                        >
                            <p className="text-sm cursor-pointer hover:underline text-[#fff] transition-all">{item.title}</p>
                        </div>
                    ))}
                </div >
            ) : null
            }
        </>
    );

    // return (
    //     <div className='flex flex-row justify-items-center mb-10 bg-[#693d7a94] bg-gradient-custom shadow-lg shadow-black pt-2.5 px-5 max-[600px]:items-center max-[600px]:p-10'
    //     // className={styles.headerContainer}
    //     >
    //         <div className='flex flex-row flex-wrap mr-20 justify-between min-w-full max-w-full max-[600px]:flex-col max-[600px]:items-center'
    //         // className={styles.headerButtonsContainer}
    //         >
    //             <div className='cursor-pointer  w-60 max-[600px]:w-[120px] max-[600px]:m-auto max-[600px]:flex max-[600px]:items-center'
    //             // className={styles.headerLogo}
    //             >
    //                 <Image
    //                     src={logo}
    //                     alt="Logo"
    //                     width={250}
    //                     height={250}
    //                     className="container drop-shadow-md "
    //                     onClick={() => router.push('/landing')}
    //                 />
    //             </div>
    //             <button
    //                 className='border-0 bg-gradient-custom-2 rounded-lg text-white flex text-xl p-1 cursor-pointer transition-all shadow-lg shadow-[##000000ab] items-center justify-center max-w-[200px] flex-1 m-auto max-h-[100px] active:scale-90 max-[600px]:text-xl max-[600px]:m-4 max-[600px]:w-[185px] max-[600px]:min-w-full max-[600px]:max-h-full'
    //                 onClick={() => { router.push('/home'); setSelectedOperationType('Venta') }}
    //             >
    //                 <span className="bg-[#693d7ab0] bg-gradient-custom py-4 px-6 rounded-md transition-all ease-in-out min-w-[150px] hover:bg-none hover:scale-[1.2]">
    //                     Ventas
    //                 </span>
    //             </button>
    //             <button className='border-0 bg-gradient-custom-2 rounded-lg text-white flex text-xl p-1 cursor-pointer transition-all shadow-lg shadow-[##000000ab] items-center justify-center max-w-[200px] flex-1 m-auto max-h-[100px] active:scale-90 max-[600px]:text-xl max-[600px]:m-4 max-[600px]:w-[185px] max-[600px]:min-w-full max-[600px]:max-h-full'
    //                 // className={`${styles.headerButton}`}
    //                 onClick={() => { router.push('/home'); setSelectedOperationType('Alquiler') }}><span className="bg-[#693d7ab0] bg-gradient-custom py-4 px-6 rounded-md transition-all ease-in-out min-w-[150px] hover:bg-none hover:scale-[1.2]">Alquileres</span></button>
    //             <button className='border-0 bg-gradient-custom-2 rounded-lg text-white flex text-xl p-1 cursor-pointer transition-all shadow-lg shadow-[##000000ab] items-center justify-center max-w-[200px] flex-1 m-auto max-h-[100px] active:scale-90 max-[600px]:text-xl max-[600px]:m-4 max-[600px]:w-[185px] max-[600px]:min-w-full max-[600px]:max-h-full' onClick={() => router.push('/auxiliar')}><span className="bg-[#693d7ab0] bg-gradient-custom py-4 px-6 rounded-md transition-all ease-in-out min-w-[150px] hover:bg-none hover:scale-[1.2]">Auxiliares</span></button>
    //             <button className='border-0 bg-gradient-custom-2 rounded-lg text-white flex text-xl p-1 cursor-pointer transition-all shadow-lg shadow-[##000000ab] items-center justify-center max-w-[200px] flex-1 m-auto max-h-[100px] active:scale-90 max-[600px]:text-xl max-[600px]:m-4 max-[600px]:w-[185px] max-[600px]:min-w-full max-[600px]:max-h-full' onClick={() => router.push('/contact')}><span className="bg-[#693d7ab0] bg-gradient-custom py-4 px-6 rounded-md transition-all ease-in-out min-w-[150px] hover:bg-none hover:scale-[1.2]">Contacto</span></button>
    //         </div>
    //     </div>
    // );
}