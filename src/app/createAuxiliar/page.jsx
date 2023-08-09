"use client";

import Header from "../components/header/page";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./createAuxiliar.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Auxiliar() {

    const router = useRouter();

    const [auxiliar, setAuxiliar] = useState({});
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState('');

    const [form, setForm] = useState({
        name: "",
        position: "",
        phone: "",
        photo: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        position: "",
        phone: "",
        photo: ""
    });

    const [isFormDirty, setIsFormDirty] = useState(false); // Estado para rastrear si el formulario ha cambiado

    useEffect(() => {
        setIsFormDirty(false); // Inicializar el estado como falso al cargar la página
    }, []); // El efecto solo se ejecuta una vez al montar el componente

    // const phoneRegex = "^[0-9]+$";
    // if (form.phone.match(phoneRegex)) {
    //     setErrors({
    //         ...errors,
    //         phone: "Ingrese solo números" 
    //     })
    // }
console.log(errors);
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


    const handleFileChange = (event) => {
        const allowedExtensions = /(\.png|\.jpeg|\.jpg)$/i;
        const selectedFile = event.target.files[0];

        if (!selectedFile || !allowedExtensions.exec(selectedFile.name)) {
            alert("Invalid file format. Please select a .png, .jpg or .jpeg file.");
            event.target.value = "";
        } else {
            setForm({
                ...form,
                photo: "FOTO CARGADA"
            })
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
                const photoUrl = response.data.data.url;

                // Aquí puedes utilizar la URL de la imagen (photoUrl) para mostrarla en tu página o guardarla en tu base de datos
                const apiResponse = await axios.post(`/api/auxiliar`, {
                    form,
                    photo: photoUrl
                });
                // console.log("URL de imagen subida:", photoUrl);

                // Limpia el campo de archivo después de la carga exitosa
                setForm({})
                setFile(null);
                setFilename("");
                router.push(`/auxiliar`)
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
        const formValues = Object.values(form);
        return formValues.every(value => value.trim() !== '') && Object.values(errors).every(error => error === '');
    };
console.log(form);
    return (
        <>
            <Header />
            <h1>Cargar nuevo Auxiliar</h1>
            {/* {form.photo ?
                <Image className={styles.mainImage} src={form.photo} alt='auxiliar image' width='200' height='200' /> : null} */}
            <form onSubmit={handleSubmit}>
                <div className={styles.auxiliarElementsList}>
                    <label className={styles.auxiliarCustomFileLabel}>
                        Nombre
                    </label>
                    <input
                        onChange={changeHandler}
                        placeholder="Nombre"
                        type="text"
                        id="name"
                    />
                    <p className={styles.errorText}>{errors.name}</p>
                    <label className={styles.auxiliarCustomFileLabel}>
                        Puesto
                    </label>
                    <input
                        onChange={changeHandler}
                        placeholder="Posición"
                        type="text"
                        id="position"
                    />
                    <p className={styles.errorText}>{errors.position}</p>
                    <label className={styles.auxiliarCustomFileLabel}>
                        Teléfono
                    </label>
                    <input
                        onChange={changeHandler}
                        placeholder="Teléfono"
                        type="text"
                        id="phone"
                    />
                    
                    {errors.phone ? <p className={styles.errorText}>{errors.phone}</p> : null}
                    <label htmlFor="file" className={styles.auxiliarCustomFileLabel}>
                        Seleccionar imagen
                    </label>
                    <input
                        onChange={changeHandler}
                        type="file"
                        id="file"
                        accept="image/png, image/jpeg, image/jpg"
                        className={styles.customFileInput}
                    />
                    <label>{filename}</label>
                    <button
                        type="submit"
                        className={styles.auxiliarButton}
                        disabled={!isFormValid()}
                    >Cargar nuevo Auxiliar</button>
                </div>
            </form>
        </>
    );
}
