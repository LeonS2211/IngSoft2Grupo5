import Sequelize from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const hostname = process.env.HOSTNAME || 'prograweb-ti2.postgres.database.azure.com'
const username = process.env.BDUSER || 'postgres'
const password = process.env.PASSWORD || 'password123.'
const database = process.env.DATABASE || 'midb'
const port = process.env.DBPORT || 5432
const dialect = process.env.DIALECT || 'postgres'

const sequelize = new Sequelize(database, username, password, {
    host: hostname,
    port,
    dialect: dialect,
    operatorAliases: false,
    ssl: {rejectUnauthorized: false},
    pool: {
        max: 10,
        min: 0,
        acquire: 20000,
        idle: 5000
    }
})


export default sequelize