import * as dotenv from 'dotenv';
dotenv.config();

export const env = {
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  SECRET_KEY: process.env.SECRET_KEY || 'secret',

  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_DATABASE,
  DB_AUTH_SOURCE: process.env.DB_AUTH_SOURCE,
  DB_PORT: process.env.DB_PORT,

  MORALIS_SERVER_URL: process.env.MORALIS_SERVER_URL,
  MORALIS_APP_ID: process.env.MORALIS_APP_ID,
  MORALIS_MASTER_KEY: process.env.MORALIS_MASTER_KEY,

  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,

  AWS_REGION: process.env.AWS_REGION,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  MINT_KEY_NAME: process.env.MINT_KEY_NAME,

  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_SECRET: process.env.GOOGLE_SECRET,

  WEB_HOST: process.env.WEB_HOST,
};
