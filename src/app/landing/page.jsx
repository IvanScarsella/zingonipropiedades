'use client';

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useGlobalContext } from "../../../context/store";
import { useEffect, useState } from 'react';
import logo from "../../../public/logo.png";
import landing from "../../../public/landing.jpg";
import FeaturedPropertiesCarousel from '../components/carousel/page'; // Si no lo usas, podrías quitarlo

export default function Landing() {
    const router = useRouter();
    const { properties, setSelectedOperationType } = useGlobalContext();

    const buttons = [
        { name: 'Ventas', image: 'https://static.wixstatic.com/media/8d96af_23eb09f032ec4ee68e39e861a5a66412~mv2.jpg', onClick: () => { router.push('/home'); setSelectedOperationType('Venta'); } },
        { name: 'Alquileres', image: 'https://static.wixstatic.com/media/8d96af_23eb09f032ec4ee68e39e861a5a66412~mv2.jpg', onClick: () => { router.push('/home'); setSelectedOperationType('Alquiler'); } },
    ];

    const clients = [
        { name: 'Nombre del Cliente', review: 'Reseña del cliente sobre el servicio. Texto demostrativo.' },
        { name: 'Nombre del Cliente', review: 'Reseña del cliente sobre el servicio. Texto demostrativo.' },
        { name: 'Nombre del Cliente', review: 'Reseña del cliente sobre el servicio. Texto demostrativo.' },
        { name: 'Nombre del Cliente', review: 'Reseña del cliente sobre el servicio. Texto demostrativo.' },
    ];

    const [propertiesChunks, setPropertiesChunks] = useState([]);
    useEffect(() => {
        if (properties) {
            const featuredProperties = properties.filter(property => property.featured);
            const chunks = [];
            for (let i = 0; i < featuredProperties.length; i += 3) {
                chunks.push(featuredProperties.slice(i, i + 3));
            }
            setPropertiesChunks(chunks);
        }
    }, [properties]);

    return (
        <div className="flex flex-col items-center">
            {/* Imagen de fondo */}
            <div className="relative w-full h-screen overflow-hidden">
                <Image
                    src='https://static.wixstatic.com/media/8d96af_23eb09f032ec4ee68e39e861a5a66412~mv2.jpg'
                    alt="Imagen de fondo"
                    className="absolute inset-0 object-cover w-full h-full"
                    width={1500}
                    height={1500}
                />
            </div>

            {/* Logo y botón principal */}
            <div className="absolute top-60 left-0 right-0 flex flex-col items-center h-screen w-full">
                <div className="w-full h-[450px] transition-transform mx-auto">
                    <Image
                        src={logo}
                        alt="Logo de la empresa"
                        width={740}
                        height={740}
                        className="w-[400px] max-sm:w-80 h-[400px] max-sm:h-80 transform bg-[#fff] mx-auto cursor-pointer"
                        onClick={() => router.push('/')}
                    />
                </div>
                <button
                    className="border-2 border-white hover:border-custom-4 text-sm text-white font-bold bg-custom-2 hover:bg-white hover:text-custom-4 h-14 w-60 mx-auto transition-all"
                    onClick={() => router.push('/home')}
                >
                    Ver propiedades
                </button>
            </div>

            {/* Logo adicional e información */}
            <div className="flex flex-row max-sm:flex-col items-center gap-4 px-10 max-sm:px-4 mt-4">
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
            <div className="mt-8 flex flex-col items-center w-full px-4 bg-custom-4">
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
