import prisma from "@/lib/prisma";
import transporter from "./transporter/index";

export default async function register(req, res) {
    const { method } = req;
    if (method == "POST") {
        // console.log(req);
        const {
            name,
            email,
            phone,
            reason
        } = req.body.formData;

        console.log(req.body);
        const id = req.body.id.id ? req.body.id.id.params.id : false;

        try {
            await transporter.verify();


            if (id) {

                const property = await prisma.property.findUnique({
                    where: {
                        id: id,
                    },
                });

                const mail = {
                    // from: email,
                    from: process.env.MAIL_USERNAME,
                    to: process.env.MAIL_USERNAME,
                    subject: "Consulta",
                    html: `
                    <h1 style="color: black">
                    <p> Recibiste una consulta por la propiedad ${property.name}:
                    https://www.zingonipropiedades.com.ar/property/${property.id} </p>
                    <p>  Nombre: ${name} </p>
                    <p>  Teléfono: ${phone} </p>
                    <p>  Mail: ${email} </p>
                    <p>  Motivo: ${reason} </p>
                    </h1>
                    `,
                };

                await transporter.sendMail(mail);

            } else {

                const mail = {
                    from: process.env.MAIL_USERNAME,
                    to: process.env.MAIL_USERNAME,
                    subject: "Consulta",
                    html: `
                <h1 style="color: black">
                Recibiste una consulta de:
                <p> Nombre: ${name} </p>
                <p> Teléfono: ${phone} </p>
                <p> Motivo: ${reason} </p>
                </h1>
                `,
                };

                await transporter.sendMail(mail);
            }

            res.status(200).json({
                Message: `Se ha enviado un correo electrónico correctamente `,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}