"use client";

// import { appendMutableCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
// import { APP_BUILD_MANIFEST } from "next/dist/shared/lib/constants";
import { useEffect } from 'react';
import axios from 'axios';
import Home from "./home/page";

function App() {
//   // useEffect para configurar CORS cuando la aplicación se inicia
//   useEffect(() => {
//     // Configuración de CORS en Cloudinary
//     const cloudName = process.env.CLOUD_NAME;
//     const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
//     const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;

//     const corsConfig = {
//       allowed_origins: ['*'],
//       allowed_headers: ['*'],
//       allowed_methods: ['POST', 'GET', 'PUT', 'DELETE'],
//     };

//     const configUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload/cors`;

//     axios.post(configUrl, corsConfig, {
//       auth: {
//         username: apiKey,
//         password: apiSecret,
//       },
//     })
//       .then((response) => {
//         console.log('Configuración de CORS en Cloudinary realizada con éxito:', response.data);
//       })
//       .catch((error) => {
//         console.error('Error al configurar CORS en Cloudinary:', error.message);
//       });
//   }, []);

  return <Home />;
}

export default App;
