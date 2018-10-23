const env = require('dotenv').config();
const Sequelize = require('sequelize');

dbAuth = (db, dbName) => {
    db.authenticate()
    .then(() => {
        console.log(`Connected to db: ${dbName}`)
    })
    .catch((err) => {
        console.error(`Failed to connect:`, err)
    });
}

let generalDB = () => {
    // RUN DEVELOPMENT
    if (process.env.DB_STATE == 'dev') {
        let devDB = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
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
        dbAuth(devDB, process.env.DB_NAME);
        return devDB
    }
    // RUN PRODUCTION
    if (process.env.DB_STATE == 'prod') {
        let prodDB = new Sequelize(process.env.PROD_DB_NAME, process.env.PROD_DB_USER, process.env.PROD_DB_PASS, {
            host: process.env.PROD_DB_HOST,
            dialect: 'postgres',
            logging: false,
            dialectOptions: {
                ssl:true
            }
            
        });
        dbAuth(prodDB, process.env.DB_NAME);
        return prodDB
    }
}
let db = generalDB()

module.exports = db;