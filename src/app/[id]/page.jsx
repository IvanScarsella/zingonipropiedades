"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function PropertyByID(id) {
    const router = useRouter();

    const [property, setProperty] = useState({});
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState('');

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

        const uploadImage = await axios.post('/api/uploadImage', {
            'file': file,
            'id': property.id
        });

        // try {
        //     const formData = new FormData();
        //     formData.append("file", file);
        //     formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);
        //     try {
        //         console.log(formData);
        //         const uploadResponse = await fetch(
        //             `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`,
        //             {
        //                 method: "POST",
        //                 body: formData,
        //             }
        //         );
        //         console.log(uploadResponse);
        //     } catch (error) {
        //         console.log(error);
        //     }
        //     if (uploadResponse.ok) {
        //         const jsonResponse = await uploadResponse.json();
        //         console.log("Archivo subido con éxito:", jsonResponse.url);

        //         const propertyImage = jsonResponse.url;

        //         // Una vez que el archivo se carga en Cloudinary, actualiza la propiedad con la nueva URL de imagen
        //         const apiResponse = await fetch(`/api/properties/${property.id}`, {
        //             method: "PATCH",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //             body: JSON.stringify({
        //                 propertyImage,
        //             }),
        //         });

        //         if (apiResponse.ok) {
        //             const jsonResponse = await apiResponse.json();
        //             console.log("Imagen de propiedad actualizada exitosamente:", jsonResponse);

        //             // Limpia el campo de archivo después de la actualización exitosa
        //             setFile(null);
        //             setFilename('');
        //         } else {
        //             console.error(
        //                 "Error al actualizar la imagen de la propiedad:",
        //                 apiResponse.status,
        //                 apiResponse.statusText
        //             );
        //         }
        //     } else {
        //         console.error(
        //             "Error al subir el archivo:",
        //             uploadResponse.status,
        //             uploadResponse.statusText
        //         );
        //     }
        // } catch (error) {
        //     console.error(error);
        // }
    };

    return (
        <>
            <div>
                <h1>{property.name}</h1>
                <h2>{property.price}</h2>
                <h2>{property.operationType}</h2>
                <h2>{property.propertyType}</h2>
                <h2>{property.location}</h2>
                <h2>{property.rooms}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            onChange={handleFileChange}
                            type="file"
                            id="file"
                            accept="image/png, image/jpeg, image/jpg"
                        />
                        <label>{filename}</label>
                    </div>
                    <button type="submit">Upload</button>
                </form>
            </div>
            <button onClick={() => router.push('/home')}>Volver al inicio</button>
        </>
    );
}

// export async function getServerSideProps(context) {
//   const { id } = context.query;
//   console.log(context);
//   return {
//     props: { id },
//   };
// }

export default PropertyByID;
