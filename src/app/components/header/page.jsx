"use client";

import Image from "next/image";
import logo from "../../../../public/logo.png";
import styles from "./header.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
    const router = useRouter();
    // const [isHome, setIsHome] = useState(false);

    // useEffect(() => {
    //     setIsHome(router.pathname === "/home");
    // }, [router.pathname]);

    // const handleHomeClick = () => {
    //     if (isHome) {
    //         window.location.reload();
    //     } else {
    //         router.push('/home');
    //     }
    // };

    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerLogo}
            //  onClick={handleHomeClick}
             >
                <Image
                    src={logo}
                    alt="Logo"
                    width={250}
                    height={250}
                    className="rounded-image"
                    onClick={() => router.push('/landing')}
                />
            </div>
            <div className={styles.headerButtonsContainer}>
                <button className={`${styles.headerButton}`} onClick={() => router.push('/home')}><span>Inicio</span></button>
                <button className={`${styles.headerButton}`} onClick={() => router.push('/auxiliar')}><span>Auxiliares</span></button>
                <button className={`${styles.headerButton}`} onClick={() => router.push('/contact')}><span>Contacto</span></button>
                <h2>(221) 5310582</h2>
            </div>
        </div>
    );
}
