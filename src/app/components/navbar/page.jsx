import styles from "./navbar.module.css";
import { useRouter } from "next/navigation";

export default function NavBar() {

  const router = useRouter();

    return (
      <div className={styles.navbarContainer}>
          <button onClick={() => router.push('/home')}>Inicio</button>
          <button onClick={() => router.push('/contact')}>Contacto</button>
          <br></br>
      </div>
    )
  }