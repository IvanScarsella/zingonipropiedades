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
        // console.log(req.body.data);
        const property = await prisma.property.findUnique({
            where: {
                id: id,
            }
        })
        // console.log(property);

        const images = property.images || [];
        images.push(imageUrl)
        // let previousImages = property.images;
        // if (previousImages) {
        //     previousImages.push(imageUrl)
        // } else {
        //     previousImages = [imageUrl];
        // }
        const updatedProperty = await prisma.property.update({
            where: {
                id: id,
            },
            data: {
                images: images,

            }
        })
        console.log(updatedProperty);
        return res.status(200).json(updatedProperty)
    }
}