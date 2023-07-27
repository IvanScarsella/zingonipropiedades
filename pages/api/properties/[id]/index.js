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
        return res.status(200).json({message: 'Propiedad actualizada con éxito'})
    }
}