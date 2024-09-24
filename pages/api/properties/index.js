import { sanityFetch } from '@/src/sanity/lib/fetch';
import client from '@/src/sanity/lib/client'; // Asegúrate de tener el cliente de Sanity configurado

// El query que se utiliza para obtener las propiedades (puedes ajustarlo según tu esquema en Sanity)
const propertiesQuery = '*[_type == "property"]';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    if (Object.keys(req.body).length === 0) {
      // Realizar operación GET
      try {
        const allProperties = await sanityFetch({ query: propertiesQuery });

        return res.status(200).json(allProperties);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
      }
    } else {
      // Realizar operación POST
      const {
        name,
        price,
        currency,
        operationType,
        propertyType,
        location,
        rooms,
        bathrooms,
        area,
        measure_1,
        measure_2,
        garage,
        electricity,
        gas,
        water,
        asphalt,
        sewer,
        antiquity,
        images,
        description,
      } = req.body.form;

      const priceNumber = parseFloat(price);
      const roomsNumber = parseFloat(rooms);
      const bathroomsNumber = parseFloat(bathrooms);
      const areaNumber = parseFloat(area);
      const antiquityNumber = parseFloat(antiquity);
      const measuresString = measure_1 + 'x' + measure_2;

      const garageBoolean = garage === 'true' ? true : false;
      const electricityBoolean = electricity === 'true' ? true : false;
      const gasBoolean = gas === 'true' ? true : false;
      const waterBoolean = water === 'true' ? true : false;
      const asphaltBoolean = asphalt === 'true' ? true : false;
      const sewerBoolean = sewer === 'true' ? true : false;

      try {
        // Crear un nuevo documento en Sanity
        const newProperty = await client.create({
          _type: 'property', // Debe coincidir con el tipo en tu esquema de Sanity
          name,
          price: priceNumber,
          currency,
          operationType,
          propertyType,
          location,
          rooms: roomsNumber,
          bathrooms: bathroomsNumber,
          images,
          mainImage: images[0],
          area: areaNumber,
          measure: measuresString,
          garage: garageBoolean,
          electricity: electricityBoolean,
          gas: gasBoolean,
          water: waterBoolean,
          asphalt: asphaltBoolean,
          sewer: sewerBoolean,
          antiquity: antiquityNumber,
          description,
        });

        return res.status(201).json(newProperty);
      } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error.message });
      }
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

// // import prisma from '../../../lib/prisma';

