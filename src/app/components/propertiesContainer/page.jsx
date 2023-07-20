import { useGlobalContext } from "../../../../context/store";
import styles from "./propertiesContainer.module.css";

function PropertiesContainer() {
    const { properties, setProperties } = useGlobalContext();

    return (
        <div className={styles.propertiesContainer}>
            {properties && properties.map((property) => {
                 return (
                    <div key={property.id}>
                        <p>{property.name}</p>
                        <p>{property.price}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default PropertiesContainer;