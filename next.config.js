// Importar dotenv y cargar las variables de entorno desde el archivo .env
require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'cloudinary',
    path: 'https://cloudinary.com/'
  },
  env: {
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET
  }
};

module.exports = nextConfig;
