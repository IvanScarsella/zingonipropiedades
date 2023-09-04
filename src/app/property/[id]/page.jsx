"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/header/page";
import Image from "next/image";
import styles from "./id.module.css";
import WhatsApp from "../../components/whatsapp/page";
import Footer from "../../components/footer/page";
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

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`/api/properties/${id.params.id}`);
                if (response.data) {
                    setProperty(response.data);
                    setImage(response.data.mainImage)
                }
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
                <h2>{property.operationType}</h2>
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
                    <h3 class="feature-title feature-1"><Image src={location_logo} alt='property image' width='20' height='20'/>   Ubicación: {property.location}</h3>
                    {property.rooms > 0 ?
                        <h3 class="feature-title feature-2"><Image src={rooms_logo} alt='property image' width='20' height='20'/>   Ambientes: {property.rooms}</h3>
                        : null}
                    {property.bathrooms > 0 ?
                        <h3><Image src={bathrooms_logo} alt='property image' width='20' height='20'/>   Baños: {property.bathrooms}</h3>
                        : null}
                    <h3><Image src={area_logo} alt='property image' width='20' height='20'/>   Superficie: {property.area} m²</h3>
                    {property.measure ?
                        <h3><Image src={measure_logo} alt='property image' width='20' height='20'/>   Medidas: {property.measure}</h3>
                        : null}
                    {property.garage ?
                        <h3><Image src={garage_logo} alt='property image' width='20' height='20'/>   Garage: Si</h3>
                        : <h3><Image src={garage_logo} alt='property image' width='20' height='20'/>   Garage: No</h3>}
                    {property.electricity ?
                        <h3><Image src={electricity_logo} alt='property image' width='20' height='20'/>   Luz: Si</h3>
                        : <h3><Image src={electricity_logo} alt='property image' width='20' height='20'/>   Luz: No</h3>}
                    {property.gas ?
                        <h3><Image src={gas_logo} alt='property image' width='20' height='20'/>   Gas: Si</h3>
                        : <h3><Image src={gas_logo} alt='property image' width='20' height='20'/>   Gas: No</h3>}
                    {property.water ?
                        <h3><Image src={water_logo} alt='property image' width='20' height='20'/>   Agua: Si</h3>
                        : <h3><Image src={water_logo} alt='property image' width='20' height='20'/>   Agua: No</h3>}
                    {property.asphalt ?
                        <h3><Image src={asphalt_logo} alt='property image' width='20' height='20'/>   Asfalto: Si</h3>
                        : <h3><Image src={asphalt_logo} alt='property image' width='20' height='20'/>   Asfalto: No</h3>}
                    {property.sewer ?
                        <h3><Image src={sewer_logo} alt='property image' width='20' height='20'/>   Cloacas: Si</h3>
                        : <h3><Image src={sewer_logo} alt='property image' width='20' height='20'/>   Cloacas: No</h3>}
                    {property.antiquity > 0 ?
                        <h3><Image src={antiquity_logo} alt='property image' width='20' height='20'/>   Antigüedad: {property.antiquity} años</h3>
                        : null}
                </div>
                

                <MailForm id={id}/>
            </div>
            <Footer />
            <WhatsApp />
        </>
    );
}

export default PropertyByID;
