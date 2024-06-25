"use client";

import Image from "next/image";
import logo from "../../../../public/logo.png";
import styles from "./header.module.css";
import { useRouter } from "next/navigation";
import { useGlobalContext } from '@/context/store';

export default function Header() {
    const router = useRouter();

    const {
        setSelectedOperationType,
    } = useGlobalContext();

    return (
        <div className='flex flex-row justify-items-center mb-10 bg-[#693d7a94] bg-gradient-custom shadow-lg shadow-black pt-2.5 px-5 max-[600px]:items-center max-[600px]:p-10'
        // className={styles.headerContainer}
        >
            <div className='flex flex-row flex-wrap mr-20 justify-between min-w-full max-w-full max-[600px]:flex-col max-[600px]:items-center'
            // className={styles.headerButtonsContainer}
            >
                <div className='cursor-pointer  w-60 max-[600px]:w-[120px] max-[600px]:m-auto max-[600px]:flex max-[600px]:items-center'
                // className={styles.headerLogo}
                >
                    <Image
                        src={logo}
                        alt="Logo"
                        width={250}
                        height={250}
                        className="container drop-shadow-md "
                        onClick={() => router.push('/landing')}
                    />
                </div>
                <button
                    className='border-0 bg-gradient-custom-2 rounded-lg text-white flex text-xl p-1 cursor-pointer transition-all shadow-lg shadow-[##000000ab] items-center justify-center max-w-[200px] flex-1 m-auto max-h-[100px] active:scale-90 max-[600px]:text-xl max-[600px]:m-4 max-[600px]:w-[185px] max-[600px]:min-w-full max-[600px]:max-h-full'
                    onClick={() => { router.push('/home'); setSelectedOperationType('Venta') }}
                >
                    <span className="bg-[#693d7ab0] bg-gradient-custom py-4 px-6 rounded-md transition-all ease-in-out min-w-[150px] hover:bg-none hover:scale-[1.2]">
                        Ventas
                    </span>
                </button>
                <button className='border-0 bg-gradient-custom-2 rounded-lg text-white flex text-xl p-1 cursor-pointer transition-all shadow-lg shadow-[##000000ab] items-center justify-center max-w-[200px] flex-1 m-auto max-h-[100px] active:scale-90 max-[600px]:text-xl max-[600px]:m-4 max-[600px]:w-[185px] max-[600px]:min-w-full max-[600px]:max-h-full'
                    // className={`${styles.headerButton}`}
                    onClick={() => { router.push('/home'); setSelectedOperationType('Alquiler') }}><span className="bg-[#693d7ab0] bg-gradient-custom py-4 px-6 rounded-md transition-all ease-in-out min-w-[150px] hover:bg-none hover:scale-[1.2]">Alquileres</span></button>
                <button className='border-0 bg-gradient-custom-2 rounded-lg text-white flex text-xl p-1 cursor-pointer transition-all shadow-lg shadow-[##000000ab] items-center justify-center max-w-[200px] flex-1 m-auto max-h-[100px] active:scale-90 max-[600px]:text-xl max-[600px]:m-4 max-[600px]:w-[185px] max-[600px]:min-w-full max-[600px]:max-h-full' onClick={() => router.push('/auxiliar')}><span className="bg-[#693d7ab0] bg-gradient-custom py-4 px-6 rounded-md transition-all ease-in-out min-w-[150px] hover:bg-none hover:scale-[1.2]">Auxiliares</span></button>
                <button className='border-0 bg-gradient-custom-2 rounded-lg text-white flex text-xl p-1 cursor-pointer transition-all shadow-lg shadow-[##000000ab] items-center justify-center max-w-[200px] flex-1 m-auto max-h-[100px] active:scale-90 max-[600px]:text-xl max-[600px]:m-4 max-[600px]:w-[185px] max-[600px]:min-w-full max-[600px]:max-h-full' onClick={() => router.push('/contact')}><span className="bg-[#693d7ab0] bg-gradient-custom py-4 px-6 rounded-md transition-all ease-in-out min-w-[150px] hover:bg-none hover:scale-[1.2]">Contacto</span></button>
            </div>
        </div>
    );
}