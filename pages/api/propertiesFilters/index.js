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

    
    let properties = await prisma.property.findMany({
        where
    })
    console.log(where)
    if(where.operationType.equals === "Alquiler"){
        const rentProperties = await prisma.property.findMany({
            where:{
                operationType: "Alquiler_Temporario"
            }
        })
        for(let i = 0; i<rentProperties.length; i++){
            properties.push(rentProperties[i])
        }
    }

    return properties
}