"use client";

import Header from "../../components/header/page";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./id.module.css";
import Image from "next/image";

export default function Auxiliar(id) {

    const [auxiliar, setAuxiliar] = useState({});
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState('');

    const [form, setForm] = useState({
        name: "",
        position: "",
        phone: "",
        photo: ""
    })

    const [errors, setErrors] = useState({
        name: "",
        position: "",
        phone: "",
        photo: ""
    })

    const [isFormDirty, setIsFormDirty] = useState(false); // Estado para rastrear si el formulario ha cambiado

    console.log(form);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post(`/api/auxiliar/${id.params.id}`);
                if (response.data) {
                    setAuxiliar(response.data);
                    setFile(response.data.photo);
                    setForm({
                        name: response.data.name,
                        position: response.data.position,
                        phone: response.data.phone,
                        photo: response.data.photo,
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
                const photoUrl = response.data.data.url;

                // Aquí puedes utilizar la URL de la imagen (photoUrl) para mostrarla en tu página o guardarla en tu base de datos
                const apiResponse = await axios.patch(`/api/auxiliar/${auxiliar.id}`, {
                    form,
                    photo: photoUrl
                });
                // console.log("URL de imagen subida:", photoUrl);

                // Limpia el campo de archivo después de la carga exitosa
                setForm({})
                setFile(null);
                setFilename("");
                window.location.reload();
            }
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            console.log(error.response.data.error); // Imprime el contenido del error
        }
    };

    const isFormValid = () => {
        const formValues = Object.values(form);
        return formValues.some(value => value.trim() !== ''); // Verifica si al menos un campo no está vacío
    };

    return (
        <>
            <Header />
            <h1>Actualizar {auxiliar.name}</h1>
            {auxiliar.photo ?
                <Image className={styles.mainImage} src={auxiliar.photo} alt='auxiliar image' width='200' height='200' /> : null}
            <form onSubmit={handleSubmit}>
                <div className={styles.auxiliarElementsList}>
                    <label className={styles.auxiliarCustomFileLabel}>
                        Nombre
                    </label>
                    <input
                        onChange={changeHandler}
                        placeholder={auxiliar.name}
                        type="text"
                        id="name"
                    />
                    <label className={styles.auxiliarCustomFileLabel}>
                        Puesto
                    </label>
                    <input
                        onChange={changeHandler}
                        placeholder={auxiliar.position}
                        type="text"
                        id="position"
                    />
                    <label className={styles.auxiliarCustomFileLabel}>
                        Teléfono
                    </label>
                    <input
                        onChange={changeHandler}
                        placeholder={auxiliar.phone}
                        type="text"
                        id="phone"
                    />
                    <label htmlFor="file" className={styles.auxiliarCustomFileLabel}>
                        Seleccionar imagen
                    </label>
                    <input
                        onChange={changeHandler}
                        // onChange={handleFileChange}
                        type="file"
                        id="file"
                        accept="image/png, image/jpeg, image/jpg"
                        className={styles.customFileInput}
                    />
                    <label>{filename}</label>
                    <button
                        type="submit"
                        className={styles.auxiliarButton}
                        disabled={!isFormDirty}
                    >Actualizar Auxiliar</button>
                </div>
            </form>
        </>
    )
}