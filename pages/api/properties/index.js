import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    if (req.method === "POST") {
        if (Object.keys(req.body).length === 0) {
            // Realizar operación GET
            try {
                const allProperties = await prisma.property.findMany();
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
                description
            } = req.body.form;

            console.log(req.body.form);

            const priceNumber = parseFloat(price)

            const roomsNumber = parseFloat(rooms)

            const bathroomsNumber = parseFloat(bathrooms)

            const areaNumber = parseFloat(area)

            const antiquityNumber = parseFloat(antiquity);

            const measuresString = measure_1 + 'x' + measure_2;

            const garageBoolean = garage === "true" ? true : false;

            const electricityBoolean = electricity === "true" ? true : false;

            const gasBoolean = gas === "true" ? true : false;

            const waterBoolean = water === "true" ? true : false;

            const asphaltBoolean = asphalt === "true" ? true : false;

            const sewerBoolean = sewer === "true" ? true : false;

            try {
                const newProperty = await prisma.property.create({
                    data: {
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
                    }
                });

                return res.status(201).json(newProperty);
            } catch (error) {
                console.log(error);
                return res.status(400).json({ error: error.message });
            }
        }
    }
}