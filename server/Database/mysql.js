const connection = require('./config.js')
const mysql = require('mysql')

const db = mysql.createConnection(connection)

module.exports = db;