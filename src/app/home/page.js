'use client';

import NavBar from '../components/navbar/page';
import Header from '../components/header/page';
import Footer from '../components/footer/page';
import WhatsApp from '../components/whatsapp/page';
import PropertiesContainer from '../components/propertiesContainer/page';
// import FiltersWrapper from '../components/filtersWrapper'; // Importa el nuevo componente
import FiltersWrapper from '../components/filtersWrapper/page';
// import styles from './page.module.css';


export default function Home() {
  return (
    <div>
      <Header />
      {/* <NavBar /> */}
      <FiltersWrapper /> {/* Usa el nuevo componente que envuelve "Filters" */}
      <PropertiesContainer />
      <Footer />
      <WhatsApp />
    </div>
  );
}