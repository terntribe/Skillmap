import { config } from "dotenv";
import process from 'process';

config({path: `.env`});

export const {
    PORT,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    JWT_SECRET,
} = process.env;