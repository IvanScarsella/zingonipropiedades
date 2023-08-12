'use client';

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const GlobalContext = createContext({
  properties: [],
  setProperties: () => [],
  selectedOperationType: "",
  setSelectedOperationType: () => [],
  selectedPropertyType: "",
  setSelectedPropertyType: () => [],
  selectedLocation: "",
  setSelectedLocation: () => [],
  selectedRoomsQuantity: "",
  setSelectedRoomsQuantity: () => [],
  auxiliar: [],
  setAuxiliar: () => [],
});


export const GlobalContextProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [dataProperties, setDataProperties] = useState([]);

  const [auxiliar, setAuxiliar] = useState([]);

  const [selectedOperationType, setSelectedOperationType] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedRoomsQuantity, setSelectedRoomsQuantity] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post("/api/properties");
      const auxiliarResponse = await axios.post("/api/auxiliar");
      setIsLoading(true);
      setProperties(response.data.sort(function (a, b) {
        return a.name.localeCompare(b.name);;
      }))
      setDataProperties(response.data)
      setAuxiliar(auxiliarResponse.data)
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
      
      try {
        console.log(params, "params");
        const response = await axios.post('/api/propertiesFilters', { params });
        setProperties(response.data.sort(function (a, b) {
          return a.name.localeCompare(b.name);;
        }))
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    if (
      selectedOperationType ||
      selectedPropertyType ||
      selectedLocation ||
      selectedRoomsQuantity
    ) {
      fetchFilteredProperties();
    } else if (properties !== dataProperties) {
      setProperties(dataProperties)
    }
  }, [
    selectedOperationType,
    selectedPropertyType,
    selectedLocation,
    selectedRoomsQuantity
  ])

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
      auxiliar,
      setAuxiliar,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);