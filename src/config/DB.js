
const mySQL = require('mysql2');

const pool = mySQL.createPool({
    host: 'localhost',
    user: 'root',
    password: 'rootfernando',
    database: 'deportes'
});

module.exports = pool.promise();