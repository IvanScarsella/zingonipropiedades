// Importar dotenv y cargar las variables de entorno desde el archivo .env
require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.ibb.co', 'www.google.com', 'static.wixstatic.com'],
  },
  env: {
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET,
    GOOGLEMAPS_KEY: process.env.GOOGLEMAPS_KEY,
  },
};

module.exports = nextConfig;
