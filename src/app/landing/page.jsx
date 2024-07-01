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
import Header from '../components/header/page';
import logo from "../../../public/logo.png";

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
            <div className="relative w-full h-screen overflow-hidden">
                <Image
                    src='https://static.wixstatic.com/media/8d96af_23eb09f032ec4ee68e39e861a5a66412~mv2.jpg/v1/fill/w_1419,h_485,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/8d96af_23eb09f032ec4ee68e39e861a5a66412~mv2.jpg'
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto h-auto min-w-[1000px] min-h-[1000px]"
                    // style={{ width: 'auto', height: 'auto', minWidth: '1000px', minHeight: '1000px' }}
                    width={1500}
                    height={1500}
                />
            </div>
            <div className='absolute top-60 left-0 right-0 flex flex-col items-center h-screen w-full'>
                <div className="w-full h-[174px] overflow-hidden transition-transform mx-auto">
                    <Image
                        src={logo}
                        alt="logo"
                        width={740}
                        height={740}
                        className="w-[400px] max-sm:w-80 h-[400px] max-sm:h-80 transform translate-y-[-75%] bg-[#fff] mx-auto"
                        onClick={() => router.push('/')}
                    />
                </div>
                <button className='border-2 border-[#fff] hover:border-custom-4 text-sm text-[#fff] hover:bg-[#fff] hover:text-custom-4 h-14 w-60 mx-auto ease-in-out transition-all'>

                    Ver propiedades
                </button>

            </div>
            {/* <Header /> */}
            {/* <div
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
            </div> */}
            {/* <h1
                className='text-white flex justify-center items-center text-4xl bg-gradient-custom bg-[#693d7ab0] drop-shadow-md min-w-full'
            //  className={styles.featuredPropertiesTitle}
            >Propiedades Destacadas</h1> */}
            {/* <div
                className='ml-[1px]'
            //  className={styles.featuredProperties}
            >
                {propertiesChunks.length ?
                    <FeaturedPropertiesCarousel
                        properties={propertiesChunks}
                    />
                    : <p>Cargando propiedades...</p>}
            </div> */}
            {/* <div
                className='flex items-center justify-center m-1'
            //  className={styles.mailForm}
            >
                <MailForm />
            </div> */}
            {/* <Footer /> */}
            <WhatsApp />
        </div>
    );
}