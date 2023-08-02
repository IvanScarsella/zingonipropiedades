import styles from "./navbar.module.css";
import { useRouter } from "next/navigation";

export default function NavBar() {

  const router = useRouter();

    return (
      <div className={styles.navbarContainer}>
          <button className={styles.navbarButton} onClick={() => router.push('/home')}>Inicio</button>
          <button className={styles.navbarButton} onClick={() => router.push('/contact')}>Contacto</button>
          <br></br>
      </div>
    )
  }