const mysql = require('mysql2/promise');

const config = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'tezzract'
};



module.exports = mysql.createPool(config);