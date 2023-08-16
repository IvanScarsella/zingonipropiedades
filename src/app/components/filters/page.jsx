"use client";

import { useEffect, useState } from "react";
import { useGlobalContext } from '../../../../context/store';
import axios from "axios";
import styles from "./filters.module.css";

export default function Filters(
    //     {
    //     setSelectedOperationType,
    //     setSelectedPropertyType,
    //     setSelectedLocation,
    //     setSelectedRoomsQuantity,
    // }
) {

    const {
        setSelectedOperationType,
        setSelectedPropertyType,
        setSelectedLocation,
        setSelectedRoomsQuantity,
        setOrderBy,
    } = useGlobalContext();

    const [operationType, setOperationType] = useState([]);

    const [location, setLocation] = useState([]);

    const [propertyType, setPropertyType] = useState([]);

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.post('/api/properties');
            // console.log(response.data, 'filtro');
            if (response) {
                const properties = response.data;
                const allOperationTypes = [];
                const allPropertyTypes = [];
                const allLocations = [];
                const allRooms = [];
                properties.forEach((property) => {
                    if (!allOperationTypes.includes(property.operationType)) {
                        allOperationTypes.push(property.operationType.replace(/_/g, ' '))
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
                setOperationType(allOperationTypes.sort());
                setPropertyType(allPropertyTypes.sort());
                setLocation(allLocations.sort());
                setRooms(allRooms.sort())
            }
        }
        fetchData();
    }, []);

    return (
        <div className={styles.filtersContainer}>
            <select
                onChange={(e) => setSelectedOperationType(e.target.value)}
                className={styles.customSelect}
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
                className={styles.customSelect}
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
                className={styles.customSelect}
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
                className={styles.customSelect}
            >
                <option value="">Ambientes</option>
                {rooms.map((room, index) => (
                    <option key={index} value={room}>
                        {room}
                    </option>
                ))}
            </select>
            <select
                onChange={(e) => setOrderBy(e.target.value)}
                className={styles.customSelect}
            >
                <option value="">Ordenar por:</option>
                    <option value="priceLowToHigh">
                        Precio: menor a mayor
                    </option>
                    <option value="priceHighToLow">
                        Precio: mayor a menor
                    </option>
            </select>
        </div>
    )
}
