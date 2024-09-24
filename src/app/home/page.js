'use client';

import PropertiesContainer from '../components/propertiesContainer/page';
import FiltersWrapper from '../components/filtersWrapper/page';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/context/store';
import { useEffect } from 'react';

export default function Home() {
  const { setSelectedOperationType } = useGlobalContext();
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (query) {
      if (query.type === 'Venta') {
        setSelectedOperationType('Venta');
      } else if (query.type === 'Alquiler') {
        setSelectedOperationType('Alquiler');
      }
    }
  }, [query]);

  return (
    <div>
      <div className='flex flex-row max-sm:flex-col items-start justify-between p-4 lg:p-8 gap-4 mt-32'>
        <FiltersWrapper />
        <PropertiesContainer />
      </div>
    </div>
  );
}
