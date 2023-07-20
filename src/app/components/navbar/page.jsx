import styles from "./navbar.module.css";

export default function NavBar() {

    return (
      <div className={styles.navbarContainer}>
          <p>Inicio</p>
          <p>Contacto</p>
          <br></br>
      </div>
    )
  }