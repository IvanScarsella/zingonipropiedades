"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../components/header/page";
import NavBar from "../components/navbar/page";
import Image from "next/image";
import styles from "./id.module.css";
import WhatsApp from "../components/whatsapp/page";

function PropertyByID(id) {
    const router = useRouter();

    const [property, setProperty] = useState({});
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState('');
    console.log(property);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post(`/api/properties/${id.params.id}`);
                if (response.data) {
                    setProperty(response.data);
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

    const setMainImage = async (image) => {
        const confirmAction = window.confirm('¿Desea cambiar la imagen principal por la seleccionada?');
        if (confirmAction) {
            const updateMainImage = await axios.post('/api/updateMainImage', {
                id: property.id,
                image: image
            });
            if (updateMainImage) {
                alert(`${image} configurada como imagen principal`);
                window.location.reload();
            }
        } else {
            const confirmDeleteAction = window.confirm('¿Desea eliminar esta imagen?');
            if (confirmDeleteAction) {
                const deleteImage = await axios.post('/api/deleteImage', {
                    id: property.id,
                    image: image
                });
                if (deleteImage) {
                    alert('Imagen eliminada con éxito');
                    window.location.reload();
                }
            }
        }
    }

    return (
        <>
            <Header />
            <NavBar />
            <div className={styles.propertyData}>
                {property && property.mainImage ?
                    <Image className= {styles.mainImage} src={property.mainImage} alt='property image' width='200' height='200' /> : null}
                <h1>{property.name}</h1>
                {property.images ?
                    property.images.map((image) => {
                        return <Image src={image} key={image} alt='property image' width='100' height='100' onClick={() => setMainImage(image)} />
                    }) : null}
                {property.currency === 'Pesos' ? <h2 className={styles.price}> Valor: $ {property.price}</h2> : <h2 className={styles.price}> Valor: U$D {property.price}</h2>}
                <h2>{property.operationType}</h2>
                <h2>{property.propertyType}</h2>
                <h2>{property.location}</h2>
                {property.rooms > 0 ?
                    <h2>Ambientes: {property.rooms}</h2>
                    : null}
                {property.bathrooms > 0 ?
                    <h2>Baños: {property.rooms}</h2>
                    : null}
                <h2>Superficie: {property.area} m²</h2>
                <h2>Medidas: property.measure</h2>
                {property.garage ?
                    <h2>Garage: Si</h2>
                    : <h2>Garage: No</h2>}
                {property.electricity ?
                    <h2>Luz: Si</h2>
                    : <h2>Luz: No</h2>}
                {property.gas ?
                    <h2>Gas: Si</h2>
                    : <h2>Gas: No</h2>}
                {property.water ?
                    <h2>Agua: Si</h2>
                    : <h2>Agua: No</h2>}
                {property.asphalt ?
                    <h2>Asfalto: Si</h2>
                    : <h2>Asfalto: No</h2>}
                {property.sewer ?
                    <h2>Cloacas: Si</h2>
                    : <h2>Cloacas: No</h2>}
                {property.antiquity > 0 ?
                    <h2>Antigüedad: {property.antiquity} años</h2>
                    : null}
                <form onSubmit={handleSubmit}>
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
                </form>
            </div>
            {/* <button onClick={() => router.push('/home')}>Volver al inicio</button> */}
       <WhatsApp />
        </>
    );
}

export default PropertyByID;
