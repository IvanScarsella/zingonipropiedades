'use client'

import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import client from "@/src/sanity/lib/client";
import { useEffect, useState } from "react";

const builder = imageUrlBuilder(client);

export default function PropertyMainData(prop) {

   const property = prop.prop;

   const [mainImage, setMainImage] = useState('')

   const [images, setImages] = useState([])

   useEffect(() => {
      setMainImage(property.mainImage)
      let allImages = []
      allImages.push(property.mainImage)
      property.images.forEach((img) => {
         allImages.push(img)
      })
      setImages(allImages)
   }, [property])

   return (
      <div className="flex flex-col items-center">
         {property && mainImage ? (
            <Image
               className="rounded-lg"
               src={builder.image(mainImage).width(1000).height(1000).url()}
               alt="property image"
               width={400}
               height={400}
            />
         ) : null}
         <h1 className="text-2xl">{property?.name}</h1>
         {property && property.price ?
            <h2 className={`text-xl ${property?.currency === 'Pesos' ? 'text-blue-600' : 'text-green-600'}`}>
               Valor: {property?.currency === 'Pesos' ? `$ ${property?.price}` : `U$D ${property?.price}` ? property?.price === 0 : 'Consulte'}
            </h2>
            :
            <h2 className={`text-2xl text-green-600`}>
               Consulte
            </h2>
         }
         <h2 className="text-xl">{property?.operationType?.replace(/_/g, " ")}</h2>

         <div className="flex flex-wrap justify-center max-w-4xl gap-2">
            {images &&
               images.map((image, index) => (
                  <Image
                     key={index}
                     src={builder.image(image).width(1000).height(1000).url()}
                     alt="property image"
                     width={100}
                     height={100}
                     className="cursor-pointer"
                     onClick={() => setMainImage(image)}
                  />
               ))}
         </div>
      </div>
   )

}