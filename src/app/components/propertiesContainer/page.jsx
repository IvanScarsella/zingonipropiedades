import { useGlobalContext } from "../../../../context/store";
import styles from "./propertiesContainer.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

function PropertiesContainer() {
    const { properties, setProperties } = useGlobalContext();
    const [pages, setPages] = useState(1);
    const [renderizedProperties, setRenderizedProperties] = useState(properties);
    const [loading, setLoading] = useState(true); // Agregar estado de loading
    const router = useRouter();
    const propertiesPerPage = 10;
    const initialPage = 1;

    useEffect(() => {
        if (properties) {
            const totalPages = Math.ceil(properties.length / propertiesPerPage);
            setPages(totalPages);
            setRenderizedProperties(properties.slice(0, 10));
            setLoading(false); // Marcar que la carga ha finalizado
        }
    }, [properties]);

    const changePage = (e) => {
        setLoading(true); // Marcar que se inicia una nueva carga
        const pageNumber = parseInt(e.target.value); // Convertir a número entero
        const startIndex = (pageNumber - 1) * propertiesPerPage;
        const endIndex = startIndex + propertiesPerPage;
        const currentProperties = properties.slice(startIndex, endIndex);
        setRenderizedProperties(currentProperties);
        setLoading(false); // Marcar que la carga ha finalizado
    };

    return (
        <div className={styles.propertiesContainer}>
            {loading ? (
                // Mostrar el loading mientras se cargan los datos
                <div className={styles.loading}></div>
            ) : (
                // Mostrar los datos cuando la carga ha finalizado
                <>
                    {renderizedProperties.map((property) => (
                        <div key={property.id} className={styles.propertyContainer} onClick={() => router.push(`/${property.id}`)}>
                            <h3>{property.name}</h3>
                            <h3 className={styles.price}>
                                {property.currency === "Pesos" ? "$" : "U$D"} {property.price}
                            </h3>
                            <Image
                                src={property.mainImage}
                                key={property.mainImage}
                                alt="property image"
                                width="200"
                                height="200"
                                className={styles.propertyImage}
                            />
                        </div>
                    ))}
                    <div className={styles.buttonContainer}>
                        {/* Crear un array de números del 1 al valor de pages */}
                        {Array.from({ length: pages }, (_, index) => index + 1).map((pageNumber) => (
                            <button key={pageNumber} value={pageNumber} onClick={changePage}>
                                {pageNumber}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default PropertiesContainer;
