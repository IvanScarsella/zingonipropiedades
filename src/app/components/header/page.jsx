"use client";

import Image from "next/image";
import logo from "../../../../public/logo.png";
import styles from "./header.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
    const router = useRouter();
    const [isHome, setIsHome] = useState(false);

    useEffect(() => {
        // Verificar si estamos en la página de inicio
        setIsHome(router.pathname === "/home");
    }, [router.pathname]);

    const handleHomeClick = () => {
        if (isHome) {
            window.location.reload();
        } else {
            router.push('/home'); // Ir a la página de inicio si no estamos en ella
        }
    };

    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerLogo} onClick={handleHomeClick}>
                <Image
                    src={logo}
                    alt="Logo"
                    width={150}
                    height={150}
                    className="rounded-image"
                    onClick={() => router.push('/home')}
                />
            </div>
            <div className={styles.headerButtonsContainer}>
                <button className={`${styles.headerButton}`} onClick={() => router.push('/home')}><span>Inicio</span></button>
                <button className={`${styles.headerButton}`} onClick={() => router.push('/auxiliar')}><span>Auxiliares</span></button>
                <button className={`${styles.headerButton}`} onClick={() => router.push('/contact')}><span>Contacto</span></button>
            </div>
        </div>
    );
}
