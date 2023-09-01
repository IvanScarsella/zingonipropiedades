"use client";

import Header from "../components/header/page";
import WhatsApp from "../components/whatsapp/page";
import { useGlobalContext } from "../../../context/store";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./auxiliar.module.css";
import axios from "axios";
import Footer from "../components/footer/page";
import whatsapp_logo from "../../../public/whatsapp_logo.png"
import Link from "next/link";

export default function Auxiliar() {

    const router = useRouter();

    const { auxiliar, setAuxiliar } = useGlobalContext();
    const [loading, setLoading] = useState(true); // Agregar estado de loading

    useEffect(() => {
        const fetchAuxiliares = async () => {
            try {
                setLoading(true);
                const response = await axios.post("/api/auxiliar"); // Cambia la ruta de acuerdo a tu API
                setAuxiliar(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching auxiliares:", error);
                setLoading(false);
            }
        };

        fetchAuxiliares();
    }, [setAuxiliar]);

    return (
        <>
            <Header />
            <div className={styles.auxiliarList}>
                {auxiliar.map((aux) => (
                    <>
                        <div className={styles.auxiliarCard} key={aux.id}>
                            <h4>{aux.name}</h4>
                            <h4>{aux.position}</h4>
                            <Link href={`https://api.whatsapp.com/send/?phone=549${aux.phone}`} target="_blank">
                                <h4>
                                    <Image className={styles.whatsapp} src={whatsapp_logo}
                                        alt="whatsapp_logo" width={15} height={15} />
                                    {aux.phone}
                                </h4>
                            </Link>
                            <Image
                                src={aux.photo}
                                key={aux.photo}
                                alt="auxiliar image"
                                width="200"
                                height="200"
                                className={styles.auxiliarImage}
                            />
                        </div>
                    </>
                ))
                }
            </div>
            <Footer />
            <WhatsApp />
        </>
    )
}