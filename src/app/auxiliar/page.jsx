"use client";

import Header from "../components/header/page";
import WhatsApp from "../components/whatsapp/page";
import { useGlobalContext } from "../../../context/store";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import Footer from "../components/footer/page";
import whatsapp_logo from "../../../public/whatsapp_logo.png";
import Link from "next/link";

export default function Auxiliar() {
    const router = useRouter();
    const { auxiliar, setAuxiliar } = useGlobalContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuxiliares = async () => {
            try {
                setLoading(true);
                const response = await axios.post("/api/auxiliar");
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border border-[#40215c] rounded-lg bg-gradient-to-b from-[#b085bd] to-[#b085bd9c]">
                {auxiliar.map((aux) => (
                    <div key={aux.id} className="flex flex-col items-center border border-[#40215c] rounded-lg p-4 bg-gradient-to-b from-[#693d7a] to-[#b085bd9c]">
                        <h4 className="text-gray-300">{aux.name}</h4>
                        <h4 className="text-gray-300">{aux.position}</h4>
                        <Link href={`https://api.whatsapp.com/send/?phone=549${aux.phone}`} target="_blank">
                            <h4 className="flex items-center text-gray-300">
                                <Image src={whatsapp_logo} alt="whatsapp_logo" width={15} height={15} className="mr-2" />
                                {aux.phone}
                            </h4>
                        </Link>
                        <Image
                            src={aux.photo}
                            alt="auxiliar image"
                            width="200"
                            height="200"
                            className="w-48 h-48 object-cover rounded-lg border border-[#40215c]"
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
