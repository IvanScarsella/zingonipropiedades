"use client";

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import styles from './carousel.module.css';

function FeaturedPropertiesCarousel({ properties }) {
    const router = useRouter();

    const propertiesChunks = []; // Divide las propiedades en grupos de tres
    for (let i = 0; i < properties.length; i += 3) {
        propertiesChunks.push(properties.slice(i, i + 3));
    }

    return (
        <Carousel infiniteLoop autoPlay >
            {propertiesChunks.length ?
            propertiesChunks.map((chunk, index) => (
                <div key={index} className={styles.carousel}>
                    {chunk.map((property) => (
                        <div key={property.id} className={styles.propertyContainer} onClick={() => router.push(`/${property.id}`)}>
                            <Image
                                src={property.mainImage || property.images[0]}
                                key={property.mainImage}
                                alt="property image"
                                width="200"
                                height="200"
                                className={styles.propertyImage}
                                />
                            <div>
                                <h3>{property.name}</h3>
                                <h4 className={styles.price}>
                                    {property.currency === 'Pesos' ? '$' : 'U$D'} {property.price}
                                </h4>
                                {property.description ? (
                                    <h5 className={styles.propertyInfo}>{property.description}</h5>
                                    ) : (
                                        <h5 className={styles.propertyInfo}>descripción</h5>
                                        )}
                            </div>
                        </div>
                    ))}
                </div>
            )) : (
                <p>Cargando propiedadess...</p>
              )}
        </Carousel>
    );
}

export default FeaturedPropertiesCarousel;
