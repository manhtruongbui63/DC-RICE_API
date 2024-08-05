import 'dotenv/config'

export const env = {
  PORT: process.env.PORT,
  MODE: process.env.MODE,
  FRONT_END_URL: process.env.FRONT_END_URL,
  PROJECT_NAME: process.env.PROJECT_NAME,

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  ISS: process.env.ISS,
  EXPIRES_IN: process.env.EXPIRES_IN,
  ACCESS_EXPIRES_IN: process.env.ACCESS_EXPIRES_IN,
  REFRESH_EXPIRES_IN: process.env.REFRESH_EXPIRES_IN,

  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_SECURE: process.env.EMAIL_SECURE,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  EMAIL_RECIVER: process.env.EMAIL_RECIVER,

  DB_SSL: process.env.DB_SSL,
  DB_HOST: process.env.DB_HOST,
  DB_DATABASE_NAME: process.env.DB_DATABASE_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT,
  DB_DIALECT: process.env.DB_DIALECT,
  DB_TIMEZONE: process.env.DB_TIMEZONE
}
