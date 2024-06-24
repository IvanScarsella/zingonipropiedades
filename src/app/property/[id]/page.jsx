"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/header/page";
import Image from "next/image";
import styles from "./id.module.css";
import WhatsApp from "../../components/whatsapp/page";
import Footer from "../../components/footer/page";
import GoogleMap from "../../components/maps/page";

import rooms_logo from "../../../../public/rooms_logo.png";
import bathrooms_logo from "../../../../public/bathrooms_logo.png";
import area_logo from "../../../../public/area_logo.png";
import measure_logo from "../../../../public/measure_logo.png";
import garage_logo from "../../../../public/garage_logo.png";
import electricity_logo from "../../../../public/electricity_logo.png";
import gas_logo from "../../../../public/gas_logo.png";
import water_logo from "../../../../public/water_logo.png";
import asphalt_logo from "../../../../public/asphalt_logo.png";
import sewer_logo from "../../../../public/sewer_logo.png";
import antiquity_logo from "../../../../public/antiquity_logo.png";
import location_logo from "../../../../public/location_logo.png";
import MailForm from "../../components/mailForm/page";

function PropertyByID(id) {

    const [property, setProperty] = useState({});

    const [image, setImage] = useState("");

    // const googleMapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.GOOGLEMAPS_KEY}`

    useEffect(() => {
        async function fetchData() {
            try {
                // const response = await axios.get(`/api/properties/${id.params.id}`);
                // if (response.data) {
                // setProperty(response.data);
                // setImage(response.data.mainImage)
                // }
                // DESCOMENTAR LINEAS DE ARRIBA Y BORRAR SETPROPIERTY Y SETIMAGE DE ABAJO
                setProperty({
                    id: '2e9b452a-9c88-432e-8a58-9b7a1c9a5f3b',
                    name: 'casa calle 50 y 120',
                    price: 45000,
                    operationType: 'Alquiler',
                    propertyType: 'Departamento',
                    location: 'berisso',
                    rooms: 4,
                    bathrooms: 3,
                    area: 200,
                    garage: true,
                    electricity: true,
                    gas: true,
                    water: true,
                    asphalt: false,
                    sewer: true,
                    antiquity: 5,
                    images: [
                        'https://i.ibb.co/wMTq3nD/Whats-App-Image-2023-08-20-at-01-40-53.jpg',
                        'https://i.ibb.co/T107C20/Whats-App-Image-2023-08-20-at-01-40-52-2.jpg',
                        'https://i.ibb.co/3hMRXZv/Whats-App-Image-2023-08-20-at-01-40-48-1.jpg',
                        'https://i.ibb.co/dptB4KN/Whats-App-Image-2023-08-20-at-01-40-50.jpg',
                        'https://i.ibb.co/wzz06S8/Whats-App-Image-2023-08-20-at-01-40-52-1.jpg',
                        'https://i.ibb.co/jZSnPxN/Whats-App-Image-2023-08-20-at-01-40-51-1.jpg',
                        'https://i.ibb.co/kDny0dm/Whats-App-Image-2023-08-20-at-01-40-51.jpg',
                        'https://i.ibb.co/6R3xq9y/Whats-App-Image-2023-08-20-at-01-40-50-2.jpg',
                        'https://i.ibb.co/hZzVrSX/Whats-App-Image-2023-08-20-at-01-40-45.jpg',
                        'https://i.ibb.co/sKfNRNX/Whats-App-Image-2023-08-20-at-01-40-48.jpg',
                        'https://i.ibb.co/4RVGk5j/Whats-App-Image-2023-08-20-at-01-40-50-1.jpg',
                        'https://i.ibb.co/kDny0dm/Whats-App-Image-2023-08-20-at-01-40-51.jpg',
                        'https://i.ibb.co/j5sqtB9/tarjeta-01-1.jpg',
                    ],
                    mainImage:
                        'https://i.ibb.co/wMTq3nD/Whats-App-Image-2023-08-20-at-01-40-53.jpg',
                    currency: 'Pesos',
                    description: 'Departamento céntrico con balcón y vista panorámica.',
                    measure: '15x30',
                    featured: false,
                    lat: -34.924852,
                    lng: -57.956789,
                });
                setImage(property.mainImage)
                console.log(property)
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [id]);

    return (
        <>
            <Header />
            <div className={styles.propertyData}>
                {property && property.mainImage ?
                    <Image className={styles.mainImage} src={image} alt='property image' width='200' height='200' /> : null}
                <h1>{property.name}</h1>
                {property.currency === 'Pesos' ? <h2 className={styles.price}> Valor: $ {property.price}</h2> : <h2 className={styles.price}> Valor: U$D {property.price}</h2>}
                <h2>{property.operationType?.replace(/_/g, ' ')}</h2>
                <div className={styles.propertyImages}>
                    {property.images ?
                        property.images.map((image) => {
                            return (
                                <Image src={image} key={image} alt='property image' width='100' height='100' onClick={() => setImage(image)} className={styles.image} />
                            )
                        })
                        : null}
                </div>
                {property.description ?
                    <h4 className={styles.propertyDescription}>{property.description}</h4>
                    : <h4 className={styles.propertyDescription}>Descripción de la propiedad...</h4>}
                <h2>Caracterícticas:</h2>
                <div className={styles.propertyDetails}>
                    <h3 class="feature-title feature-1"><Image src={location_logo} alt='property image' width='20' height='20' />   Ubicación: {property.location}</h3>
                    {property.rooms > 0 ?
                        <h3 class="feature-title feature-2"><Image src={rooms_logo} alt='property image' width='20' height='20' />   Ambientes: {property.rooms}</h3>
                        : null}
                    {property.bathrooms > 0 ?
                        <h3><Image src={bathrooms_logo} alt='property image' width='20' height='20' />   Baños: {property.bathrooms}</h3>
                        : null}
                    <h3><Image src={area_logo} alt='property image' width='20' height='20' />   Superficie: {property.area} m²</h3>
                    {property.measure ?
                        <h3><Image src={measure_logo} alt='property image' width='20' height='20' />   Medidas: {property.measure}</h3>
                        : null}
                    {property.garage ?
                        <h3><Image src={garage_logo} alt='property image' width='20' height='20' />   Garage: Si</h3>
                        : <h3><Image src={garage_logo} alt='property image' width='20' height='20' />   Garage: No</h3>}
                    {property.electricity ?
                        <h3><Image src={electricity_logo} alt='property image' width='20' height='20' />   Luz: Si</h3>
                        : <h3><Image src={electricity_logo} alt='property image' width='20' height='20' />   Luz: No</h3>}
                    {property.gas ?
                        <h3><Image src={gas_logo} alt='property image' width='20' height='20' />   Gas: Si</h3>
                        : <h3><Image src={gas_logo} alt='property image' width='20' height='20' />   Gas: No</h3>}
                    {property.water ?
                        <h3><Image src={water_logo} alt='property image' width='20' height='20' />   Agua: Si</h3>
                        : <h3><Image src={water_logo} alt='property image' width='20' height='20' />   Agua: No</h3>}
                    {property.asphalt ?
                        <h3><Image src={asphalt_logo} alt='property image' width='20' height='20' />   Asfalto: Si</h3>
                        : <h3><Image src={asphalt_logo} alt='property image' width='20' height='20' />   Asfalto: No</h3>}
                    {property.sewer ?
                        <h3><Image src={sewer_logo} alt='property image' width='20' height='20' />   Cloacas: Si</h3>
                        : <h3><Image src={sewer_logo} alt='property image' width='20' height='20' />   Cloacas: No</h3>}
                    {property.antiquity > 0 ?
                        <h3><Image src={antiquity_logo} alt='property image' width='20' height='20' />   Antigüedad: {property.antiquity} años</h3>
                        : null}
                </div>
                {property.name ?
                    <GoogleMap
                        propertyName={property.name}
                        lat={property.lat}
                        lng={property.lng}
                    //  googleMapURL={googleMapURL}
                    //  loadingElement={<p>Cargando...</p>}
                    /> : null}
                <MailForm id={id} />
            </div>
            <Footer />
            <WhatsApp />
        </>
    );
}

export default PropertyByID;
