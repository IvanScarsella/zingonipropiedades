'use client';

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const GlobalContext = createContext({
  properties: [],
  setProperties: () => [],
  selectedOperationType: "",
  setSelectedOperationType: () => { },
  selectedPropertyType: "",
  setSelectedPropertyType: () => [],
  selectedLocation: "",
  setSelectedLocation: () => [],
  selectedRoomsQuantity: "",
  setSelectedRoomsQuantity: () => [],
  auxiliar: [],
  setAuxiliar: () => [],
  orderBy: "",
  setOrderBy: () => []
});


export const GlobalContextProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [dataProperties, setDataProperties] = useState([]);

  const [auxiliar, setAuxiliar] = useState([]);

  const [selectedOperationType, setSelectedOperationType] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedRoomsQuantity, setSelectedRoomsQuantity] = useState("");
  const [orderBy, setOrderBy] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  // DESCOMENTAR LINEAS DEL USEEFFECT
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post("/api/properties");
      // const auxiliarResponse = await axios.post("/api/auxiliar");
      setIsLoading(true);

      const featured = response.data.filter(property => property.featured).sort(function (a, b) {
        return a.name.localeCompare(b.name);;
      });

      const noFeatured = response.data.filter(property => !property.featured).sort(function (a, b) {
        return a.name.localeCompare(b.name);;
      });
      const reorderedProperties = [...featured, ...noFeatured];
      // setProperties(reorderedProperties)
      setProperties(response.data)
      setDataProperties(response.data)
      // setAuxiliar(auxiliarResponse.data)
      setIsLoading(false);
    };
    fetchData();
  }, [])

  useEffect(() => {
    const fetchFilteredProperties = async () => {
      const params = {};
      setIsLoading(true);

      if (selectedOperationType) {
        params.operationType = selectedOperationType;
      }
      if (selectedPropertyType) {
        params.propertyType = selectedPropertyType;
      }
      if (selectedLocation) {
        params.location = selectedLocation;
      }
      if (selectedRoomsQuantity) {
        params.rooms = selectedRoomsQuantity;
      }
      if (orderBy) {
        params.orderBy = orderBy;
      }

      try {
        const response = await axios.post('/api/propertiesFilters', { params });
        setProperties(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    // Llamar a la función de filtrado si hay algún filtro activo
    if (
      selectedOperationType ||
      selectedPropertyType ||
      selectedLocation ||
      selectedRoomsQuantity ||
      orderBy
    ) {
      fetchFilteredProperties();
    } else if (properties !== dataProperties) {
      // Restaurar las propiedades originales si no hay filtros ni ordenamientos activos
      setProperties(dataProperties);
    }
  }, [
    selectedOperationType,
    selectedPropertyType,
    selectedLocation,
    selectedRoomsQuantity,
    orderBy,
  ]);

  return (
    <GlobalContext.Provider value={{
      properties,
      setProperties,
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
      auxiliar,
      setAuxiliar,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);