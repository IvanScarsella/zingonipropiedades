import Link from "next/link";
import Image from "next/image";
import whatsapp_logo from "../../../../public/whatsapp_logo.png";
import styles from "./whatsapp.module.css";

export default function WhatsApp () {
    return ( 
        <Link href="https://api.whatsapp.com/send/?phone=5492215310582" target="_blank">
            <Image className={styles.whatsapp} src={whatsapp_logo}
            alt="whatsapp_logo"  width={100} height={100} />
             </Link>
    )
}