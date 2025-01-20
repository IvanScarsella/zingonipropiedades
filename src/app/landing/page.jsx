'use client';

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useGlobalContext } from "../../../context/store";
import { useEffect, useState } from 'react';
import logo from "../../../public/logo.png";
import landing from "../../../public/landing.jpg";
import FeaturedPropertiesCarousel from '../components/carousel/page'; // Si no lo usas, podrías quitarlo
import imageUrlBuilder from "@sanity/image-url";
import client from "@/src/sanity/lib/client";
const builder = imageUrlBuilder(client);

export default function Landing() {
    const router = useRouter();
    const { properties, setSelectedOperationType } = useGlobalContext();

    const buttons = [
        { name: 'Ventas', image: 'https://static.wixstatic.com/media/8d96af_23eb09f032ec4ee68e39e861a5a66412~mv2.jpg', onClick: () => { router.push('/home'); setSelectedOperationType('Venta'); } },
        { name: 'Alquileres', image: 'https://static.wixstatic.com/media/8d96af_23eb09f032ec4ee68e39e861a5a66412~mv2.jpg', onClick: () => { router.push('/home'); setSelectedOperationType('Alquiler'); } },
    ];

    const clients = [
        { name: 'Gabriela', review: 'Gracias a Sandra pude vender una casa y concretar el viaje soñado.' },
        { name: 'Andrés', review: 'Me encantaron las casas en alquiler en Mar Azul.' },
        { name: 'Violeta', review: 'Me encantó conocer Ignacio Correas y haber invertido ahí.' },
        { name: 'José', review: 'Pudimos terminar el proyecto de venta de lotes propios junto a Zingoni Propiedades.' },
    ];

    const [images, setImages] = useState([])

    useEffect(() => {
        let propertyImages = []
        properties.forEach((property) => {
            if (property.featured && property.mainImage) {
                propertyImages.push(property.mainImage)
            }
        })
        setImages(propertyImages)
        console.log(propertyImages)
    }, [properties])

    const [randomImage, setRandomImage] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setRandomImage(Math.floor(Math.random() * images.length))
        }, 3000)

        return () => clearInterval(interval)
    }, [images.length])

    return (
        <div className="flex flex-col items-center mb-4">
            {/* Imagen de fondo */}
            <div className="relative w-full h-screen overflow-hidden">
                {images.length ?
                    <Image
                        src={
                            images.length ?
                                builder.image(images[randomImage]).width(2000).height(2000).url() :
                                'https://static.wixstatic.com/media/8d96af_23eb09f032ec4ee68e39e861a5a66412~mv2.jpg'}
                        // src='https://static.wixstatic.com/media/8d96af_23eb09f032ec4ee68e39e861a5a66412~mv2.jpg'
                        alt="Imagen de fondo"
                        className="absolute inset-0 object-cover w-full h-full"
                        width={1500}
                        height={1500}
                    />
                    :
                    <Image
                        src={'https://static.wixstatic.com/media/8d96af_23eb09f032ec4ee68e39e861a5a66412~mv2.jpg'}
                        // src='https://static.wixstatic.com/media/8d96af_23eb09f032ec4ee68e39e861a5a66412~mv2.jpg'
                        alt="Imagen de fondo"
                        className="absolute inset-0 object-cover w-full h-full"
                        width={1500}
                        height={1500}
                    />
                }
            </div>

            {/* Logo y botón principal */}
            <div className="absolute top-60 left-0 right-0 flex flex-col items-center h-screen w-full">
                <div className="w-full h-[450px] transition-transform mx-auto max-sm:h-72">
                    <Image
                        src={logo}
                        alt="Logo de la empresa"
                        width={740}
                        height={740}
                        className="w-[400px] max-sm:w-48 h-[400px] max-sm:h-64 transform bg-gradient-to-b from-transparent via-transparent via-70% to-[#ebd3ff53] to-80% bg-opacity-10 bg-bottom mx-auto cursor-pointer"
                        onClick={() => router.push('/')}
                    />
                </div>
                <button
                    className="border-2 border-white hover:border-custom-4 text-sm max-sm:font-medium text-white font-bold bg-custom-2 hover:bg-white hover:text-custom-4 h-14 max-sm:h-10 w-60 max-sm:w-40 mx-auto transition-all"
                    onClick={() => router.push('/home')}
                >
                    Ver propiedades
                </button>
            </div>

            {/* Logo adicional e información */}
            <div className="flex flex-row max-lg:flex-col items-center gap-4 lg:px-8 px-2 mt-4">
                <div className="max-sm:w-full  overflow-hidden transition-transform mx-auto">
                    <Image
                        src={landing}
                        alt="logo"
                        width={959}
                        height={439}
                        className="w-[480px] h-[220px] max-sm:h-auto transform bg-[#fff] mx-auto"
                        onClick={() => router.push('/')}
                    />
                </div>
                <p className="text-base w-1/2 max-sm:w-full">
                    Martillera y corredora pública Nacional .U.N.L.P. Perito Jud.
                    Colegio de Martilleros y Corredores públicos Dto Judicial de La Plata.
                    Colegiada N°7588
                </p>
            </div>

            {/* Botones de Ventas y Alquileres */}
            <div className="flex flex-row justify-around gap-4 max-sm:flex-col w-full px-4 mt-4">
                {buttons.map(button => (
                    <div
                        key={button.name}
                        className="relative w-5/12 max-sm:w-full cursor-pointer transition-all hover:grayscale-[.5] text-white overflow-hidden zoom"
                        onClick={button.onClick}
                    >
                        <Image
                            src={button.image}
                            alt={`Imagen de ${button.name}`}
                            width={1500}
                            height={1500}
                            className="w-full h-full object-cover hover:scale-110"
                        />
                        <p className="absolute inset-0 flex items-center justify-center text-4xl lg:text-6xl backdrop-contrast-125">
                            {button.name}
                        </p>
                    </div>
                ))}
            </div>

            {/* Reseñas de Clientes */}
            <div className="mt-8 flex flex-col items-center w-full p-4 bg-custom-4">
                <h2 className="text-3xl font-bold my-6 text-white">Nuestros clientes</h2>
                <div className="overflow-x-auto flex flex-row gap-6 py-4 w-full">
                    {clients.map(client => (
                        <div key={client.name} className="flex flex-col min-w-[280px] sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px] items-center border border-gray-300 bg-white shadow-lg rounded-lg p-6">
                            <p className="text-2xl font-semibold mb-2 text-gray-700">{client.name}</p>
                            <div className="bg-custom-4 h-0.5 w-full mb-4" />
                            <p className="text-lg text-gray-600">{client.review}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
