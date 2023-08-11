import styles from "./footer.module.css";
import Link from "next/link";

export default function Footer() {
    return (
        <div className={styles.footerContainer}>
            <h5>Teléfono: 2215310582</h5>
            <Link href="https://www.facebook.com/Zingonipropiedades" target="_blank">
                <h5>Facebook: Zingoni Propiedades </h5>
            </Link>
            <Link href="https://www.instagram.com/zingoni_propiedades/" target="_blank">
                <h5>Instagram: @zingoni_propiedades</h5>
            </Link>
            <Link href="mailto:zingonipropiedades@gmail.com" target="_blank">
                <h5>E-mail: zingonipropiedades@gmail.com</h5>
            </Link>
            <div className={styles.emailLinkContainer}>
                <Link href="mailto:scarsellaivan@gmail.com" target="_blank">
                    <h6 className={styles.emailLink}>Sitio web diseñado por Iván Scarsella</h6>
                </Link>
            </div>
        </div>
    );
}