// import { sanityFetch } from '@/sanity/lib/fetch';

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     if (Object.keys(req.body).length === 0) {
//       // Realizar operación GET
//       try {
//         const allProperties = await sanityFetch({ query: propertiesQuery });
//         console.log('allProperties');
//         return res.status(200).json(allProperties);
//       } catch (error) {
//         console.log(error);
//         return res.status(500).json({ error: error.message });
//       }
//     } else {
//       // Realizar operación POST
//       const {
//         name,
//         price,
//         currency,
//         operationType,
//         propertyType,
//         location,
//         rooms,
//         bathrooms,
//         area,
//         measure_1,
//         measure_2,
//         garage,
//         electricity,
//         gas,
//         water,
//         asphalt,
//         sewer,
//         antiquity,
//         images,
//         description,
//       } = req.body.form;

//       const priceNumber = parseFloat(price);

//       const roomsNumber = parseFloat(rooms);

//       const bathroomsNumber = parseFloat(bathrooms);

//       const areaNumber = parseFloat(area);

//       const antiquityNumber = parseFloat(antiquity);

//       const measuresString = measure_1 + 'x' + measure_2;

//       const garageBoolean = garage === 'true' ? true : false;

//       const electricityBoolean = electricity === 'true' ? true : false;

//       const gasBoolean = gas === 'true' ? true : false;

//       const waterBoolean = water === 'true' ? true : false;

//       const asphaltBoolean = asphalt === 'true' ? true : false;

//       const sewerBoolean = sewer === 'true' ? true : false;

//       try {
//         const newProperty = await prisma.property.create({
//           data: {
//             name,
//             price: priceNumber,
//             currency,
//             operationType,
//             propertyType,
//             location,
//             rooms: roomsNumber,
//             bathrooms: bathroomsNumber,
//             images,
//             mainImage: images[0],
//             area: areaNumber,
//             measure: measuresString,
//             garage: garageBoolean,
//             electricity: electricityBoolean,
//             gas: gasBoolean,
//             water: waterBoolean,
//             asphalt: asphaltBoolean,
//             sewer: sewerBoolean,
//             antiquity: antiquityNumber,
//             description,
//           },
//         });

//         return res.status(201).json(newProperty);
//       } catch (error) {
//         console.log(error);
//         return res.status(400).json({ error: error.message });
//       }
//     }
//   }
// }

// const allProperties = [
//   {
//     id: '1b1c4418-2a9b-4c67-9a87-e17a9a1a5f4a',
//     name: 'casa calle 32 y 12',
//     price: 32000,
//     operationType: 'Venta',
//     propertyType: 'Casa',
//     location: 'quilmes',
//     rooms: 3,
//     bathrooms: 2,
//     area: 150,
//     garage: true,
//     electricity: true,
//     gas: true,
//     water: true,
//     asphalt: true,
//     sewer: true,
//     antiquity: 8,
//     images: [
//       'https://i.ibb.co/wMTq3nD/Whats-App-Image-2023-08-20-at-01-40-53.jpg',
//       'https://i.ibb.co/T107C20/Whats-App-Image-2023-08-20-at-01-40-52-2.jpg',
//       'https://i.ibb.co/3hMRXZv/Whats-App-Image-2023-08-20-at-01-40-48-1.jpg',
//       'https://i.ibb.co/dptB4KN/Whats-App-Image-2023-08-20-at-01-40-50.jpg',
//       'https://i.ibb.co/wzz06S8/Whats-App-Image-2023-08-20-at-01-40-52-1.jpg',
//       'https://i.ibb.co/jZSnPxN/Whats-App-Image-2023-08-20-at-01-40-51-1.jpg',
//       'https://i.ibb.co/kDny0dm/Whats-App-Image-2023-08-20-at-01-40-51.jpg',
//       'https://i.ibb.co/6R3xq9y/Whats-App-Image-2023-08-20-at-01-40-50-2.jpg',
//       'https://i.ibb.co/hZzVrSX/Whats-App-Image-2023-08-20-at-01-40-45.jpg',
//       'https://i.ibb.co/sKfNRNX/Whats-App-Image-2023-08-20-at-01-40-48.jpg',
//       'https://i.ibb.co/4RVGk5j/Whats-App-Image-2023-08-20-at-01-40-50-1.jpg',
//       'https://i.ibb.co/kDny0dm/Whats-App-Image-2023-08-20-at-01-40-51.jpg',
//       'https://i.ibb.co/j5sqtB9/tarjeta-01-1.jpg',
//     ],
//     mainImage:
//       'https://i.ibb.co/wMTq3nD/Whats-App-Image-2023-08-20-at-01-40-53.jpg',
//     currency: 'Dolares',
//     description:
//       'Casa moderna con acabados de lujo, incluye piscina y amplio jardín.',
//     measure: '12x40',
//     featured: true,
//     lat: -34.921458,
//     lng: -57.95458,
//   },
//   {
//     id: '2e9b452a-9c88-432e-8a58-9b7a1c9a5f3b',
//     name: 'casa calle 50 y 120',
//     price: 45000,
//     operationType: 'Alquiler',
//     propertyType: 'Departamento',
//     location: 'berisso',
//     rooms: 4,
//     bathrooms: 3,
//     area: 200,
//     garage: true,
//     electricity: true,
//     gas: true,
//     water: true,
//     asphalt: false,
//     sewer: true,
//     antiquity: 5,
//     images: [
//       'https://i.ibb.co/wMTq3nD/Whats-App-Image-2023-08-20-at-01-40-53.jpg',
//       'https://i.ibb.co/T107C20/Whats-App-Image-2023-08-20-at-01-40-52-2.jpg',
//       'https://i.ibb.co/3hMRXZv/Whats-App-Image-2023-08-20-at-01-40-48-1.jpg',
//       'https://i.ibb.co/dptB4KN/Whats-App-Image-2023-08-20-at-01-40-50.jpg',
//       'https://i.ibb.co/wzz06S8/Whats-App-Image-2023-08-20-at-01-40-52-1.jpg',
//       'https://i.ibb.co/jZSnPxN/Whats-App-Image-2023-08-20-at-01-40-51-1.jpg',
//       'https://i.ibb.co/kDny0dm/Whats-App-Image-2023-08-20-at-01-40-51.jpg',
//       'https://i.ibb.co/6R3xq9y/Whats-App-Image-2023-08-20-at-01-40-50-2.jpg',
//       'https://i.ibb.co/hZzVrSX/Whats-App-Image-2023-08-20-at-01-40-45.jpg',
//       'https://i.ibb.co/sKfNRNX/Whats-App-Image-2023-08-20-at-01-40-48.jpg',
//       'https://i.ibb.co/4RVGk5j/Whats-App-Image-2023-08-20-at-01-40-50-1.jpg',
//       'https://i.ibb.co/kDny0dm/Whats-App-Image-2023-08-20-at-01-40-51.jpg',
//       'https://i.ibb.co/j5sqtB9/tarjeta-01-1.jpg',
//     ],
//     mainImage:
//       'https://i.ibb.co/wMTq3nD/Whats-App-Image-2023-08-20-at-01-40-53.jpg',
//     currency: 'Pesos',
//     description: 'Departamento céntrico con balcón y vista panorámica.',
//     measure: '15x30',
//     featured: false,
//     lat: -34.924852,
//     lng: -57.956789,
//   },
//   {
//     id: '3d4e5b6c-4a7d-4e23-9c66-8a5d9c1a3e4c',
//     name: 'casa calle 60 y 23',
//     price: 38000,
//     operationType: 'Venta',
//     propertyType: 'Casa',
//     location: 'en-senada',
//     rooms: 2,
//     bathrooms: 1,
//     area: 100,
//     garage: false,
//     electricity: true,
//     gas: false,
//     water: true,
//     asphalt: true,
//     sewer: false,
//     antiquity: 10,
//     images: [
//       'https://i.ibb.co/wMTq3nD/Whats-App-Image-2023-08-20-at-01-40-53.jpg',
//       'https://i.ibb.co/T107C20/Whats-App-Image-2023-08-20-at-01-40-52-2.jpg',
//       'https://i.ibb.co/3hMRXZv/Whats-App-Image-2023-08-20-at-01-40-48-1.jpg',
//       'https://i.ibb.co/dptB4KN/Whats-App-Image-2023-08-20-at-01-40-50.jpg',
//       'https://i.ibb.co/wzz06S8/Whats-App-Image-2023-08-20-at-01-40-52-1.jpg',
//       'https://i.ibb.co/jZSnPxN/Whats-App-Image-2023-08-20-at-01-40-51-1.jpg',
//       'https://i.ibb.co/kDny0dm/Whats-App-Image-2023-08-20-at-01-40-51.jpg',
//       'https://i.ibb.co/6R3xq9y/Whats-App-Image-2023-08-20-at-01-40-50-2.jpg',
//       'https://i.ibb.co/hZzVrSX/Whats-App-Image-2023-08-20-at-01-40-45.jpg',
//       'https://i.ibb.co/sKfNRNX/Whats-App-Image-2023-08-20-at-01-40-48.jpg',
//       'https://i.ibb.co/4RVGk5j/Whats-App-Image-2023-08-20-at-01-40-50-1.jpg',
//       'https://i.ibb.co/kDny0dm/Whats-App-Image-2023-08-20-at-01-40-51.jpg',
//       'https://i.ibb.co/j5sqtB9/tarjeta-01-1.jpg',
//     ],
//     mainImage:
//       'https://i.ibb.co/wMTq3nD/Whats-App-Image-2023-08-20-at-01-40-53.jpg',
//     currency: 'Dolares',
//     description: 'Casa acogedora con jardín y patio trasero.',
//     measure: '8x20',
//     featured: true,
//     lat: -34.928123,
//     lng: -57.953456,
//   },
//   {
//     id: '4e5f6a7b-9c6d-4e32-8b57-9d8a5c2a3d5e',
//     name: 'casa calle 45 y 28',
//     price: 27000,
//     operationType: 'Alquiler',
//     propertyType: 'Departamento',
//     location: 'tolosa',
//     rooms: 1,
//     bathrooms: 1,
//     area: 80,
//     garage: true,
//     electricity: false,
//     gas: true,
//     water: false,
//     asphalt: true,
//     sewer: true,
//     antiquity: 6,
//     images: [
//       'https://i.ibb.co/wMTq3nD/Whats-App-Image-2023-08-20-at-01-40-53.jpg',
//       'https://i.ibb.co/T107C20/Whats-App-Image-2023-08-20-at-01-40-52-2.jpg',
//       'https://i.ibb.co/3hMRXZv/Whats-App-Image-2023-08-20-at-01-40-48-1.jpg',
//       'https://i.ibb.co/dptB4KN/Whats-App-Image-2023-08-20-at-01-40-50.jpg',
//       'https://i.ibb.co/wzz06S8/Whats-App-Image-2023-08-20-at-01-40-52-1.jpg',
//       'https://i.ibb.co/jZSnPxN/Whats-App-Image-2023-08-20-at-01-40-51-1.jpg',
//       'https://i.ibb.co/kDny0dm/Whats-App-Image-2023-08-20-at-01-40-51.jpg',
//       'https://i.ibb.co/6R3xq9y/Whats-App-Image-2023-08-20-at-01-40-50-2.jpg',
//       'https://i.ibb.co/hZzVrSX/Whats-App-Image-2023-08-20-at-01-40-45.jpg',
//       'https://i.ibb.co/sKfNRNX/Whats-App-Image-2023-08-20-at-01-40-48.jpg',
//       'https://i.ibb.co/4RVGk5j/Whats-App-Image-2023-08-20-at-01-40-50-1.jpg',
//       'https://i.ibb.co/kDny0dm/Whats-App-Image-2023-08-20-at-01-40-51.jpg',
//       'https://i.ibb.co/j5sqtB9/tarjeta-01-1.jpg',
//     ],
//     mainImage:
//       'https://i.ibb.co/wMTq3nD/Whats-App-Image-2023-08-20-at-01-40-53.jpg',
//     currency: 'Pesos',
//     description:
//       'Departamento compacto y funcional, ideal para parejas jóvenes.',
//     measure: '10x20',
//     featured: false,
//     lat: -34.929876,
//     lng: -57.955789,
//   },
//   {
//     id: '5a6b7c8d-1d2e-3e34-9d76-8e9a1b4a3d6e',
//     name: 'casa calle 72 y 7',
//     price: 52000,
//     operationType: 'Venta',
//     propertyType: 'Casa',
//     location: 'gonnet',
//     rooms: 5,
//     bathrooms: 3,
//     area: 250,
//     garage: true,
//     electricity: true,
//     gas: true,
//     water: true,
//     asphalt: true,
//     sewer: true,
//     antiquity: 15,
//     images: [
//       'https://i.ibb.co/wMTq3nD/Whats-App-Image-2023-08-20-at-01-40-53.jpg',
//       'https://i.ibb.co/T107C20/Whats-App-Image-2023-08-20-at-01-40-52-2.jpg',
//       'https://i.ibb.co/3hMRXZv/Whats-App-Image-2023-08-20-at-01-40-48-1.jpg',
//       'https://i.ibb.co/dptB4KN/Whats-App-Image-2023-08-20-at-01-40-50.jpg',
//       'https://i.ibb.co/wzz06S8/Whats-App-Image-2023-08-20-at-01-40-52-1.jpg',
//       'https://i.ibb.co/jZSnPxN/Whats-App-Image-2023-08-20-at-01-40-51-1.jpg',
//       'https://i.ibb.co/kDny0dm/Whats-App-Image-2023-08-20-at-01-40-51.jpg',
//       'https://i.ibb.co/6R3xq9y/Whats-App-Image-2023-08-20-at-01-40-50-2.jpg',
//       'https://i.ibb.co/hZzVrSX/Whats-App-Image-2023-08-20-at-01-40-45.jpg',
//       'https://i.ibb.co/sKfNRNX/Whats-App-Image-2023-08-20-at-01-40-48.jpg',
//       'https://i.ibb.co/4RVGk5j/Whats-App-Image-2023-08-20-at-01-40-50-1.jpg',
//       'https://i.ibb.co/kDny0dm/Whats-App-Image-2023-08-20-at-01-40-51.jpg',
//       'https://i.ibb.co/j5sqtB9/tarjeta-01-1.jpg',
//     ],
//     mainImage:
//       'https://i.ibb.co/wMTq3nD/Whats-App-Image-2023-08-20-at-01-40-53.jpg',
//     currency: 'Dolares',
//     description: 'Amplia casa familiar con jardín y piscina.',
//     measure: '20x40',
//     featured: true,
//     lat: -34.933457,
//     lng: -57.951234,
//   },
//   {
//     id: '6b7c8d9e-2e3d-4c45-8e67-8b1a2d5a3e7e',
//     name: 'casa calle 80 y 17',
//     price: 30000,
//     operationType: 'Venta',
//     propertyType: 'Departamento',
//     location: 'villa-elisa',
//     rooms: 3,
//     bathrooms: 2,
//     area: 130,
//     garage: true,
//     electricity: true,
//     gas: true,
//     water: true,
//     asphalt: true,
//     sewer: false,
//     antiquity: 7,
//     images: [
//       'https://i.ibb.co/wMTq3nD/Whats-App-Image-2023-08-20-at-01-40-53.jpg',
//       'https://i.ibb.co/T107C20/Whats-App-Image-2023-08-20-at-01-40-52-2.jpg',
//       'https://i.ibb.co/3hMRXZv/Whats-App-Image-2023-08-20-at-01-40-48-1.jpg',
//       'https://i.ibb.co/dptB4KN/Whats-App-Image-2023-08-20-at-01-40-50.jpg',
//       'https://i.ibb.co/wzz06S8/Whats-App-Image-2023-08-20-at-01-40-52-1.jpg',
//       'https://i.ibb.co/jZSnPxN/Whats-App-Image-2023-08-20-at-01-40-51-1.jpg',
//       'https://i.ibb.co/kDny0dm/Whats-App-Image-2023-08-20-at-01-40-51.jpg',
//       'https://i.ibb.co/6R3xq9y/Whats-App-Image-2023-08-20-at-01-40-50-2.jpg',
//       'https://i.ibb.co/hZzVrSX/Whats-App-Image-2023-08-20-at-01-40-45.jpg',
//       'https://i.ibb.co/sKfNRNX/Whats-App-Image-2023-08-20-at-01-40-48.jpg',
//       'https://i.ibb.co/4RVGk5j/Whats-App-Image-2023-08-20-at-01-40-50-1.jpg',
//       'https://i.ibb.co/kDny0dm/Whats-App-Image-2023-08-20-at-01-40-51.jpg',
//       'https://i.ibb.co/j5sqtB9/tarjeta-01-1.jpg',
//     ],
//     mainImage:
//       'https://i.ibb.co/wMTq3nD/Whats-App-Image-2023-08-20-at-01-40-53.jpg',
//     currency: 'Pesos',
//     description: 'Departamento luminoso con balcón y vistas al parque.',
//     measure: '15x35',
//     featured: false,
//     lat: -34.934567,
//     lng: -57.950345,
//   },
//   {
//     id: '7c8d9e1f-3e4d-5c56-9f78-8d2a3e4a5f8e',
//     name: 'casa calle 90 y 25',
//     price: 40000,
//     operationType: 'Alquiler',
//     propertyType: 'Casa',
//     location: 'city-bell',
//     rooms: 4,
//     bathrooms: 3,
//     area: 180,
//     garage: true,
//     electricity: false,
//     gas: false,
//     water: true,
//     asphalt: true,
//     sewer: true,
//     antiquity: 9,
//     images: [
//       'https://i.ibb.co/wMTq3nD/Whats-App-Image-2023-08-20-at-01-40-53.jpg',
//       'https://i.ibb.co/T107C20/Whats-App-Image-2023-08-20-at-01-40-52-2.jpg',
//       'https://i.ibb.co/3hMRXZv/Whats-App-Image-2023-08-20-at-01-40-48-1.jpg',
//       'https://i.ibb.co/dptB4KN/Whats-App-Image-2023-08-20-at-01-40-50.jpg',
//       'https://i.ibb.co/wzz06S8/Whats-App-Image-2023-08-20-at-01-40-52-1.jpg',
//       'https://i.ibb.co/jZSnPxN/Whats-App-Image-2023-08-20-at-01-40-51-1.jpg',
//       'https://i.ibb.co/kDny0dm/Whats-App-Image-2023-08-20-at-01-40-51.jpg',
//       'https://i.ibb.co/6R3xq9y/Whats-App-Image-2023-08-20-at-01-40-50-2.jpg',
//       'https://i.ibb.co/hZzVrSX/Whats-App-Image-2023-08-20-at-01-40-45.jpg',
//       'https://i.ibb.co/sKfNRNX/Whats-App-Image-2023-08-20-at-01-40-48.jpg',
//       'https://i.ibb.co/4RVGk5j/Whats-App-Image-2023-08-20-at-01-40-50-1.jpg',
//       'https://i.ibb.co/kDny0dm/Whats-App-Image-2023-08-20-at-01-40-51.jpg',
//       'https://i.ibb.co/j5sqtB9/tarjeta-01-1.jpg',
//     ],
//     mainImage:
//       'https://i.ibb.co/wMTq3nD/Whats-App-Image-2023-08-20-at-01-40-53.jpg',
//     currency: 'Dolares',
//     description:
//       'Casa de lujo con piscina y jardín, ubicada en zona exclusiva.',
//     measure: '18x30',
//     featured: true,
//     lat: -34.936789,
//     lng: -57.949876,
//   },
//   {
//     id: '8d9e1f2g-4f5d-6c67-9g89-8e3a4f5a6g9e',
//     name: 'casa calle 100 y 33',
//     price: 35000,
//     operationType: 'Venta',
//     propertyType: 'Casa',
//     location: 'ringuelet',
//     rooms: 2,
//     bathrooms: 2,
//     area: 120,
//     garage: false,
//     electricity: true,
//     gas: true,
//     water: true,
//     asphalt: false,
//     sewer: false,
//     antiquity: 12,
//     images: [
//       'https://i.ibb.co/wMTq3nD/Whats-App-Image-2023-08-20-at-01-40-53.jpg',
//       'https://i.ibb.co/T107C20/Whats-App-Image-2023-08-20-at-01-40-52-2.jpg',
//       'https://i.ibb.co/3hMRXZv/Whats-App-Image-2023-08-20-at-01-40-48-1.jpg',
//       'https://i.ibb.co/dptB4KN/Whats-App-Image-2023-08-20-at-01-40-50.jpg',
//       'https://i.ibb.co/wzz06S8/Whats-App-Image-2023-08-20-at-01-40-52-1.jpg',
//       'https://i.ibb.co/jZSnPxN/Whats-App-Image-2023-08-20-at-01-40-51-1.jpg',
//       'https://i.ibb.co/kDny0dm/Whats-App-Image-2023-08-20-at-01-40-51.jpg',
//       'https://i.ibb.co/6R3xq9y/Whats-App-Image-2023-08-20-at-01-40-50-2.jpg',
//       'https://i.ibb.co/hZzVrSX/Whats-App-Image-2023-08-20-at-01-40-45.jpg',
//       'https://i.ibb.co/sKfNRNX/Whats-App-Image-2023-08-20-at-01-40-48.jpg',
//       'https://i.ibb.co/4RVGk5j/Whats-App-Image-2023-08-20-at-01-40-50-1.jpg',
//       'https://i.ibb.co/kDny0dm/Whats-App-Image-2023-08-20-at-01-40-51.jpg',
//       'https://i.ibb.co/j5sqtB9/tarjeta-01-1.jpg',
//     ],
//     mainImage:
//       'https://i.ibb.co/wMTq3nD/Whats-App-Image-2023-08-20-at-01-40-53.jpg',
//     currency: 'Dolares',
//     description:
//       'Casa de 2 plantas con detalles de exterior a terminar.',
//     measure: '10x35',
//     featured: false,
//     lat: -34.93789,
//     lng: -57.948567,
//   },
//   {
//     id: '9e1f2g3h-5g6d-7c78-0h90-8f4a5g6h7i0e',
//     name: 'casa calle 110 y 37',
//     price: 46000,
//     operationType: 'Venta',
//     propertyType: 'Departamento',
//     location: 'tolosa',
//     rooms: 3,
//     bathrooms: 1,
//     area: 110,
//     garage: true,
//     electricity: true,
//     gas: true,
//     water: true,
//     asphalt: true,
//     sewer: false,
//     antiquity: 8,
//     images: [
//       'https://i.ibb.co/wMTq3nD/Whats-App-Image-2023-08-20-at-01-40-53.jpg',
//       'https://i.ibb.co/T107C20/Whats-App-Image-2023-08-20-at-01-40-52-2.jpg',
//       'https://i.ibb.co/3hMRXZv/Whats-App-Image-2023-08-20-at-01-40-48-1.jpg',
//       'https://i.ibb.co/dptB4KN/Whats-App-Image-2023-08-20-at-01-40-50.jpg',
//       'https://i.ibb.co/wzz06S8/Whats-App-Image-2023-08-20-at-01-40-52-1.jpg',
//       'https://i.ibb.co/jZSnPxN/Whats-App-Image-2023-08-20-at-01-40-51-1.jpg',
//       'https://i.ibb.co/kDny0dm/Whats-App-Image-2023-08-20-at-01-40-51.jpg',
//       'https://i.ibb.co/6R3xq9y/Whats-App-Image-2023-08-20-at-01-40-50-2.jpg',
//       'https://i.ibb.co/hZzVrSX/Whats-App-Image-2023-08-20-at-01-40-45.jpg',
//       'https://i.ibb.co/sKfNRNX/Whats-App-Image-2023-08-20-at-01-40-48.jpg',
//       'https://i.ibb.co/4RVGk5j/Whats-App-Image-2023-08-20-at-01-40-50-1.jpg',
//       'https://i.ibb.co/kDny0dm/Whats-App-Image-2023-08-20-at-01-40-51.jpg',
//       'https://i.ibb.co/j5sqtB9/tarjeta-01-1.jpg',
//     ],
//     mainImage:
//       'https://i.ibb.co/wMTq3nD/Whats-App-Image-2023-08-20-at-01-40-53.jpg',
//     currency: 'Dolares',
//     description: 'Departamento moderno con balcón y garage.',
//     measure: '14x20',
//     featured: false,
//     lat: -34.939012,
//     lng: -57.947123,
//   },
//   {
//     id: '1f2g3h4i-6h7d-8c89-0i01-8g5a6h7i8j1e',
//     name: 'casa calle 120 y 41',
//     price: 25000,
//     operationType: 'Alquiler',
//     propertyType: 'Casa',
//     location: 'gonnet',
//     rooms: 1,
//     bathrooms: 1,
//     area: 90,
//     garage: false,
//     electricity: true,
//     gas: false,
//     water: true,
//     asphalt: false,
//     sewer: true,
//     antiquity: 3,
//     images: [
//       'https://i.ibb.co/wMTq3nD/Whats-App-Image-2023-08-20-at-01-40-53.jpg',
//       'https://i.ibb.co/T107C20/Whats-App-Image-2023-08-20-at-01-40-52-2.jpg',
//       'https://i.ibb.co/3hMRXZv/Whats-App-Image-2023-08-20-at-01-40-48-1.jpg',
//       'https://i.ibb.co/dptB4KN/Whats-App-Image-2023-08-20-at-01-40-50.jpg',
//       'https://i.ibb.co/wzz06S8/Whats-App-Image-2023-08-20-at-01-40-52-1.jpg',
//       'https://i.ibb.co/jZSnPxN/Whats-App-Image-2023-08-20-at-01-40-51-1.jpg',
//       'https://i.ibb.co/kDny0dm/Whats-App-Image-2023-08-20-at-01-40-51.jpg',
//       'https://i.ibb.co/6R3xq9y/Whats-App-Image-2023-08-20-at-01-40-50-2.jpg',
//       'https://i.ibb.co/hZzVrSX/Whats-App-Image-2023-08-20-at-01-40-45.jpg',
//       'https://i.ibb.co/sKfNRNX/Whats-App-Image-2023-08-20-at-01-40-48.jpg',
//       'https://i.ibb.co/4RVGk5j/Whats-App-Image-2023-08-20-at-01-40-50-1.jpg',
//       'https://i.ibb.co/kDny0dm/Whats-App-Image-2023-08-20-at-01-40-51.jpg',
//       'https://i.ibb.co/j5sqtB9/tarjeta-01-1.jpg',
//     ],
//     mainImage:
//       'https://i.ibb.co/wMTq3nD/Whats-App-Image-2023-08-20-at-01-40-53.jpg',
//     currency: 'Pesos',
//     description:
//       'Pequeña casa con jardín, perfecta para una persona o pareja.',
//     measure: '12x25',
//     featured: false,
//     lat: -34.940123,
//     lng: -57.946789,
//   },
// ];
// DESCOMENTAR LINEA DE ABAJO Y BORRAR LO DE ARRIBA
// const allProperties = await prisma.property.findMany();
