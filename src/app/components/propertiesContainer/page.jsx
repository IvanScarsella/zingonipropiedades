'use client';

import { useGlobalContext } from "../../../../context/store";
import styles from "./propertiesContainer.module.css";
import { useRouter } from "next/navigation";

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
                    </div>
                )
            })}
        </div>
    )
}

export default PropertiesContainer;