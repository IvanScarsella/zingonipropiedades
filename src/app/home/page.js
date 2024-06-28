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
  const { setSelectedOperationType } = useGlobalContext();

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (query) {
      if (query.type === 'Venta') {
        setSelectedOperationType('Venta');
      } else if (query.type === 'Alquiler') {
      } else {
        setSelectedOperationType('Alquiler');
      }
    }
  }, [query]);

  return (
    <div>
      <Header />
      <div
        className='flex flex-row max-sm:flex-col max:sm items-center'
        //  className={styles.filtersAndProperties}
      >
        <FiltersWrapper />
        <PropertiesContainer />
      </div>
      <Footer />
      <WhatsApp />
    </div>
  );
}
