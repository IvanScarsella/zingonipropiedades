'use client';

import NavBar from '../components/navbar/page';
import Header from '../components/header/page';
import PropertiesContainer from '../components/propertiesContainer/page';
import Filters from '../components/filters/page';
import { useContext } from 'react';
import { GlobalContext } from '../../../context/store';
// import styles from './page.module.css';

export default function Home() {

    const {
        setSelectedOperationType,
        setSelectedPropertyType,
        setSelectedLocation,
        setSelectedRoomsQuantity,
    } = useContext(GlobalContext);

    return (
        <div >
            <Header />
            <NavBar />
            <Filters
                setSelectedOperationType={setSelectedOperationType}
                setSelectedPropertyType={setSelectedPropertyType}
                setSelectedLocation={setSelectedLocation}
                setSelectedRoomsQuantity={setSelectedRoomsQuantity}
            />
            <PropertiesContainer />
        </div>
    )
}