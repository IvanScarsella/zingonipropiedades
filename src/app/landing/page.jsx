'use client';

import Header from '../components/header/page';
import Footer from '../components/footer/page';
import WhatsApp from '../components/whatsapp/page';
import styles from './landing.module.css';
import landing_logo from '../../../public/logo.png'
import landing_logo_2 from '../../../public/landing_logo_2.png'
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Landing() {

    const router = useRouter();

    return (
        <div>
            <div className={styles.headerContainer}>
                <div className={styles.headerLogo}>
                    <Image
                        src={landing_logo}
                        alt="landing_logo"
                        width={400}
                        height={400}
                        className="rounded-image"
                        onClick={() => router.push('/home')}
                    />
                    {/* <Image
                        src={landing_logo_2}
                        alt="landing_logo_2"
                        width={400}
                        height={400}
                        className="rounded-image"
                        onClick={() => router.push('/home')}
                    /> */}
                </div>
                <div>
                    <button className={`${styles.headerButton}`} onClick={() => router.push('/home')}><span>Ventas</span></button>
                </div>
                <div>
                    <button className={`${styles.headerButton}`} onClick={() => router.push('/auxiliar')}><span>Auxiliares</span></button>
                </div>
                <div>
                    <button className={`${styles.headerButton}`} onClick={() => router.push('/home')}><span>Alquileres</span></button>
                </div>
                <div>
                </div>
                <div>
                    <button className={`${styles.headerButton}`} onClick={() => router.push('/contact')}><span>Contacto</span></button>
                </div>
            </div>
            <Footer />
            <WhatsApp />
        </div>
    );
}