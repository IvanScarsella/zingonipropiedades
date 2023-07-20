import Image from "next/image";
import logo from "../../../../public/logo.jpg";
import styles from "./header.module.css";

export default function Header () {
    return (
        <div className={styles.headerContainer}>
            <Image src={logo} alt="Logo" width={300} height={200} className="headerLogo"/>
            <h2 className="headerPhone">(221)5310582</h2>
        </div>
    )
}