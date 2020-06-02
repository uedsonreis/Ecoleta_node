import dotenv from 'dotenv'

dotenv.config()

export default {
    host: process.env.HOST, 
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT
}