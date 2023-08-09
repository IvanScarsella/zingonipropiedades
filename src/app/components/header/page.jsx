import Image from "next/image";
import logo from "../../../../public/logo.jpg";
import styles from "./header.module.css";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();
    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerLogo} onClick={() => router.push('/home')}>
                <Image
                    src={logo}
                    alt="Logo"
                    width={150}
                    height={150}
                    className="rounded-image"
                />
            </div>
            <div className={styles.headerButtonsContainer}>
                <button className={`${styles.headerButton}`} onClick={() => router.push('/home')}>Inicio</button>
                <button className={`${styles.headerButton}`} onClick={() => router.push('/auxiliar')}>Auxiliares</button>
                <button className={`${styles.headerButton}`} onClick={() => router.push('/contact')}>Contacto</button>
            </div>
        </div>
    );
}
