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
import landing from "../../../public/landing.jpg";

export default function Landing() {

    const router = useRouter();

    const { properties, setProperties } = useGlobalContext();

    const clients = [
        { name: 'name', review: 'review' },
        { name: 'name', review: 'review' },
        { name: 'name', review: 'review' },
    ]

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
                <button className='border-2 border-[#fff] hover:border-custom-4 text-sm text-[#fff] font-bold hover:bg-[#fff] hover:text-custom-4 h-14 w-60 mx-auto ease-in-out transition-all'>

                    Ver propiedades
                </button>
            </div>
            <div className='flex flex-row max-sm:flex-col items-center gap-4 px-10 max-sm:px-4 mt-4'>
                <div className="w-1/2 max-sm:w-full h-[174px] overflow-hidden transition-transform mx-auto">
                    <Image
                        src={landing}
                        alt="logo"
                        width={1740}
                        height={1740}
                        className="w-[450px] max-sm:w-80 h-[400px] max-sm:h-80 transform translate-y-[-16%] bg-[#fff] mx-auto"
                        onClick={() => router.push('/')}
                    />
                </div>
                <p className='text-base w-1/2 max-sm:w-full'>Martillera y corredora pública Nacional .U.N.L.P. Perito Jud.
                    Colegio de Martilleros y Corredores públicos Dto Judicial de La Plata.
                    Colegiada N°7588</p>
            </div>
            <div className='flex flex-row justify-around gap-4 max-sm:flex-col w-full px-4 mt-4'>
                <div className='relative w-5/12 max-sm:w-full hover:scale-110 cursor-pointer transition-all hover:grayscale-[.5] grayscale-0 hover:text-[#000] text-[#fff]'>
                    <Image
                        src='https://static.wixstatic.com/media/8d96af_23eb09f032ec4ee68e39e861a5a66412~mv2.jpg/v1/fill/w_1419,h_485,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/8d96af_23eb09f032ec4ee68e39e861a5a66412~mv2.jpg'
                        width={1500}
                        height={1500}
                        className='w-full h-full object-cover'
                    />
                    <p className='absolute inset-0 flex items-center justify-center text-4xl lg:text-6xl backdrop-contrast-125'>
                        Ventas
                    </p>
                </div>
                <div className='relative w-5/12 max-sm:w-full hover:scale-110 cursor-pointer transition-all hover:grayscale-[.6] grayscale-0 hover:text-[#000] text-3xl text-[#fff] '>
                    <Image
                        src='https://static.wixstatic.com/media/8d96af_23eb09f032ec4ee68e39e861a5a66412~mv2.jpg/v1/fill/w_1419,h_485,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/8d96af_23eb09f032ec4ee68e39e861a5a66412~mv2.jpg'
                        width={1500}
                        height={1500}
                        className='w-full h-full object-cover '
                    />
                    <p className='absolute inset-0 flex items-center justify-center text-4xl lg:text-6xl backdrop-contrast-125 '>
                        Alquileres
                    </p>
                </div>
            </div>
            <div className='mt-4'>
                <h2 className='text-3xl'>Nuestros clientes</h2>
                <div className='overflow-x-auto flex flex-row'>
                    {clients.map((client) => (
                        <div className='flex flex-col items-center border border-custom-4 bg-custom text-[#fff]w-full'>
                            <p className='text-xl'>{client.name}</p>
                            <div className='bg-custom-4 h-1 w-full mx-4' />
                            <p className='text-xl'>{client.review}</p>
                        </div>
                    ))}
                </div>
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
        </div >
    );
}