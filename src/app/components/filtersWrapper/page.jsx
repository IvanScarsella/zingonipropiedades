'use client';

// Nuevo componente "FiltersWrapper" que maneja el estado y usa "Filters"
import Filters from '../filters/page';
import { useGlobalContext } from '../../../../context/store';
import { useEffect } from 'react';

export default function FiltersWrapper() {
  const {
    setSelectedOperationType,
    setSelectedPropertyType,
    setSelectedLocation,
    setSelectedRoomsQuantity,
  } = useGlobalContext();

  useEffect(() => {
    // Realizar configuración inicial en Filters utilizando los datos de defaultFilters
    setSelectedOperationType('');
    setSelectedPropertyType('');
    setSelectedLocation('');
    setSelectedRoomsQuantity('');
  }, []);

  return (
    <Filters
      setSelectedOperationType={setSelectedOperationType}
      setSelectedPropertyType={setSelectedPropertyType}
      setSelectedLocation={setSelectedLocation}
      setSelectedRoomsQuantity={setSelectedRoomsQuantity}
    />
  );
}