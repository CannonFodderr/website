const env = require('dotenv').config();
// const config = require('../../dbconfig');
const Sequelize = require('sequelize');
let db;

dbAuth = (dbName) => {
    db.authenticate()
    .then(() => {
        console.log(`Connected to db: ${dbName}`)
    })
    .catch((err) => {
        console.error(`Failed to connect:`, err)
    });
}
// RUN DEVELOPMENT
if (process.env.DB_STATE == 'dev') {
    db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.HOST,
        dialect: 'postgres',
        operatorsAliases: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
    dbAuth(process.env.DB_NAME)
}
// RUN PRODUCTION
if (process.env.DB_STATE == 'prod') {
    db = new Sequelize(process.env.PROD_DB_NAME, process.env.PROD_DB_USER, process.env.PROD_DB_PASS, {
        host: process.env.PROD_DB_HOST,
        dialect: 'postgres',
        dialectOptions: {
            ssl:true
        }
    });
    dbAuth(process.env.DB_NAME)
}

module.exports = db;