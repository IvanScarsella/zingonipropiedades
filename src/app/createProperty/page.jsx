"use client";

import Header from "../components/header/page";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./createProperty.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CreateProperty() {

    const router = useRouter();

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

    useEffect(() => {
        setIsFormDirty(false); // Inicializar el estado como falso al cargar la página
    }, []); // El efecto solo se ejecuta una vez al montar el componente

    const changeHandler = (event) => {
        if (event.target.id === "file") {
            handleFileChange(event);
        } else {
            let property = event.target.id;
            let value = event.target.value;

            // Agregar validación para el campo "phone"
            if (property === "phone") {
                if (!/^\d*$/.test(value)) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        [property]: "Por favor, ingrese solo números.",
                    }));
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        [property]: "", // Limpiar el error si el valor es válido
                    }));
                }
            } else {
                // Validación general para campos requeridos
                if (value.trim() === "") {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        [property]: "Este campo es requerido",
                    }));
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        [property]: "",
                    }));
                }
            }

            setForm({
                ...form,
                [property]: value
            });
        }
        setIsFormDirty(true);
    };


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

        try {
            const apiResponse = await axios.post(`/api/properties`, {
                form,
            });
            if (apiResponse) {

                // setForm({})
                // setFile(null);
                // setFilename("");
                router.push(`/home`)
            }
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            console.log(error.response.data.error); // Imprime el contenido del error
        }
    };

    const validateField = (property, value) => {
        if (value.trim() === "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [property]: "Este campo es requerido"
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [property]: ""
            }));
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
            form.description
        )
            return true
    }

    return (
        <>
            <Header />
            <h1>Cargar nueva Propiedad</h1>
            <form onSubmit={handleSubmit} >
                <div className={styles.propertyElementsList}>

                    <div>
                        <label className={styles.PropertyCustomFileLabel}>
                            Nombre
                        </label>
                        <input
                            onChange={changeHandler}
                            placeholder="Nombre"
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
                            placeholder="Precio"
                            type="number"
                            id="price"
                            min="0"
                            onWheel={(e) => e.preventDefault()}
                        />
                        {errors.price ? <p className={styles.errorText}>{errors.price}</p> : null}
                    </div>

                    <div>

                        <label className={styles.PropertyCustomFileLabel}>
                            Tipo de cambio
                        </label>
                        <select onChange={changeHandler} id="currency">
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
                        <select onChange={changeHandler} id="operationType">
                            <option value="">Selecciona una opción</option>
                            <option value="Alquiler">Alquiler</option>
                            <option value="Alquiler_Temporario">Alquiler Temporario</option>
                            <option value="Venta">Venta</option>
                        </select>
                        {errors.operationType ? <p className={styles.errorText}>{errors.operationType}</p> : null}
                    </div>

                    <div>

                        <label className={styles.PropertyCustomFileLabel}>
                            Tipo de propiedad
                        </label>
                        <select onChange={changeHandler} id="propertyType">
                            <option value="">Selecciona una opción</option>
                            <option value="Casa">Casa</option>
                            <option value="Casa_Quinta">Casa Quinta</option>
                            <option value="Departamento">Departamento</option>
                            <option value="Duplex">Duplex</option>
                            <option value="Lote">Lote</option>
                            <option value="Terreno">Terreno</option>
                        </select>
                        {errors.propertyType ? <p className={styles.errorText}>{errors.propertyType}</p> : null}
                    </div>

                    <div>

                        <label className={styles.PropertyCustomFileLabel}>
                            Localidad
                        </label>
                        <input
                            onChange={changeHandler}
                            placeholder="Localidad"
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
                            placeholder="Habitaciones"
                            type="number"
                            id="rooms"
                            min="0"
                        />
                        {errors.location ? <p className={styles.errorText}>{errors.location}</p> : null}
                    </div>

                    <div>

                        <label className={styles.PropertyCustomFileLabel}>
                            Baños
                        </label>
                        <input
                            onChange={changeHandler}
                            placeholder="Baños"
                            type="number"
                            id="bathrooms"
                            min="0"
                        />
                        {errors.bathrooms ? <p className={styles.errorText}>{errors.bathrooms}</p> : null}
                    </div>

                    <div>

                        <label className={styles.PropertyCustomFileLabel}>
                            Superficie
                        </label>
                        <input
                            onChange={changeHandler}
                            placeholder="Superficie"
                            type="number"
                            id="area"
                            min="0"
                        />
                        {errors.area ? <p className={styles.errorText}>{errors.area}</p> : null}
                    </div>

                    <div>

                        <label className={styles.PropertyCustomFileLabel}>
                            Medidas
                        </label>
                        <input
                            onChange={changeHandler}
                            placeholder="primer valor"
                            type="number"
                            id="measure_1"
                            min="0"
                        />
                        <input
                            onChange={changeHandler}
                            placeholder="segundo valor"
                            type="number"
                            id="measure_2"
                            min="0"
                        />
                        {errors.measure ? <p className={styles.errorText}>{errors.measure}</p> : null}
                    </div>

                    <div>

                        <label className={styles.PropertyCustomFileLabel}>
                            Garage
                        </label>
                        <select onChange={changeHandler} id="garage">
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
                        <select onChange={changeHandler} id="electricity">
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
                        <select onChange={changeHandler} id="gas">
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
                        <select onChange={changeHandler} id="water">
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
                        <select onChange={changeHandler} id="asphalt">
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
                        <select onChange={changeHandler} id="sewer">
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
                            placeholder="Antigüedad"
                            type="number"
                            id="antiquity"
                            min="0"
                        />
                        {errors.antiquity ? <p className={styles.errorText}>{errors.antiquity}</p> : null}
                    </div>

                    <div>

                        <label className={styles.PropertyCustomFileLabel}>
                            Descripción
                        </label>
                        <input
                            onChange={changeHandler}
                            placeholder="Descripción"
                            type="text"
                            id="description"
                        />
                        {errors.description ? <p className={styles.errorText}>{errors.description}</p> : null}
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
                    </div>

                    <div>

                        <div className={styles.imageContainer}>
                            {form.images ? form.images.map((image) => (
                                <Image src={image} key={image} alt={image} width="100" height="100" />
                            )) : null}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={styles.PropertyButton}
                        disabled={!isFormValid()}
                    >Cargar nueva Propiedad</button>
                </div>
            </form>
        </>
    );
}
