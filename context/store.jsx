'use client';

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const GlobalContext = createContext({
  properties: [],
  setProperties: () => []
});


export const GlobalContextProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.post("/api/properties");
        setProperties(response.data)
    };
    fetchData();
}, [])

  return (
    <GlobalContext.Provider value={{ properties, setProperties }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);