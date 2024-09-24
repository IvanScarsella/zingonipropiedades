"use client";

import { useEffect, useState } from "react";
import { useGlobalContext } from "../../../../context/store";
import axios from "axios";

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
            const response = await axios.post("/api/properties");
            if (response) {
                const properties = response.data;
                const allOperationTypes = [];
                const allPropertyTypes = [];
                const allLocations = [];
                const allRooms = [];
                properties.forEach((property) => {
                    if (!allOperationTypes.includes(property.operationType.replace(/_/g, " "))) {
                        allOperationTypes.push(property.operationType.replace(/_/g, " "));
                    }
                    if (!allPropertyTypes.includes(property.propertyType)) {
                        allPropertyTypes.push(property.propertyType.replace(/_/g, " "));
                    }
                    if (!allLocations.includes(property.location)) {
                        allLocations.push(property.location);
                    }
                    if (property.rooms !== 0 && !allRooms.includes(property.rooms)) {
                        allRooms.push(property.rooms);
                    }
                });
                setOperationType(allOperationTypes.sort());
                setPropertyType(allPropertyTypes.sort());
                setLocation(allLocations.sort());
                setRooms(allRooms.sort());
            }
        }
        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-start self-start p-8 border border-[#40215c] rounded-lg bg-gradient-to-t from-[#693d7acc] to-[#693d7a] shadow-lg max-w-[300px] max-sm:w-full max-sm:max-w-none sm:mx-6">
            <select
                onChange={(e) => setSelectedOperationType(e.target.value)}
                className="w-full mb-3 border-none bg-white shadow-md rounded-md p-2 focus:outline-none"
                value={selectedOperationType}
            >
                <option value="">Tipo de operación</option>
                {operationType.map((operation, index) => (
                    <option key={index} value={operation}>
                        {operation.replace(/_/g, " ")}
                    </option>
                ))}
            </select>

            <select
                onChange={(e) => setSelectedPropertyType(e.target.value)}
                className="w-full mb-3 border-none bg-white shadow-md rounded-md p-2 focus:outline-none"
                value={selectedPropertyType}
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
                className="w-full mb-3 border-none bg-white shadow-md rounded-md p-2 focus:outline-none"
                value={selectedLocation}
            >
                <option value="">Localidad</option>
                {location.map((loc, index) => (
                    <option key={index} value={loc}>
                        {loc}
                    </option>
                ))}
            </select>

            <select
                onChange={(e) => setSelectedRoomsQuantity(e.target.value)}
                className="w-full mb-3 border-none bg-white shadow-md rounded-md p-2 focus:outline-none"
                value={selectedRoomsQuantity}
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
                className="w-full mb-3 border-none bg-white shadow-md rounded-md p-2 focus:outline-none"
                value={orderBy}
            >
                <option value="">Ordenar por</option>
                <option value="priceLowToHigh">Precio: menor a mayor</option>
                <option value="priceHighToLow">Precio: mayor a menor</option>
            </select>

            {selectedOperationType && (
                <button
                    className="w-full mt-2 flex justify-center items-center py-2 bg-gradient-to-t from-[#b085bd9c] to-[#b085bd] rounded-md shadow-md hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => setSelectedOperationType("")}
                >
                    {selectedOperationType} &#x2716;
                </button>
            )}

            {selectedPropertyType && (
                <button
                    className="w-full mt-2 flex justify-center items-center py-2 bg-gradient-to-t from-[#b085bd9c] to-[#b085bd] rounded-md shadow-md hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => setSelectedPropertyType("")}
                >
                    {selectedPropertyType} &#x2716;
                </button>
            )}

            {selectedLocation && (
                <button
                    className="w-full mt-2 flex justify-center items-center py-2 bg-gradient-to-t from-[#b085bd9c] to-[#b085bd] rounded-md shadow-md hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => setSelectedLocation("")}
                >
                    {selectedLocation} &#x2716;
                </button>
            )}

            {selectedRoomsQuantity && (
                <button
                    className="w-full mt-2 flex justify-center items-center py-2 bg-gradient-to-t from-[#b085bd9c] to-[#b085bd] rounded-md shadow-md hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => setSelectedRoomsQuantity("")}
                >
                    {selectedRoomsQuantity} Ambientes &#x2716;
                </button>
            )}

            {orderBy && (
                <button
                    className="w-full mt-2 flex justify-center items-center py-2 bg-gradient-to-t from-[#b085bd9c] to-[#b085bd] rounded-md shadow-md hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => setOrderBy("")}
                >
                    {orderBy === "priceLowToHigh" ? "Precio: menor a mayor" : "Precio: mayor a menor"} &#x2716;
                </button>
            )}
        </div>
    );
}

