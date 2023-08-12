"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../components/header/page";
import Image from "next/image";
import styles from "./id.module.css";
import WhatsApp from "../components/whatsapp/page";
import Footer from "../components/footer/page";
import Background from "../components/background/page";
import rooms_logo from "../../../public/rooms_logo.png";
import bathrooms_logo from "../../../public/bathrooms_logo.png";
import area_logo from "../../../public/area_logo.png";
import measure_logo from "../../../public/measure_logo.png";
import garage_logo from "../../../public/garage_logo.png";
import electricity_logo from "../../../public/electricity_logo.png";
import gas_logo from "../../../public/gas_logo.png";
import water_logo from "../../../public/water_logo.png";
import asphalt_logo from "../../../public/asphalt_logo.png";
import sewer_logo from "../../../public/sewer_logo.png";
import antiquity_logo from "../../../public/antiquity_logo.png";
import location_logo from "../../../public/location_logo.png";

function PropertyByID(id) {
    const router = useRouter();
    console.log(id);
    const [property, setProperty] = useState({});
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState('');

    const [image, setImage] = useState("");

    console.log(property);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post(`/api/properties/${id.params.id}`);
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

    const handleFileChange = (event) => {
        const allowedExtensions = /(\.png|\.jpeg|\.jpg)$/i;
        const selectedFile = event.target.files[0];

        if (!selectedFile || !allowedExtensions.exec(selectedFile.name)) {
            alert("Invalid file format. Please select a .png, .jpg or .jpeg file.");
            event.target.value = "";
        } else {
            setFile(selectedFile);
            setFilename(selectedFile.name);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            alert("Please select an image to upload.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("image", file);

            const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                params: {
                    key: '995d83b39581a48b70462f313125e26d', // Reemplaza esto con tu clave de API de ImgBB
                },
            });

            if (response.data && response.data.data) {
                const imageUrl = response.data.data.url;

                const data = {
                    imageUrl: imageUrl,
                    id: property.id
                }
                // Aquí puedes utilizar la URL de la imagen (imageUrl) para mostrarla en tu página o guardarla en tu base de datos
                const apiResponse = await axios.patch(`/api/properties/${property.id}`, {
                    data
                });
                console.log("URL de imagen subida:", imageUrl);

                // Limpia el campo de archivo después de la carga exitosa
                setFile(null);
                setFilename("");
                window.location.reload();
            }
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            console.log(error.response.data.error); // Imprime el contenido del error
        }
    };

    // const setMainImage = async (image) => {
    //     const confirmAction = window.confirm('¿Desea cambiar la imagen principal por la seleccionada?');
    //     if (confirmAction) {
    //         const updateMainImage = await axios.post('/api/updateMainImage', {
    //             id: property.id,
    //             image: image
    //         });
    //         if (updateMainImage) {
    //             alert(`${image} configurada como imagen principal`);
    //             window.location.reload();
    //         }
    //     } else {
    //         const confirmDeleteAction = window.confirm('¿Desea eliminar esta imagen?');
    //         if (confirmDeleteAction) {
    //             const deleteImage = await axios.post('/api/deleteImage', {
    //                 id: property.id,
    //                 image: image
    //             });
    //             if (deleteImage) {
    //                 alert('Imagen eliminada con éxito');
    //                 window.location.reload();
    //             }
    //         }
    //     }
    // }

    return (
        <>
            <Header />
            <div className={styles.propertyData}>
                {property && property.mainImage ?
                    <Image className={styles.mainImage} src={image} alt='property image' width='200' height='200' /> : null}
                <h1>{property.name}</h1>
                {property.currency === 'Pesos' ? <h2 className={styles.price}> Valor: $ {property.price}</h2> : <h2 className={styles.price}> Valor: U$D {property.price}</h2>}
                <h2>Tipo de operación: {property.operationType}</h2>
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
                        <h4>{property.description}</h4>
                        : <h4>Descripción de la propiedad...</h4>}
                {/* <h2>{property.propertyType}</h2> */}
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
                <h2>(Acá iría la sección de enviar mail)</h2>
                {/* <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="file" className={styles.customFileLabel}>
                            Seleccionar imagen
                        </label>
                        <input
                            onChange={handleFileChange}
                            type="file"
                            id="file"
                            accept="image/png, image/jpeg, image/jpg"
                            className={styles.customFileInput}
                        />
                        <label>{filename}</label>
                    </div>
                    <button type="submit">Subir imagen</button>
                </form> */}
                <button onClick={() => router.push(`/updateProperty/${id.params.id}`)}>
                    Actualizar
                </button>
            </div>
            {/* <button onClick={() => router.push('/home')}>Volver al inicio</button> */}
            <Footer />
            <Background />
            <WhatsApp />
        </>
    );
}

export default PropertyByID;
