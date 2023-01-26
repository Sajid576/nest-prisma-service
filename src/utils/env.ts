import * as dotenv from 'dotenv';
dotenv.config();

export const env = {
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  SECRET_KEY: process.env.SECRET_KEY || 'secret',

  BASE_URL: process.env.BASE_URL,
};
