import prisma from '../../../lib/prisma';
import { sanityFetch } from '@/src/sanity/lib/fetch';
import client from '@/src/sanity/lib/client';

const auxiliarQuery = '*[_type == "auxiliar"]';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    if (Object.keys(req.body).length === 0) {
      // Realizar operación GET
      try {
        const allAuxiliars = await sanityFetch({ query: auxiliarQuery });

        return res.status(200).json(allAuxiliars);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
      }
    } else {
      // Realizar operación POST
      const { name, position, phone } = req.body.form;
      const photo = req.body.photo;

      try {
        const newAuxiliar = await prisma.auxiliar.create({
          data: {
            name,
            position,
            phone,
            photo,
          },
        });

        return res.status(201).json(newAuxiliar);
      } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error.message });
      }
    }
  }
}
