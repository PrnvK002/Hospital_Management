import dotenv from 'dotenv';

dotenv.config();
 
export const MONGO_URI = process.env.MONGO_URI;
export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
export const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
