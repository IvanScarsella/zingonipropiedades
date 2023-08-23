'use client';

import Footer from '../components/footer/page';
import WhatsApp from '../components/whatsapp/page';
import styles from './landing.module.css';
import landing_logo from '../../../public/logo.png'
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useGlobalContext } from "../../../context/store";
import FeaturedPropertiesCarousel from '../components/carousel/page';
import { useEffect, useState } from 'react';
import MailForm from '../components/mailForm/page';

export default function Landing() {

    const router = useRouter();

    const { properties, setProperties } = useGlobalContext();

    const [propertiesChunks, setPropertiesChunks] = useState([])
    useEffect(() => {
        if (properties) {
            const featuredProperties = properties.filter((property) => property.featured);
            const chunks = [];
            for (let i = 0; i < featuredProperties.length; i += 3) {
                chunks.push(featuredProperties.slice(i, i + 3));
            };
            setPropertiesChunks(chunks)
        }
    }, [properties])

    return (
        <div >
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
                </div>
                <div>
                    <button className={`${styles.headerButton}`} onClick={() => router.push('/home?type=Venta')}><span>Ventas</span></button>
                </div>
                <div>
                    <button className={`${styles.headerButton}`} onClick={() => router.push('/auxiliar')}><span>Auxiliares</span></button>
                </div>
                <div>
                    <button className={`${styles.headerButton}`} onClick={() => router.push('/home?type=Alquiler')}><span>Alquileres</span></button>
                </div>
                <div>
                </div>
                <div>
                    <button className={`${styles.headerButton}`} onClick={() => router.push('/contact')}><span>Contacto</span></button>
                </div>
            </div>
            <h1 className={styles.featuredPropertiesTitle}>Propiedades Destacadas</h1>
            <div >
                {propertiesChunks.length ?
                    <FeaturedPropertiesCarousel
                     properties={propertiesChunks}
                      />
                    : <p>Cargando propiedades...</p>}
            </div>
            <div className={styles.mailForm}>
                <MailForm />
            </div>
            <Footer />
            <WhatsApp />
        </div>
    );
}