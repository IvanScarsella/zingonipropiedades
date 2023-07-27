import prisma from "../../../lib/prisma"

export default async function handler(req, res) {
    const {
        id,
        image,
    } = req.body

    const updatedProperty = await prisma.property.update({
        where: {
            id: id,
        },
        data: {
            mainImage: image
        }
    })

    return res.status(200).json({ message: `La propiedad ${updatedProperty.name} ha actualizado su imagen principal`})
}