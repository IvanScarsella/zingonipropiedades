"use client";

import Header from "../components/header/page";
import WhatsApp from "../components/whatsapp/page";
import { useGlobalContext } from "../../../context/store";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./auxiliar.module.css";
import axios from "axios";

export default function Contact() {

    const router = useRouter();

    const { auxiliar, setAuxiliar } = useGlobalContext();
    const [loading, setLoading] = useState(true); // Agregar estado de loading

    useEffect(() => {
        if (auxiliar) {

        }
    }, [])

    const deleteAuxiliar = async (id) => {
        const response = await axios.delete(`/api/auxiliar/${id}`);
        if(response){
            alert("Auxiliar eliminado con éxito")
            window.location.reload();
        }
    }

    return (
        <>
            <Header />
            {auxiliar.map((aux) => (
                <div>
                    <h4>{aux.name}</h4>
                    <h4>{aux.position}</h4>
                    <h4>{aux.phone}</h4>
                    <Image
                        src={aux.photo}
                        key={aux.photo}
                        alt="auxiliar image"
                        width="200"
                        height="200"
                        className={styles.auxiliarImage}
                    />
            <button onClick={() => router.push(`/auxiliar/${aux.id}`)}>
                Actualizar
                </button>
            <button onClick={() => deleteAuxiliar(aux.id)}>
                Eliminar
                </button>
                </div>
            ))
            }
            <button onClick={() => router.push(`/createAuxiliar`)}>
                Cargar nuevo Auxiliar
                </button>
            <WhatsApp />
        </>
    )
}