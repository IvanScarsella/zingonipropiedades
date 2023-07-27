import prisma from "../../../lib/prisma"

export default async function handler(req, res) {
    const {
        id,
        image,
    } = req.body
console.log(req.body);
    const property = await prisma.property.findUnique({
        where: {
            id: id,
        }
    })

    const images = property.images || [];
    const updatedImages = images.filter((img) => img !== image);

    if (property.mainImage === image) {
        const updatedProperty = await prisma.property.update({
            where: {
                id: id,
            },
            data: {
                mainImage: "",
                images: updatedImages
            }
        })
    } else {
        const updatedProperty = await prisma.property.update({
            where: {
                id: id,
            },
            data: {
                images: updatedImages
            }
        })
    }

    return res.status(200).json({ message: 'Imagen eliminada exitosamente' })
}