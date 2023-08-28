"use client"

import { useState } from "react";
import axios from "axios";
import styles from "./mailForm.module.css";

export default function MailForm(id) {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        reason: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/sendEmail', {
                formData,
                id: id
            });
            if (response.data) {
                alert('Mail enviado correctamente')
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }

        console.log('Formulario enviado:', formData);
    };

    const isFormValid = () => {
        if (
            formData.name &&
            formData.email &&
            formData.phone &&
            formData.reason
        )
            return true
    }

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div>
                <label htmlFor="name" className={styles.label}>Nombre:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div>
                <label htmlFor="email" className={styles.label}>Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div>
                <label htmlFor="phone" className={styles.label}>Teléfono:</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div>
                <label htmlFor="reason" className={styles.label}>Motivo de la consulta:</label>
                <textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    className={styles.textarea}
                />
            </div>
            <button
                type="submit"
                className={`${styles.button} ${!isFormValid() && styles.disabledButton}`}
                disabled={!isFormValid()}
            >Enviar</button>
        </form>
    );
}