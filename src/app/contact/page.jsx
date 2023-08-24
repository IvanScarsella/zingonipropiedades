"use client";

import Header from "../components/header/page";
import Link from "next/link";
import WhatsApp from "../components/whatsapp/page";
import Footer from "../components/footer/page";
import styles from "./contact.module.css";
import Image from "next/image";
import facebook_logo from "../../../public/facebook_logo.png"
import instagram_logo from "../../../public/instagram_logo.png"
import whatsapp_logo from "../../../public/whatsapp_logo.png"
import MailForm from "../components/mailForm/page";

export default function Contact() {
    return (
        <>
            <Header />
            <div className={styles.contactContainer}>
                <h1 className={styles.title}>Contacto</h1>
                <ul className={styles.socialIcons}>
                    <li>
                        <Link href="https://api.whatsapp.com/send/?phone=5492215310582" target="_blank">
                            <p><Image className={styles.link} src={whatsapp_logo}
                                alt="facebook_logo" width={120} height={120} />2215310582</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="https://www.facebook.com/Zingonipropiedades" target="_blank">
                            <p><Image className={styles.link} src={facebook_logo}
                                alt="facebook_logo" width={120} height={120} />Zingoni Propiedades</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="https://www.instagram.com/zingoni_propiedades/" target="_blank">
                            <p><Image className={styles.link} src={instagram_logo}
                                alt="instagram_logo" width={120} height={120} />@zingoni_propiedades</p>
                        </Link>
                    </li>
                </ul>
                <h3>Puede enviarnos su consulta desde aquí:</h3>
                <MailForm />
            </div>
            <Footer />
            <WhatsApp />
        </>
    )
}