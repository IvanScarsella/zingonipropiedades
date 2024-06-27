import styles from "./footer.module.css";
import Link from "next/link";
import Image from "next/image";
import facebook_logo from "../../../../public/facebook_logo.png"
import instagram_logo from "../../../../public/instagram_logo.png"

const Footer = () => {
    return (
        <footer
            className='bg-[#693d7a] bg-gradient-custom px-5 min-w-full'
        // className={styles.footer}
        >
            <div
                className="flex flex-row justify-between"
            //  className={styles.footerContent}
            >
                <div
                    className="flex-1 py-5 flex flex-col items-center"
                //  className={styles.footerColumn}
                >
                    <h3
                        className="mb-2.5"
                    >Contacto</h3>
                    <Link href="https://api.whatsapp.com/send/?phone=5492215310582" target="_blank">
                        <p
                            className="text-white mb-[5px]"
                        >2215310582</p>
                    </Link>
                    <Link href="mailto:zingonipropiedades@gmail.com" target="_blank">
                        <p
                            className="text-white mb-[5px]"
                        >E-mail: zingonipropiedades@gmail.com</p>
                    </Link>
                    <Link href="mailto:scarsellaivan@gmail.com" target="_blank" >
                        <p
                            className="text-white mb-[5px]"
                        >Sitio web diseñado por Iván Scarsella</p>
                    </Link>
                </div>
                <div
                    className="flex flex-1 py-5 flex-col items-center"
                // className={styles.footerColumn}
                >
                    <h3 className="mb-2.5">Enlaces</h3>
                    <ul>
                        <li><a href="/landing">Inicio</a></li>
                        <li><a href="/home">Propiedades</a></li>
                        <li><a href="/auxiliar">Auxiliar</a></li>
                        <li><a href="/contact">Contacto</a></li>
                    </ul>
                </div>
                <div
                    className="text-white mb-1"
                //  className={styles.footerColumn}
                >
                    <h3 className="mb-2.5">Redes Sociales</h3>
                    <ul
                        className='pl-0'
                    // className={styles.socialIcons}
                    >


                        <li className="inline mr-2.5">
                            <Link href="https://www.facebook.com/Zingonipropiedades" target="_blank">
                                <p><Image src={facebook_logo}
                                    alt="facebook_logo" width={15} height={15} />Zingoni Propiedades</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.instagram.com/zingoni_propiedades/" target="_blank">
                                <p><Image src={instagram_logo}
                                    alt="instagram_logo" width={15} height={15} />@zingoni_propiedades</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
