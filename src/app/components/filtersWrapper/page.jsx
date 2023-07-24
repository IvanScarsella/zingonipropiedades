// Nuevo componente "FiltersWrapper" que maneja el estado y usa "Filters"
import { useState } from 'react';
// import Filters from '../components/filters/page';
import Filters from '../filters/page'
// import { GlobalContext } from '../../../context/store';
import { useGlobalContext } from '../../../../context/store';

export default function FiltersWrapper() {
  const {
    setSelectedOperationType,
    setSelectedPropertyType,
    setSelectedLocation,
    setSelectedRoomsQuantity,
  } = useGlobalContext();

  return (
    <Filters
      setSelectedOperationType={setSelectedOperationType}
      setSelectedPropertyType={setSelectedPropertyType}
      setSelectedLocation={setSelectedLocation}
      setSelectedRoomsQuantity={setSelectedRoomsQuantity}
    />
  );
}