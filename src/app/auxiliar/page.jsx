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
import imageUrlBuilder from "@sanity/image-url";
import client from "@/src/sanity/lib/client";

const builder = imageUrlBuilder(client);

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
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 p-4 sm:px-20 sm:py-8  bg-gray-100 mt-32">
                {auxiliar.map((aux) => (
                    <div key={aux.id} className="flex flex-col items-center border border-[#40215c] rounded-lg p-4 bg-gradient-to-b from-[#693d7a] to-[#b085bd]">
                        <h4 className="text-gray-300 text-2xl">{aux.name}</h4>
                        <h4 className="text-gray-300 text-xl">{aux.position}</h4>
                        <Link href={`https://api.whatsapp.com/send/?phone=549${aux.phone}`} target="_blank">
                            <h4 className="flex items-center text-gray-300 text-xl">
                                <Image src={whatsapp_logo} alt="whatsapp_logo" width={24} height={24} className="mr-2" />
                                {aux.phone}
                            </h4>
                        </Link>
                        <Image
                            src={builder.image(aux.photo).width(1000).height(1000).url()}
                            alt="auxiliar image"
                            width="1000"
                            height="1000"
                            className="w-48 md:w-72 h-48 md:h-72 object-cover rounded-lg border border-[#40215c]"
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
