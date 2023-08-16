import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    const paramsFilters = req.body;
    if (req.method === "POST") {
        try {
            const properties = await getProperties(paramsFilters);

            res.status(200).json(properties)
        } catch (error) {
            console.error("Error while retrieving properties: ", error);
            res.status(500).json({ error: "Error retrieving properties." });
        }
    }
}

async function getProperties(paramsFilters) {
    const { operationType, propertyType, location, rooms, orderBy } = paramsFilters.params;
    console.log(propertyType);

    let where = {};

    if (operationType) {
        if (operationType === "Alquiler Temporario") {
            where.operationType = {
                equals: "Alquiler_Temporario"
            };
        } else {
            where.operationType = {
                equals: operationType
            };
        }
    }
    if (propertyType) {
        where.propertyType = {
            equals: propertyType
        };
    }
    if (location) {
        where.location = {
            equals: location
        };
    }
    if (rooms) {
        where.rooms = {
            equals: parseInt(rooms, 10)
        };
    }

    const properties = await prisma.property.findMany({
        where
    })

    // if (orderBy) {
    //     if (orderBy === "priceLowToHigh") {
    //         return properties.sort(function (a, b) {
    //             return a.price - b.price;
    //         });
    //     }
    //     if (orderBy === "priceHighToLow") {
    //         return properties.sort(function (a, b) {
    //             return b.price - a.price;
    //         });
    //     }
    // } else {
    //     return properties.sort(function (a, b) {
    //         return a.name.localeCompare(b.name);;
    //       })
    // }

    return properties
}