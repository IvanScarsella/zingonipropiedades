'use client';

import { useGlobalContext } from "../../../../context/store";
import styles from "./propertiesContainer.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

function PropertiesContainer() {
    const { properties, setProperties } = useGlobalContext();
    const router = useRouter();

    return (
        <div className={styles.propertiesContainer}>
            {properties && properties.map((property) => {
                return (
                    <div key={property.id} onClick={() => {
                        router.push(`/${property.id}`)
                    }}>
                        <p>{property.name}</p>
                        <p>{property.price}</p>
                        <Image src={property.mainImage} key={property.mainImage} alt='property image' width='200' height='200' />
                    </div>
                )
            })}
        </div>
    )
}

export default PropertiesContainer;