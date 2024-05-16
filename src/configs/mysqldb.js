/* eslint-disable no-console */
import { env } from './evironment'
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(env.DB_DATABASE_NAME, env.DB_USERNAME, env.DB_PASSWORD, {
  host: env.DB_HOST,
  port: env.DB_PORT,
  dialect: env.DB_DIALECT,
  timezone: env.DB_TIMEZONE,
  logging: false,
  dialectOptions: env.DB_SSL === 'true' ? { ssl: { require: true, rejectUnauthorized: false } } : {}
})

let connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connected')
  } catch (error) {
    console.log(`Unable to connect to the database ${error}`)
  }
}

module.exports = connectDB
