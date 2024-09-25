"use client"

import { useState } from "react";
import axios from "axios";

export default function MailForm({ id }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        reason: ''
    });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const response = await axios.post('/api/sendEmail', {
                formData,
                id
            });
            if (response.data) {
                setSuccessMessage('¡Mail enviado correctamente!');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    reason: ''
                });
            }
        } catch (error) {
            setErrorMessage('Hubo un error al enviar el correo, por favor intenta de nuevo.');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = () => {
        return (
            formData.name &&
            formData.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/) && // Validación simple de email
            formData.phone.match(/^\d+$/) && // Validación de números para teléfono
            formData.reason
        );
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:w-2/5">
            {successMessage && <div className="text-green-500">{successMessage}</div>}
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}

            <div>
                <label htmlFor="name" className='text-sm font-bold'>Nombre:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="p-2 border border-[#ccc] rounded w-full"
                    required
                />
            </div>
            <div>
                <label htmlFor="email" className='text-sm font-bold'>Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="p-2 border border-[#ccc] rounded w-full"
                    required
                />
            </div>
            <div>
                <label htmlFor="phone" className='text-sm font-bold'>Teléfono:</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="p-2 border border-[#ccc] rounded w-full"
                    required
                />
            </div>
            <div>
                <label htmlFor="reason" className='text-sm font-bold'>Motivo de la consulta:</label>
                <textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    className="p-2 border border-[#ccc] rounded w-full h-[150px]"
                    required
                />
            </div>
            <button
                type="submit"
                className={`bg-[#b085bd] text-white px-2.5 py-5 border-none rounded cursor-pointer hover:bg-[#693d7a] ${!isFormValid() && 'bg-[#ccc] cursor-not-allowed'}`}
                disabled={!isFormValid() || loading}
            >
                {loading ? 'Enviando...' : 'Enviar'}
            </button>
        </form>
    );
}
