"use client";

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import styles from './carousel.module.css';
import { useGlobalContext } from "../../../../context/store";
import { useEffect, useState } from 'react';

function FeaturedPropertiesCarousel(
    { properties }
) {
    const router = useRouter();

    const propertiesChunks = properties;

    return (
        <Carousel infiniteLoop autoPlay showThumbs={false} interval={3000} >
               { propertiesChunks.map((chunk, index) => (
                    <div key={index} className={styles.carousel}>
                        {chunk.map((property) => (
                            <div key={property.id} className={styles.propertyContainer} onClick={() => router.push(`/property/${property.id}`)}>
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
                                    <h4>
                                        {property.operationType}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                )) 
                }
        </Carousel>
    );
}

export default FeaturedPropertiesCarousel;
