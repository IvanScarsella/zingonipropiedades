import { useGlobalContext } from "../../../../context/store";

function PropertiesContainer() {
    const { properties, setProperties } = useGlobalContext();

    return (
        <div>
            {properties && properties.map((property) => {
                return (
                    <>
                        <p>{property.name}</p>
                        <p>{property.price}</p>
                    </>
                )
            })}
        </div>
    )
}

export default PropertiesContainer;