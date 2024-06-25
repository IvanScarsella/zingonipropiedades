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
        <form onSubmit={handleSubmit}
            className="flex flex-col gap-5"
        // className={styles.formContainer}
        >
            <div>
                <label htmlFor="name"
                    className='text-sm font-bold bg-[#b085bd49]'
                // className={styles.label}
                >Nombre:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="p-2 border border-[#ccc] rounded w-full"
                // className={styles.input}
                />
            </div>
            <div>
                <label htmlFor="email"
                    className='text-sm font-bold bg-[#b085bd49]'
                //  className={styles.label}
                >Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="p-2 border border-[#ccc] rounded w-full"
                // className={styles.input}
                />
            </div>
            <div>
                <label htmlFor="phone"
                    className='text-sm font-bold bg-[#b085bd49]'
                //  className={styles.label}
                >Teléfono:</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="p-2 border border-[#ccc] rounded w-full"
                // className={styles.input}
                />
            </div>
            <div>
                <label htmlFor="reason"
                    className='text-sm font-bold bg-[#b085bd49]'
                //  className={styles.label}
                >Motivo de la consulta:</label>
                <textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    className="p-2 border border-[#ccc] rounded w-full h-[150px]"
                // className={styles.textarea}
                />
            </div>
            <button
                type="submit"
                className={`bg-[#b085bd] text-white px-2.5 py-5 border-none rounded cursor-pointer hover:bg-[#693d7a] ${!isFormValid() && 'bg-[#ccc] cursor-not-allowed'}`}
                // className={`${styles.button} ${!isFormValid() && styles.disabledButton}`}
                disabled={!isFormValid()}
            >Enviar</button>
        </form>
    );
}