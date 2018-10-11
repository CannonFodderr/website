const config = require('../../dbconfig');
const Sequelize = require('sequelize');
const sq = new Sequelize(config.db_name, config.username, config.password, {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sq.authenticate()
.then(()=> { console.log(`Connected to db: ${config.db_name}`)})
.catch((err) => { console.error(`Failed to connect:`, err)});

module.exports = sq;