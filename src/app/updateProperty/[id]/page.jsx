"use client";

import Header from "../../components/header/page";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./id.module.css";
import Image from "next/image";

export default function UpdateProperty(id) {

    const [property, setProperty] = useState({});
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState('');

    const [form, setForm] = useState({
        name: "",
        price: "",
        currency: "",
        operationType: "",
        propertyType: "",
        location: "",
        rooms: "0",
        bathrooms: "0",
        area: "",
        measure_1: "",
        measure_2: "",
        garage: "false",
        electricity: "false",
        gas: "false",
        water: "false",
        asphalt: "false",
        sewer: "false",
        antiquity: "",
        images: [],
        mainImage: "",
        description: "",
        featured: "false"
    });

    const [errors, setErrors] = useState({
        name: "",
        price: "",
        currency: "",
        operationType: "",
        propertyType: "",
        location: "",
        rooms: "",
        bathrooms: "",
        area: "",
        measure_1: "",
        measure_2: "",
        garage: "",
        electricity: "",
        gas: "",
        water: "",
        asphalt: "",
        sewer: "",
        antiquity: "",
        images: [],
        mainImage: "",
        description: "",
    });

    const [isFormDirty, setIsFormDirty] = useState(false); // Estado para rastrear si el formulario ha cambiado

    console.log(form);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post(`/api/properties/${id.params.id}`);
                if (response.data) {
                    setProperty(response.data);
                    setFile(response.data.mainImage);

                    const [measure1, measure2] = response.data.measure.split("x");
                    const convertedMeasure1 = parseInt(measure1, 10); // Convertir a número
                    const convertedMeasure2 = parseInt(measure2, 10); // Convertir a número

                    setForm({
                        name: "",
                        price: response.data.price,
                        currency: response.data.currency,
                        operationType: response.data.operationType,
                        propertyType: response.data.propertyType,
                        location: response.data.location,
                        rooms: response.data.rooms,
                        bathrooms: response.data.bathrooms,
                        area: response.data.area,
                        measure_1: convertedMeasure1,
                        measure_2: convertedMeasure2,
                        garage: response.data.garage,
                        electricity: response.data.electricity,
                        gas: response.data.gas,
                        water: response.data.water,
                        asphalt: response.data.asphalt,
                        sewer: response.data.sewer,
                        antiquity: response.data.antiquity,
                        images: response.data.images,
                        mainImage: response.data.mainImage,
                        description: response.data.description,
                        featured: response.data.featured
                    })
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [id]);


    const changeHandler = (event) => {
        if (event.target.id === "file") {
            handleFileChange(event)
        } else {

            let property = event.target.id;
            let value = event.target.value;

            setForm({
                ...form,
                [property]: value
            })
        }
        setIsFormDirty(true)
    }

    const handleFileChange = async (event) => {
        const allowedExtensions = /(\.png|\.jpeg|\.jpg)$/i;
        const selectedFile = event.target.files[0];

        if (!selectedFile || !allowedExtensions.exec(selectedFile.name)) {
            alert("Invalid file format. Please select a .png, .jpg or .jpeg file.");
            event.target.value = "";
        } else {
            setFile(selectedFile);
            setFilename(selectedFile.name);
            const formData = new FormData();
            formData.append("image", selectedFile);

            const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                params: {
                    key: '995d83b39581a48b70462f313125e26d', // Reemplaza esto con tu clave de API de ImgBB
                },
            });

            console.log(response.data);
            if (response.data && response.data.data) {
                const photoUrl = response.data.data.url;
                setForm({
                    ...form,
                    images: [...form.images, photoUrl]
                })
                setFile(null);
                setFilename("");
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // if (!file) {
        //     alert("Please select an image to upload.");
        //     return;
        // }

        try {
            // const formData = new FormData();
            // formData.append("image", file);

            // const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
            //     headers: {
            //         "Content-Type": "multipart/form-data",
            //     },
            //     params: {
            //         key: '995d83b39581a48b70462f313125e26d', // Reemplaza esto con tu clave de API de ImgBB
            //     },
            // });

            // if (response.data && response.data.data) {
            //     const photoUrl = response.data.data.url;

            // Aquí puedes utilizar la URL de la imagen (photoUrl) para mostrarla en tu página o guardarla en tu base de datos
            const apiResponse = await axios.patch(`/api/properties/${property.id}`, {
                form,
                // photo: photoUrl
            });
            // console.log("URL de imagen subida:", photoUrl);

            // Limpia el campo de archivo después de la carga exitosa
            // setForm({})
            // setFile(null);
            // setFilename("");
            window.location.reload();
            // }
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            console.log(error.response.data.error); // Imprime el contenido del error
        }
    };

    const isFormValid = () => {
        if (
            form.name &&
            form.price &&
            form.currency &&
            form.operationType &&
            form.propertyType &&
            form.location &&
            form.rooms &&
            form.bathrooms &&
            form.area &&
            form.measure_1 &&
            form.measure_2 &&
            form.garage &&
            form.electricity &&
            form.gas &&
            form.water &&
            form.asphalt &&
            form.sewer &&
            form.antiquity &&
            form.images.length &&
            form.description &&
            form.featured
        )
            return true
    }

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

    const handleCheckboxChange = () => {
        setForm({
            ...form,
            featured: value => !value
        })
    }
    console.log(form);
    return (
        <>
            <Header />
            <h1>Actualizar {property.name}</h1>
            {property.mainImage ?
                <Image className={styles.mainImage} src={property.mainImage} alt='property image' width='200' height='200' /> : null}
            <form onSubmit={handleSubmit}>
                <div className={styles.propertyElementsList}>
                    <div>
                        <label className={styles.PropertyCustomFileLabel}>
                            Nombre
                        </label>
                        <input
                            onChange={changeHandler}
                            placeholder={property.name}
                            type="text"
                            id="name"
                        />
                        {errors.name ? <p className={styles.errorText}>{errors.name}</p> : null}
                    </div>

                    <div>

                        <label className={styles.PropertyCustomFileLabel}>
                            Precio
                        </label>
                        <input
                            onChange={changeHandler}
                            placeholder={property.price}
                            type="number"
                            id="price"
                        />
                        {errors.price ? <p className={styles.errorText}>{errors.price}</p> : null}
                    </div>

                    <div>

                        <label className={styles.PropertyCustomFileLabel}>
                            Tipo de cambio
                        </label>
                        <select onChange={changeHandler} id="currency" value={form.currency.toString()}>
                            <option value="">Selecciona una opción</option>
                            <option value="Dolares">U$D</option>
                            <option value="Pesos">$</option>
                        </select>
                        {errors.currency ? <p className={styles.errorText}>{errors.currency}</p> : null}
                    </div>

                    <div>

                        <label className={styles.PropertyCustomFileLabel}>
                            Tipo de operación
                        </label>
                        <select onChange={changeHandler} id="operationType" value={form.operationType.toString()}>
                            <option value="">Selecciona una opción</option>
                            <option value="Venta">Venta</option>
                            <option value="Alquiler">Alquiler</option>
                        </select>
                        {errors.operationType ? <p className={styles.errorText}>{errors.operationType}</p> : null}
                    </div>

                    <div>

                        <label className={styles.PropertyCustomFileLabel}>
                            Tipo de propiedad
                        </label>
                        <select onChange={changeHandler} id="propertyType" value={form.propertyType.toString()}>
                            <option value="">Selecciona una opción</option>
                            <option value="Terreno">Terreno</option>
                            <option value="Casa">Casa</option>
                            <option value="Departamento">Departamento</option>
                        </select>
                        {errors.propertyType ? <p className={styles.errorText}>{errors.propertyType}</p> : null}
                    </div>
                    <div>

                        <label className={styles.PropertyCustomFileLabel}>
                            Localidad
                        </label>
                        <input
                            onChange={changeHandler}
                            placeholder={property.location}
                            type="text"
                            id="location"
                        />
                        {errors.location ? <p className={styles.errorText}>{errors.location}</p> : null}
                    </div>

                    <div>

                        <label className={styles.PropertyCustomFileLabel}>
                            Habitaciones
                        </label>
                        <input
                            onChange={changeHandler}
                            placeholder={property.rooms}
                            type="number"
                            id="rooms"
                        />
                        {errors.location ? <p className={styles.errorText}>{errors.location}</p> : null}
                    </div>

                    <div>

                        <label className={styles.PropertyCustomFileLabel}>
                            Baños
                        </label>
                        <input
                            onChange={changeHandler}
                            placeholder={property.bathrooms}
                            type="number"
                            id="bathrooms"
                        />
                        {errors.bathrooms ? <p className={styles.errorText}>{errors.bathrooms}</p> : null}
                    </div>

                    <div>

                        <label className={styles.PropertyCustomFileLabel}>
                            Superficie
                        </label>
                        <input
                            onChange={changeHandler}
                            placeholder={property.area}
                            type="number"
                            id="area"
                        />
                        {errors.area ? <p className={styles.errorText}>{errors.area}</p> : null}
                    </div>

                    <div>

                        <label className={styles.PropertyCustomFileLabel}>
                            Medidas
                        </label>
                        <input
                            onChange={changeHandler}
                            placeholder={form.measure_1}
                            type="number"
                            id="measure_1"
                        />
                        <input
                            onChange={changeHandler}
                            placeholder={form.measure_2}
                            type="number"
                            id="measure_2"
                        />
                        {/* {errors.measure ? <p className={styles.errorText}>{errors.measure}</p> : null} */}
                    </div>

                    <div>

                        <label className={styles.PropertyCustomFileLabel}>
                            Garage
                        </label>
                        <select onChange={changeHandler} id="garage" value={form.garage.toString()}>
                            <option value="">Selecciona una opción</option>
                            <option value="true">Si</option>
                            <option value="false">No</option>
                        </select>
                        {errors.garage ? <p className={styles.errorText}>{errors.garage}</p> : null}
                    </div>

                    <div>

                        <label className={styles.PropertyCustomFileLabel}>
                            Luz
                        </label>
                        <select onChange={changeHandler} id="electricity" value={form.electricity.toString()}>
                            <option value="">Selecciona una opción</option>
                            <option value="true">Si</option>
                            <option value="false">No</option>
                        </select>
                        {errors.electricity ? <p className={styles.errorText}>{errors.electricity}</p> : null}
                    </div>

                    <div>

                        <label className={styles.PropertyCustomFileLabel}>
                            Gas
                        </label>
                        <select onChange={changeHandler} id="gas" value={form.gas.toString()}>
                            <option value="">Selecciona una opción</option>
                            <option value="true">Si</option>
                            <option value="false">No</option>
                        </select>
                        {errors.gas ? <p className={styles.errorText}>{errors.gas}</p> : null}
                    </div>

                    <div>

                        <label className={styles.PropertyCustomFileLabel}>
                            Agua
                        </label>
                        <select onChange={changeHandler} id="water" value={form.water.toString()}>
                            <option value="">Selecciona una opción</option>
                            <option value="true">Si</option>
                            <option value="false">No</option>
                        </select>
                        {errors.water ? <p className={styles.errorText}>{errors.water}</p> : null}
                    </div>

                    <div>

                        <label className={styles.PropertyCustomFileLabel}>
                            Asfalto
                        </label>
                        <select onChange={changeHandler} id="asphalt" value={form.asphalt.toString()}>
                            <option value="">Selecciona una opción</option>
                            <option value="true">Si</option>
                            <option value="false">No</option>
                        </select>
                        {errors.asphalt ? <p className={styles.errorText}>{errors.asphalt}</p> : null}
                    </div>

                    <div>

                        <label className={styles.PropertyCustomFileLabel}>
                            Cloacas
                        </label>
                        <select onChange={changeHandler} id="sewer" value={form.sewer.toString()}>
                            <option value="">Selecciona una opción</option>
                            <option value="true">Si</option>
                            <option value="false">No</option>
                        </select>
                        {errors.sewer ? <p className={styles.errorText}>{errors.sewer}</p> : null}
                    </div>

                    <div>

                        <label className={styles.PropertyCustomFileLabel}>
                            Antigüedad
                        </label>
                        <input
                            onChange={changeHandler}
                            placeholder={property.antiquity}
                            type="number"
                            id="antiquity"
                        />
                        {errors.antiquity ? <p className={styles.errorText}>{errors.antiquity}</p> : null}
                    </div>

                    <div>

                        <label className={styles.PropertyCustomFileLabel}>
                            Descripción
                        </label>
                        <input
                            onChange={changeHandler}
                            placeholder={property.description}
                            type="text"
                            id="description"
                        />
                        {errors.description ? <p className={styles.errorText}>{errors.description}</p> : null}
                    </div>

                    <div>

                        <label className={styles.PropertyCustomFileLabel}>
                            Destacar
                        </label>
                        <select onChange={changeHandler} id="featured" value={form.featured.toString()}>
                            <option value="">Selecciona una opción</option>
                            <option value="true">Si</option>
                            <option value="false">No</option>
                        </select>
                        {errors.featured ? <p className={styles.errorText}>{errors.featured}</p> : null}
                    </div>

                    <div>

                        <label htmlFor="file" className={styles.PropertyCustomFileLabel}>
                            Cargar imagen
                        </label>
                        <input
                            onChange={changeHandler}
                            type="file"
                            id="file"
                            accept="image/png, image/jpeg, image/jpg"
                            className={styles.customFileInput}
                        />

                        <div className={styles.imageContainer}>
                            <p>Toca una imagen para seleccionarla como imagen principal o para eliminarla</p>
                            {form.images ? form.images.map((image) => (
                                <Image src={image} key={image} alt={image} width="100" height="100" onClick={() => setMainImage(image)} />
                            )) : null}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={styles.propertyButton}
                        disabled={!isFormDirty}
                    >Actualizar Propiedad</button>
                </div>
            </form>
        </>
    )
}