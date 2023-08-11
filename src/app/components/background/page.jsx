import Image from "next/image";
import backgroundLogo from "../../../../public/backgroundLogo.png";
import styles from "./background.module.css";

export default function Background () {
    return ( 
            <Image className={styles.backgroundLogo} src={backgroundLogo}
            alt="background_Logo"  width={700} height={250} />
    )
}