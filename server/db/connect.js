const config = require('./config');
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
        let devDB = new Sequelize(config.development.database, config.development.username, config.development.password, {
            host: config.development.host,
            dialect: config.development.dialect,
            operatorsAliases: false,
            logging: false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });
        dbAuth(devDB, config.development.database);
        return devDB
    }
    // RUN PRODUCTION
    if (process.env.DB_STATE == 'prod') {
        let prodDB = new Sequelize(config.production.database, config.production.username, config.production.password, {
            host: config.production.host,
            dialect: config.production.dialect,
            logging: console.log(),
            dialectOptions: {
                ssl:true
            }
        });
        dbAuth(prodDB, config.production.database);
        return prodDB
    }
}
let db = generalDB()



module.exports = db;