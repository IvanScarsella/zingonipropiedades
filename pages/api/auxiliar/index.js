import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
    if (req.method === "POST") {
        if (Object.keys(req.body).length === 0) {
            // Realizar operación GET
            try {
                const allAuxiliars = await prisma.auxiliar.findMany();
                return res.status(200).json(allAuxiliars)
            } catch (error) {
                console.log(error);
                return res.status(500).json({ error: error.message })
            }
        } else {
            // Realizar operación POST
            const {
                name,
                position,
                phone,
            } = req.body.form;
            const photo = req.body.photo
console.log(req.body);
            try {
                const newAuxiliar = await prisma.auxiliar.create({
                    data: {
                        name,
                        position,
                        phone,
                        photo
                    }
                })

                return res.status(201).json(newAuxiliar)
            } catch (error) {
                console.log(error);
                return res.status(400).json({ error: error.message })
            }
        }
    }
}