"use client";

import Header from "../components/header/page";
import Link from "next/link";
import WhatsApp from "../components/whatsapp/page";

export default function Contact() {
    return (
        <>
            <Header />
            <NavBar />
            <h2>Teléfono: 2215310582</h2>
            <Link href="https://www.facebook.com/Zingonipropiedades" target="_blank">
                <h2>Facebook: Zingoni Propiedades </h2>
            </Link>
            <Link href="https://www.instagram.com/zingoni_propiedades/" target="_blank">
                <h2>Instagram: @zingoni_propiedades</h2>
            </Link>
            <Link href="mailto:zingonipropiedades@gmail.com" target="_blank">
                <h2>E-mail: zingonipropiedades@gmail.com</h2>
            </Link>
            <WhatsApp />
        </>
    )
}