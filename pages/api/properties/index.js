// import Cors from 'cors';
// import initMiddleware from '../../../lib/init-middleware';

// Configura CORS
// const cors = initMiddleware(
//     Cors({
//         methods: ['GET'], // Métodos permitidos
//         origin: '*', // Origen permitido (cambia esto según tus necesidades)
//     })
// );

// import prisma from "../../../prisma/client";
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    // await cors(req, res); // Aplica CORS
    // console.log(cors);
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
            const { name, type, price } = req.body;

            try {
                const newProperty = await prisma.property.create({
                    data: {
                        name,
                        type,
                        price
                    }
                });

                return res.status(201).json(newProperty);
            } catch (error) {
                console.log(error);
                return res.status(400).json({ error: error.message });
            }
        }
    }

    // if (req.method === "GET") {
    //     try {
    //         const allProperties = await prisma.property.findMany();
    //         return res.status(200).json(allProperties);
    //     } catch (error) {
    //         console.log(error);
    //         return res.status(500).json({ error: error.message })
    //     }
    // }
}