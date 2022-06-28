import dotenv from 'dotenv'

dotenv.config()

const { port, pgHost, pgPort, pgDb, pgUser, pgPassword } = process.env

export default {
  port: port,
  host: pgHost,
  dbport: pgPort,
  database: pgDb,
  user: pgUser,
  password: pgPassword
}
