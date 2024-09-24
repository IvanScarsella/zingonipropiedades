"use client";

import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../../../context/store";
import { useRouter } from "next/navigation";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import client from "@/src/sanity/lib/client";

const builder = imageUrlBuilder(client);

function PropertiesContainer() {
  const { properties } = useGlobalContext();
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

  return (
    <div className="w-full flex flex-col gap-6 py-6 items-center mt-10 bg-gray-100">
      {loading ? (
        <div className="w-12 h-12 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
      ) : (
        <>
          {renderizedProperties.map((property) => (
            <div
              key={property.id}
              className="w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white border border-gray-200 rounded-xl shadow-md p-4 sm:p-6 flex flex-col sm:flex-row items-center transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
              onClick={() => router.push(`/property/${property.slug.current}`)}
            >
              <Image
                src={property.mainImage ? builder.image(property.mainImage).width(1000).height(1000).url() : ''}
                alt="property image"
                width={200}
                height={200}
                className="rounded-lg object-cover mb-4 sm:mb-0 sm:mr-6 w-full sm:w-auto"
              />
              <div className="flex flex-col space-y-2 sm:space-y-3 w-full">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
                  {property.name}
                </h3>
                <h4 className="text-md sm:text-lg md:text-xl font-medium text-purple-600">
                  {property.currency === "Pesos" ? "$" : "U$D"} {property.price}
                </h4>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 line-clamp-3">
                  {property.description}
                </p>
              </div>
            </div>
          ))}

          <div className="flex space-x-2 sm:space-x-3 my-4">
            {Array.from({ length: pages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  value={pageNumber}
                  onClick={changePage}
                  className={`px-3 sm:px-4 py-1 sm:py-2 rounded-xl text-white ${pageNumber === pages ? "bg-purple-700" : "bg-purple-500"
                    } hover:bg-purple-600 focus:outline-none transform hover:scale-105 transition`}
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
