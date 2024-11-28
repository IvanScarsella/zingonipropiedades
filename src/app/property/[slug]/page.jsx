// "use client";

import Image from "next/image";
import GoogleMap from "../../components/maps/page";
import PropertyMainData from "../../components/propertyMainData/page";

import rooms_logo from "../../../../public/rooms_logo.png";
import bathrooms_logo from "../../../../public/bathrooms_logo.png";
import area_logo from "../../../../public/area_logo.png";
import measure_logo from "../../../../public/measure_logo.png";
import garage_logo from "../../../../public/garage_logo.png";
import electricity_logo from "../../../../public/electricity_logo.png";
import gas_logo from "../../../../public/gas_logo.png";
import water_logo from "../../../../public/water_logo.png";
import asphalt_logo from "../../../../public/asphalt_logo.png";
import sewer_logo from "../../../../public/sewer_logo.png";
import antiquity_logo from "../../../../public/antiquity_logo.png";
import location_logo from "../../../../public/location_logo.png";
import MailForm from "../../components/mailForm/page";
import { sanityFetch } from "@/src/sanity/lib/fetch";
import { propertyQuery } from "@/src/sanity/lib/queries";
import imageUrlBuilder from "@sanity/image-url";
import client from "@/src/sanity/lib/client";

const builder = imageUrlBuilder(client);

async function PropertyByID({ params }) {
    const { slug } = params;

    const property = await sanityFetch({
        query: propertyQuery,
        params: { slug },
    });

    return (
        <>
            <div className="flex flex-col items-center border bg-white/70 p-4 mt-32">
                <PropertyMainData prop={property} />
                {/* {property && property.mainImage ? (
                    <Image
                        className="rounded-lg"
                        src={builder.image(property.mainImage).width(1000).height(1000).url()}
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
                    {property?.images &&
                        property?.images.map((image) => (
                            <Image
                                key={image}
                                src={builder.image(image).width(1000).height(1000).url()}
                                alt="property image"
                                width={100}
                                height={100}
                                className="cursor-pointer"
                            />
                        ))}
                </div> */}

                <h4 className="max-w-[1000px] mt-4 text-base max-sm:text-sm text-justify">{property?.description || "Descripción de la propiedad..."}</h4>

                <h2 className="text-xl mt-4">Características:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mt-4 border p-4 rounded-lg">
                    <PropertyFeature logo={location_logo} label="Ubicación" value={property?.location} />
                    {property?.rooms > 0 && <PropertyFeature logo={rooms_logo} label="Ambientes" value={property?.rooms} />}
                    {property?.bathrooms > 0 && <PropertyFeature logo={bathrooms_logo} label="Baños" value={property?.bathrooms} />}
                    <PropertyFeature logo={area_logo} label="Superficie" value={`${property?.area} m²`} />
                    {property?.measure && <PropertyFeature logo={measure_logo} label="Medidas" value={property?.measure} />}
                    <PropertyFeature logo={garage_logo} label="Garage" value={property?.garage ? "Si" : "No"} />
                    <PropertyFeature logo={electricity_logo} label="Luz" value={property?.electricity ? "Si" : "No"} />
                    <PropertyFeature logo={gas_logo} label="Gas" value={property?.gas ? "Si" : "No"} />
                    <PropertyFeature logo={water_logo} label="Agua" value={property?.water ? "Si" : "No"} />
                    <PropertyFeature logo={asphalt_logo} label="Asfalto" value={property?.asphalt ? "Si" : "No"} />
                    <PropertyFeature logo={sewer_logo} label="Cloacas" value={property?.sewer ? "Si" : "No"} />
                    {property?.antiquity > 0 && <PropertyFeature logo={antiquity_logo} label="Antigüedad" value={`${property?.antiquity} años`} />}
                </div>

                {property?.name && (
                    <GoogleMap propertyName={property?.name} lat={property?.lat} lng={property?.lng} />
                )}
                <div className="w-4/5 md:w-1/2 xl:w-2/5">
                    <MailForm id={slug} />
                </div>
            </div>
        </>
    );
}

const PropertyFeature = ({ logo, label, value }) => (
    <div className="flex items-center space-x-2">
        <Image src={logo} alt={label} width={20} height={20} />
        <h3>{`${label}: ${value}`}</h3>
    </div>
);

export default PropertyByID;
