const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Noithyung15-25%',
    database: 'parking'
});

module.exports = connection;