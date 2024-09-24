"use client";

import Link from "next/link";
import Image from "next/image";
import facebook_logo from "../../../public/facebook_logo.png";
import instagram_logo from "../../../public/instagram_logo.png";
import whatsapp_logo from "../../../public/whatsapp_logo.png";
import MailForm from "../components/mailForm/page";

export default function Contact() {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-5 bg-gradient-to-b from-[#b085bdbd] to-[#b085bd9c] mt-32">
                <h1 className="text-2xl mb-5">Contacto</h1>
                <ul className="list-none p-0 m-0 flex flex-col items-center gap-2 mb-5">
                    <li className="flex justify-center items-center text-white bg-[#693d7ab0] rounded-lg transition-transform transform hover:scale-110 min-w-[60%] p-2">
                        <Link href="https://api.whatsapp.com/send/?phone=5492215310582" target="_blank" className="flex items-center">
                            <Image className="mr-2" src={whatsapp_logo} alt="whatsapp_logo" width={120} height={120} />
                            2215310582
                        </Link>
                    </li>
                    <li className="flex justify-center items-center text-white bg-[#693d7ab0] rounded-lg transition-transform transform hover:scale-110 min-w-[60%] p-2">
                        <Link href="https://www.facebook.com/Zingonipropiedades" target="_blank" className="flex items-center">
                            <Image className="mr-2" src={facebook_logo} alt="facebook_logo" width={120} height={120} />
                            Zingoni Propiedades
                        </Link>
                    </li>
                    <li className="flex justify-center items-center text-white bg-[#693d7ab0] rounded-lg transition-transform transform hover:scale-110 min-w-[60%] p-2">
                        <Link href="https://www.instagram.com/zingoni_propiedades/" target="_blank" className="flex items-center">
                            <Image className="mr-2" src={instagram_logo} alt="instagram_logo" width={120} height={120} />
                            @zingoni_propiedades
                        </Link>
                    </li>
                </ul>
                <h3>Puede enviarnos su consulta desde aquí:</h3>
                <div className="w-4/5 max-w-[500px]">
                    <MailForm />
                </div>
            </div>
        </>
    );
}
