import cloudinary from 'cloudinary';

// Configura cloudinary con las credenciales
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export default function handler(req, res) {
  res.status(200).json({ message: "Cloudinary configurado correctamente." });
}
