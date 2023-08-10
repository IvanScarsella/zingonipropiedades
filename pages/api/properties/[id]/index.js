import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
    const { id } = req.query;
    if (req.method === "POST") {


        try {
            const property = await prisma.property.findUnique({
                where: {
                    id: id
                }
            })

            if (!property) {
                return res.status(404).json({ error: "Property not found" })
            }

            return res.status(200).json(property);
        } catch (error) {
            console.error("Error retrieving property:", error)
            return res.status(500).json({ error: error.message })
        }
    }
    else if (req.method === "PATCH") {
        if (req.body.data) {

            const {
                imageUrl,
                id,
            } = req.body.data

            const property = await prisma.property.findUnique({
                where: {
                    id: id,
                }
            })

            const images = property.images || [];
            images.push(imageUrl)

            if (property.mainImage === "") {
                const updatedProperty = await prisma.property.update({
                    where: {
                        id: id,
                    },
                    data: {
                        mainImage: imageUrl,
                        images: images,

                    }
                })
            } else {
                const updatedProperty = await prisma.property.update({
                    where: {
                        id: id,
                    },
                    data: {
                        images: images,
                    }
                })
            }
            return res.status(200).json({ message: 'Propiedad actualizada con éxito' })
        } else {
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
                mainImage,
                description,
            } = req.body.form;

            try {
                const property = await prisma.property.findUnique({
                    where: {
                        id: id,
                    },
                });

                let measure = "";

                if (measure_1 || measure_2) {
                    measure = measure_1 + 'x' + measure_2;
                }

                const garageBoolean = garage === "true" ? true : false;

                const electricityBoolean = electricity === "true" ? true : false;

                const gasBoolean = gas === "true" ? true : false;

                const waterBoolean = water === "true" ? true : false;

                const asphaltBoolean = asphalt === "true" ? true : false;

                const sewerBoolean = sewer === "true" ? true : false;

                const updatedData = {
                    name: name !== "" ? name : property.name,
                    price: price !== "" ? parseFloat(price) : property.price,
                    currency: currency !== "" ? currency : property.currency,
                    operationType: operationType !== "" ? operationType : property.operationType,
                    propertyType: propertyType !== "" ? propertyType : property.propertyType,
                    location: location !== "" ? location : property.location,
                    rooms: rooms !== "" ? parseFloat(rooms) : property.rooms,
                    bathrooms: bathrooms !== "" ? parseFloat(bathrooms) : property.bathrooms,
                    area: area !== "" ? parseFloat(area) : property.area,
                    measure: measure !== "" ? measure : property.measure,
                    garage: garageBoolean,
                    electricity: electricityBoolean,
                    gas: gasBoolean,
                    water: waterBoolean,
                    asphalt: asphaltBoolean,
                    sewer: sewerBoolean,
                    antiquity: antiquity !== "" ? parseFloat(antiquity) : property.antiquity,
                    images: images !== [] ? images : property.images,
                    mainImage: mainImage !== "" ? mainImage : property.mainImage,
                    description: description !== "" ? description : property.description,
                };
                
                const updatedProperty = await prisma.property.update({
                    where: {
                        id: id,
                    },
                    data: updatedData,
                });

                return res.status(200).json({ message: "Property actualizado con éxito" });
            } catch (error) {
                console.error("Error updating property:", error);
                return res.status(500).json({ error: error.message });
            }
        }
    }
}