import styles from "./footer.module.css";
import Link from "next/link";

export default function Footer() {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.emailLinkContainer}>
                <Link href="mailto:scarsellaivan@gmail.com" target="_blank">
                    <h5 className={styles.emailLink}>Sitio web diseñado por Iván Scarsella</h5>
                </Link>
            </div>
        </div>
    );
}
