"use client";

import Image from "next/image";
import logo from "../../../../public/logo.png";
import styles from "./header.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
    const router = useRouter();

    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerButtonsContainer}>
            <div className={styles.headerLogo}>
                <Image
                    src={logo}
                    alt="Logo"
                    width={250}
                    height={250}
                    className="rounded-image"
                    onClick={() => router.push('/landing')}
                />
            </div>
                <button className={`${styles.headerButton}`} onClick={() => router.push('/home')}><span>Ventas</span></button>
                <button className={`${styles.headerButton}`} onClick={() => router.push('/home')}><span>Alquileres</span></button>
                <button className={`${styles.headerButton}`} onClick={() => router.push('/auxiliar')}><span>Auxiliares</span></button>
                <button className={`${styles.headerButton}`} onClick={() => router.push('/contact')}><span>Contacto</span></button>
                {/* <h2>(221) 5310582</h2> */}
            </div>
        </div>
    );
}
