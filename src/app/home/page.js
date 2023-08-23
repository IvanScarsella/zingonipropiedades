'use client';

import Header from '../components/header/page';
import Footer from '../components/footer/page';
import WhatsApp from '../components/whatsapp/page';
import PropertiesContainer from '../components/propertiesContainer/page';
import FiltersWrapper from '../components/filtersWrapper/page';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/context/store';
import { useEffect } from 'react';
import styles from './home.module.css';

export default function Home() {

  const {
    setSelectedOperationType,
  } = useGlobalContext();

  const router = useRouter();
  const { query } = router;

  // console.log(router);

  useEffect(() => {
    // Lógica para aplicar el filtro según el parámetro 'type' en 'query'
    if (query) {

      if (query.type === 'Venta') {
        // Filtrar propiedades de venta
        // Por ejemplo: setFilteredProperties(allProperties.filter(property => property.type === 'venta'));
        setSelectedOperationType('Venta')
      } else if (query.type === 'Alquiler') {
        // Filtrar propiedades de alquiler
        // Por ejemplo: setFilteredProperties(allProperties.filter(property => property.type === 'alquiler'));
      } else {
        // Sin filtro, mostrar todas las propiedades
        // Por ejemplo: setFilteredProperties(allProperties);
        setSelectedOperationType('Alquiler')
      }
    }
  }, [query]);

  return (
    <div>
      <Header />
      <div className={styles.filtersAndProperties}>
        <FiltersWrapper />
        <PropertiesContainer />
      </div>
      <Footer />
      <WhatsApp />
    </div>
  );
}