import styles from "./footer.module.css";
import Link from "next/link";
import Image from "next/image";
import facebook_logo from "../../../../public/facebook_logo.png"
import instagram_logo from "../../../../public/instagram_logo.png"

const Footer = () => {
    return (
        <footer className="bg-custom-4 px-5 py-10 w-full">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start max-w-6xl mx-auto space-y-8 md:space-y-0">
                <div className="flex-1 flex flex-col items-center md:items-start">
                    <h3 className="mb-2.5 text-xl text-[#fff] font-semibold">Contacto</h3>
                    <Link href="https://api.whatsapp.com/send/?phone=5492215310582" target="_blank">
                        <p className="text-[#fff] text-sm mb-1">2215310582</p>
                    </Link>
                    <Link href="mailto:zingonipropiedades@gmail.com" target="_blank">
                        <p className="text-[#fff] text-sm mb-1">E-mail: zingonipropiedades@gmail.com</p>
                    </Link>
                    <Link href="mailto:scarsellaivan@gmail.com" target="_blank">
                        <p className="text-[#fff] text-sm mb-1">Sitio web diseñado por Iván Scarsella</p>
                    </Link>
                </div>
                <div className="flex-1 flex flex-col items-center md:items-start">
                    <h3 className="mb-2.5 text-xl text-[#fff] font-semibold">Enlaces</h3>
                    <ul className="space-y-1">
                        <li><Link href="/landing"><p className="text-[#fff] text-sm">Inicio</p></Link></li>
                        <li><Link href="/home"><p className="text-[#fff] text-sm">Propiedades</p></Link></li>
                        <li><Link href="/auxiliar"><p className="text-[#fff] text-sm">Auxiliar</p></Link></li>
                        <li><Link href="/contact"><p className="text-[#fff] text-sm">Contacto</p></Link></li>
                    </ul>
                </div>
                <div className="flex-1 flex flex-col items-center md:items-start">
                    <h3 className="mb-2.5 text-xl text-[#fff] font-semibold">Redes Sociales</h3>
                    <ul className="space-y-1">
                        <li>
                            <Link href="https://www.facebook.com/Zingonipropiedades" target="_blank">
                                <div className="flex items-center text-[#fff]">
                                    <Image src={facebook_logo} alt="Facebook Logo" width={15} height={15} />
                                    <span className="ml-2">Zingoni Propiedades</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.instagram.com/zingoni_propiedades/" target="_blank">
                                <div className="flex items-center text-[#fff]">
                                    <Image src={instagram_logo} alt="Instagram Logo" width={15} height={15} />
                                    <span className="ml-2">@zingoni_propiedades</span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
