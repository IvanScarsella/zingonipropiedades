"use client"

import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../../../context/store";
import styles from "./propertiesContainer.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

function PropertiesContainer() {
  const { properties, setProperties } = useGlobalContext();
  const [pages, setPages] = useState(1);
  const [renderizedProperties, setRenderizedProperties] = useState(properties);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const propertiesPerPage = 10;

  useEffect(() => {
    if (properties) {
      const totalPages = Math.ceil(properties.length / propertiesPerPage);
      setPages(totalPages);
      setRenderizedProperties(properties.slice(0, 10));
      setLoading(false);
    }
  }, [properties]);

  const changePage = (e) => {
    setLoading(true);
    const pageNumber = parseInt(e.target.value);
    const startIndex = (pageNumber - 1) * propertiesPerPage;
    const endIndex = startIndex + propertiesPerPage;
    const currentProperties = properties.slice(startIndex, endIndex);
    setRenderizedProperties(currentProperties);
    setLoading(false);
  };

  const toggleDescription = (propertyId) => {
    const updatedProperties = renderizedProperties.map((property) => {
      if (property.id === propertyId) {
        property.showFullDescription = !property.showFullDescription;
      }
      return property;
    });
    setRenderizedProperties(updatedProperties);
  };

  return (
    <div className={styles.propertiesContainer}>
      {loading ? (
        <div className={styles.loading}></div>
      ) : (
        <>
          {renderizedProperties.map((property) => (
            <div
              key={property.id}
              className={styles.propertyContainer}
            >
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
                  {property.currency === "Pesos" ? "$" : "U$D"} {property.price}
                </h4>
                {property.description && (
                  <div className={styles.descriptionContainer}>
                    {property.description.length > 250 ? (
                      property.showFullDescription ? (
                        <p className={styles.propertyInfo}>
                          {property.description}
                        </p>
                      ) : (
                        <p className={styles.propertyInfo}>
                          {property.description.slice(0, 250)}...
                          <button
                            onClick={() => toggleDescription(property.id)}
                            className={styles.showMoreButton}
                          >
                            Ver más
                          </button>
                        </p>
                      )
                    ) : (
                      <p className={styles.propertyInfo}>
                        {property.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className={styles.buttonContainer}>
            {Array.from({ length: pages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  value={pageNumber}
                  onClick={changePage}
                  className={styles.button}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default PropertiesContainer;
