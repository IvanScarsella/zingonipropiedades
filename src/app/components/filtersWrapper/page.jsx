'use client';

import Filters from '../filters/page';
import { useGlobalContext } from '../../../../context/store';
import { useEffect } from 'react';

export default function FiltersWrapper() {
  const {
    setSelectedOperationType,
    setSelectedPropertyType,
    setSelectedLocation,
    setSelectedRoomsQuantity,
    setOrderBy,
  } = useGlobalContext();

  useEffect(() => {
    setSelectedOperationType('');
    setSelectedPropertyType('');
    setSelectedLocation('');
    setSelectedRoomsQuantity('');
    setOrderBy('');
  }, []);

  return (
    <Filters
      setSelectedOperationType={setSelectedOperationType}
      setSelectedPropertyType={setSelectedPropertyType}
      setSelectedLocation={setSelectedLocation}
      setSelectedRoomsQuantity={setSelectedRoomsQuantity}
      setOrderBy={setOrderBy}
    />
  );
}
