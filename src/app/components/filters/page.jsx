"use client";

import { useGlobalContext } from "../../../../context/store";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./filters.module.css";

export function Filters({
    setSelectedOperationType,
    setSelectedPropertyType,
    setSelectedLocation,
    setSelectedRoomsQuantity,
}) {

    const [operationType, setOperationType] = useState([]);

    const [location, setLocation] = useState([]);

    const [propertyType, setPropertyType] = useState([]);

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.post('/api/properties');
            console.log( response.data, 'filtro');
            if (response) {
                const properties = response.data;
                const allOperationTypes = [];
                const allPropertyTypes = [];
                const allLocations = [];
                const allRooms = [];
                properties.forEach((property) => {
                    if (!allOperationTypes.includes(property.operationType)) {
                        allOperationTypes.push(property.operationType)
                    };
                    if (!allPropertyTypes.includes(property.propertyType)) {
                        allPropertyTypes.push(property.propertyType)
                    };
                    if (!allLocations.includes(property.location)) {
                        allLocations.push(property.location)
                    };
                    if (property.rooms !== 0 && !allRooms.includes(property.rooms)) {
                        allRooms.push(property.rooms)
                    };
                })
                setOperationType(allOperationTypes);
                setPropertyType(allPropertyTypes);
                setLocation(allLocations);
                setRooms(allRooms)
            }
        }
        fetchData();
    }, []);

    return (
        <div className={styles.filtersContainer}>
            <select
                  onChange={(e) => setSelectedOperationType(e.target.value)}
                className={styles.selectors}
            >
                <option value="">Tipo de operación</option>
                {operationType.map((operation, index) => (
                    <option key={index} value={operation}>
                        {operation}
                    </option>
                ))}
            </select>
            <select
                onChange={(e) => setSelectedPropertyType(e.target.value)}
                className={styles.selectors}
            >
                <option value="">Tipo de propiedad</option>
                {propertyType.map((property, index) => (
                    <option key={index} value={property}>
                        {property}
                    </option>
                ))}
            </select>
            <select
                onChange={(e) => setSelectedLocation(e.target.value)}
                className={styles.selectors}
            >
                <option value="">Localidad</option>
                {location.map((location, index) => (
                    <option key={index} value={location}>
                        {location}
                    </option>
                ))}
            </select>
            <select
                onChange={(e) => setSelectedRoomsQuantity(e.target.value)}
                className={styles.selectors}
            >
                <option value="">Ambientes</option>
                {rooms.map((room, index) => (
                    <option key={index} value={room}>
                        {room}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Filters;