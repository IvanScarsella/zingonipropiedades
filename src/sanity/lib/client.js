import { createClient } from '@sanity/client';
import { apiVersion, dataset, projectId } from '../env';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Cambia a `false` si necesitas obtener datos en tiempo real
});

export default client;
