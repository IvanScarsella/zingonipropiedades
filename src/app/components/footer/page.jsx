import styles from "./footer.module.css";
import Link from "next/link";
import Image from "next/image";
import facebook_logo from "../../../../public/facebook_logo.png"
import instagram_logo from "../../../../public/instagram_logo.png"

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerColumn}>
                    <h3>Contacto</h3>
                    {/* <p>Dirección: Calle Principal, Ciudad</p> */}
                    <Link href="https://api.whatsapp.com/send/?phone=5492215310582" target="_blank">
                        <p>221531582</p>
                    </Link>
                    <Link href="mailto:zingonipropiedades@gmail.com" target="_blank">
                        <p>E-mail: zingonipropiedades@gmail.com</p>
                    </Link>
                    <Link href="mailto:scarsellaivan@gmail.com" target="_blank">
                        <p className={styles.emailLink}>Sitio web diseñado por Iván Scarsella</p>
                    </Link>
                </div>
                <div className={styles.footerColumn}>
                    <h3>Enlaces</h3>
                    <ul>
                        <li><a href="/landing">Inicio</a></li>
                        <li><a href="/home">Propiedades</a></li>
                        <li><a href="/auxiliar">Auxiliar</a></li>
                        <li><a href="/contact">Contacto</a></li>
                    </ul>
                </div>
                <div className={styles.footerColumn}>
                    <h3>Redes Sociales</h3>
                    <ul className={styles.socialIcons}>


                        <li>
                            <Link href="https://www.facebook.com/Zingonipropiedades" target="_blank">
                                <p><Image className={styles.whatsapp} src={facebook_logo}
                                    alt="facebook_logo" width={15} height={15} />Zingoni Propiedades</p>
                            </Link>
                        </li>
                        {/* <li><a href="#"><i className="fa fa-twitter"></i></a></li> */}
                        <li>
                            <Link href="https://www.instagram.com/zingoni_propiedades/" target="_blank">
                                <p><Image className={styles.whatsapp} src={instagram_logo}
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
