'use client';

import Header from '../components/header/page';
import Footer from '../components/footer/page';
import WhatsApp from '../components/whatsapp/page';
import PropertiesContainer from '../components/propertiesContainer/page';
import FiltersWrapper from '../components/filtersWrapper/page';
import Background from '../components/background/page';
import styles from './home.module.css';


export default function Home() {
  return (
    <div>
      <Header />
      <div className={styles.filtersAndProperties}>
        <FiltersWrapper /> {/* Usa el nuevo componente que envuelve "Filters" */}
        <PropertiesContainer />
      </div>
      <Footer />
      <WhatsApp />
      {/* <Background /> */}
    </div>
  );
}