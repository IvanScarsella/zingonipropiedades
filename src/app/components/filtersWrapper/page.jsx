// Nuevo componente "FiltersWrapper" que maneja el estado y usa "Filters"
import Filters from '../filters/page'
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