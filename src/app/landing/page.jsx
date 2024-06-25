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
        <div
            className='flex flex-col items-center'
        //  className={styles.landingContainer}
        >
            <div
                className='flex flex-row justify-items-center justify-center min-w-full mb-10 bg-gradient-custom shadow-lg shadow-black max-[600px]:flex-col max-[600px]:items-center max-[600px]:p-10'
            // className={styles.headerContainer}
            >
                <div
                    className='flex rounded-2xl grid-cols-2 mb-0 order-2 items-center'
                // className={styles.headerLogo}
                >
                    <Image
                        src={landing_logo}
                        alt="landing_logo"
                        width={400}
                        height={400}
                        className="mx-[100px] drop-shadow-lg"
                        onClick={() => router.push('/home')}
                    />
                </div>
                <div
                    className='flex order-1 flex-col justify-around items-center'
                //  className={styles.headerButtons1}
                >

                    <div>
                        <button
                            className='border-0 bg-gradient-custom-2 rounded-lg text-white flex text-4xl cursor-pointer transition-all items-center justify-center drop-shadow-lg active:scale-90'
                            //  className={`${styles.headerButton}`} 
                            onClick={() => router.push('/home?type=Venta')}>
                            <span
                                className='bg-gradient-custom bg-[#693d7ab0] px-4 py-6 rounded-md transition-all w-[200px] hover:bg-none hover:scale-[1.2]'
                            >Ventas</span></button>
                    </div>
                    <div>
                        <button
                            className='border-0 bg-gradient-custom-2 rounded-lg text-white flex text-4xl cursor-pointer transition-all items-center justify-center drop-shadow-lg active:scale-90'
                            //  className={`${styles.headerButton}`}
                            onClick={() => router.push('/home?type=Alquiler')}><span
                                className='bg-gradient-custom bg-[#693d7ab0] px-4 py-6 rounded-md transition-all w-[200px] hover:bg-none hover:scale-[1.2]'
                            >Alquileres</span></button>
                    </div>
                </div>
                <div
                    className='flex order-3 flex-col justify-around items-center'
                //  className={styles.headerButtons2}
                >

                    <div>
                        <button
                            className='border-0 bg-gradient-custom-2 rounded-lg text-white flex text-4xl cursor-pointer transition-all items-center justify-center drop-shadow-lg active:scale-90'
                            //  className={`${styles.headerButton}`}
                            onClick={() => router.push('/auxiliar')}><span
                                className='bg-gradient-custom bg-[#693d7ab0] px-4 py-6 rounded-md transition-all w-[200px] hover:bg-none hover:scale-[1.2]'
                            >Auxiliares</span></button>
                    </div>
                    <div>
                        <button
                            className='border-0 bg-gradient-custom-2 rounded-lg text-white flex text-4xl cursor-pointer transition-all items-center justify-center drop-shadow-lg active:scale-90'
                            // className={`${styles.headerButton}`} 
                            onClick={() => router.push('/contact')}><span className='bg-gradient-custom bg-[#693d7ab0] px-4 py-6 rounded-md transition-all w-[200px] hover:bg-none hover:scale-[1.2]'
                            >Contacto</span></button>
                    </div>
                </div>
            </div>
            <h1
                className='text-white flex justify-center items-center text-4xl bg-gradient-custom bg-[#693d7ab0] drop-shadow-md min-w-full'
            //  className={styles.featuredPropertiesTitle}
            >Propiedades Destacadas</h1>
            <div
                className='ml-[1px]'
            //  className={styles.featuredProperties}
            >
                {propertiesChunks.length ?
                    <FeaturedPropertiesCarousel
                        properties={propertiesChunks}
                    />
                    : <p>Cargando propiedades...</p>}
            </div>
            <div
                className='flex items-center justify-center m-1'
            //  className={styles.mailForm}
            >
                <MailForm />
            </div>
            <Footer />
            <WhatsApp />
        </div>
    );
}