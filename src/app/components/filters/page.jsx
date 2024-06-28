"use client";

import { useEffect, useState } from "react";
import { useGlobalContext } from '../../../../context/store';
import axios from "axios";
import styles from "./filters.module.css";

export default function Filters() {

    const {
        selectedOperationType,
        setSelectedOperationType,
        selectedPropertyType,
        setSelectedPropertyType,
        selectedLocation,
        setSelectedLocation,
        selectedRoomsQuantity,
        setSelectedRoomsQuantity,
        orderBy,
        setOrderBy,
    } = useGlobalContext();

    const [operationType, setOperationType] = useState([]);

    const [location, setLocation] = useState([]);

    const [propertyType, setPropertyType] = useState([]);

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.post('/api/properties');
            if (response) {
                const properties = response.data;
                const allOperationTypes = [];
                const allPropertyTypes = [];
                const allLocations = [];
                const allRooms = [];
                properties.forEach((property) => {
                    if (!allOperationTypes.includes(property.operationType.replace(/_/g, ' '))) {
                        allOperationTypes.push(property.operationType.replace(/_/g, ' '))
                    };
                    if (!allPropertyTypes.includes(property.propertyType)) {
                        allPropertyTypes.push(property.propertyType.replace(/_/g, ' '))
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
        <div
            className="flex flex-col items-start self-start p-10 text-center border border-[#40215c] rounded-lg bg-gradient-custom-3 shadow-lg max-w-[300px] ml-10"
        //  className={styles.filtersContainer}
        >
            <select
                onChange={(e) => setSelectedOperationType(e.target.value)}
                className="m-1.5 w-full border-none bg-white shadow-lg rounded-md p-2.5 focus:outline-none"
            // className={styles.customSelect}
            >
                <option value="">Tipo de operación</option>
                {operationType.map((operation, index) => (
                    <option
                        key={index}
                        value={operation}
                        selected={selectedOperationType === operation}
                    >
                        {operation.replace(/_/g, ' ')}
                    </option>
                ))}
            </select>
            <select
                onChange={(e) => setSelectedPropertyType(e.target.value)}
                className="m-1.5 w-full border-none bg-white shadow-lg rounded-md p-2.5 focus:outline-none"
            // className={styles.customSelect}
            >
                <option value="">Tipo de propiedad</option>
                {propertyType.map((property, index) => (
                    <option
                        key={index}
                        value={property}
                        selected={selectedPropertyType === property}
                    >
                        {property}
                    </option>
                ))}
            </select>
            <select
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="m-1.5 w-full border-none bg-white shadow-lg rounded-md p-2.5 focus:outline-none"
            // className={styles.customSelect}
            >
                <option value="">Localidad</option>
                {location.map((location, index) => (
                    <option
                        key={index}
                        value={location}
                        selected={selectedLocation === location}
                    >
                        {location}
                    </option>
                ))}
            </select>
            <select
                onChange={(e) => setSelectedRoomsQuantity(e.target.value)}
                className="m-1.5 w-full border-none bg-white shadow-lg rounded-md p-2.5 focus:outline-none"
            // className={styles.customSelect}
            >
                <option value="">Ambientes</option>
                {rooms.map((room, index) => (
                    <option
                        key={index}
                        value={room}
                        selected={selectedRoomsQuantity === room.toString()}
                    >
                        {room}
                    </option>
                ))}
            </select>
            <select
                onChange={(e) => setOrderBy(e.target.value)}
                className="m-1.5 w-full border-none bg-white shadow-lg rounded-md p-2.5 focus:outline-none"
                // className={styles.customSelect}
                value={orderBy}
            >
                <option value="">Ordenar por:</option>
                <option
                    value="priceLowToHigh"
                >
                    Precio: menor a mayor
                </option>
                <option value="priceHighToLow">
                    Precio: mayor a menor
                </option>
            </select>
            {selectedOperationType && (
                <button
                    className="rounded-md m-1.5 w-full flex justify-center items-center shadow-lg cursor-pointer bg-gradient-custom-4"
                    // className={styles.filterButton}
                    onClick={() => setSelectedOperationType("")}
                >
                    {selectedOperationType} &#x2716;
                </button>
            )}
            {selectedPropertyType && (
                <button
                    className="rounded-md m-1.5 w-full flex justify-center items-center shadow-lg cursor-pointer bg-gradient-custom-4"
                    // className={styles.filterButton}
                    onClick={() => setSelectedPropertyType("")}
                >
                    {selectedPropertyType} &#x2716;
                </button>
            )}
            {selectedLocation && (
                <button
                    className="rounded-md m-1.5 w-full flex justify-center items-center shadow-lg cursor-pointer bg-gradient-custom-4"
                    // className={styles.filterButton}
                    onClick={() => setSelectedLocation("")}
                >
                    {selectedLocation} &#x2716;
                </button>
            )}
            {selectedRoomsQuantity && (
                <button
                    className="rounded-md m-1.5 w-full flex justify-center items-center shadow-lg cursor-pointer bg-gradient-custom-4"
                    // className={styles.filterButton}
                    onClick={() => setSelectedRoomsQuantity("")}
                >
                    {selectedRoomsQuantity} Ambientes &#x2716;
                </button>
            )}
            {orderBy && (
                <button
                    className="rounded-md m-1.5 w-full flex justify-center items-center shadow-lg cursor-pointer bg-gradient-custom-4"
                    // className={styles.filterButton}
                    onClick={() => setOrderBy("")}
                >
                    {orderBy === "priceLowToHigh" ? "Precio: menor a mayor" : "Precio: mayor a menor"} &#x2716;
                </button>
            )}
        </div>
    )
}
