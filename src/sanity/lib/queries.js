import { groq } from 'next-sanity';

export const propertiesQuery = groq`*[_type == "property"]`;

export const propertyQuery = groq`*[_type == "property" && slug.current == $slug][0]{ name, description, images, location, _type, antiquity, area, electricity, currency, lng, asphalt, water, measure, gas, operationType, slug, garage, rooms, propertyType, lat, price, sewer, bathrooms, mainImage }`;

export const propertyPathsQuery = groq`*[_type == "property" && defined(slug.current)][]{
   "params": {"slug":slug.current}
   }`;

// export const productQuery = groq`*[_type == "product" && slug.current == $slug][0]{
// name, price, description, image, stock, slug, category, subCategory, milliliters, year, cellar, region, varietal, fermentationTime, type, organic, oak, stock
// }`

// export const productPathsQuery = groq`*[_type == "product" && defined(slug.current)][]{
// "params": {"slug":slug.current}
// }`
