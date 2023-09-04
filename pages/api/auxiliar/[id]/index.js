import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === "POST") {
        try {
            const auxiliar = await prisma.auxiliar.findUnique({
                where: {
                    id: id,
                },
            });

            if (!auxiliar) {
                return res.status(404).json({ error: "Auxiliar not found" });
            }

            return res.status(200).json(auxiliar);
        } catch (error) {
            console.error("Error retrieving auxiliar:", error);
            return res.status(500).json({ error: error.message });
        }
    } else if (req.method === "PATCH") {
        const { name, position, phone } = req.body.form;
        const photo = req.body.photo;

        try {
            const auxiliar = await prisma.auxiliar.findUnique({
                where: {
                    id: id,
                },
            });

            const updatedData = {
                name: name !== "" ? name : auxiliar.name,
                position: position !== "" ? position : auxiliar.position,
                phone: phone !== "" ? phone : auxiliar.phone,
                photo: photo !== "" ? photo : auxiliar.photo,
            };

            const updatedAuxiliar = await prisma.auxiliar.update({
                where: {
                    id: id,
                },
                data: updatedData,
            });

            return res.status(200).json({ message: "Auxiliar actualizado con éxito" });
        } catch (error) {
            console.error("Error updating auxiliar:", error);
            return res.status(500).json({ error: error.message });
        }
    } else if (req.method === "DELETE") {
        const id = req.query.id;

        const deletedAuxiliar = await prisma.auxiliar.delete({
            where: {
                id: id
            },
        })

        return res.status(200).json({ message: "Auxiliar eliminado con éxito"})
    }
}
