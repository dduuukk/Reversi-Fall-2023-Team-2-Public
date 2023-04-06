const mysql = require('mysql2');

class Database {
  constructor() {
    this.pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'reversi'
    }).promise()
  }

  async query(sql) {
    var sql_str = sql[0].toString();
    var sql_arr = sql[1];
    // console.log(sql_str, sql_arr);
    var [rows] = await this.pool.query(sql_str, sql_arr);
    if (typeof rows[0] == 'undefined') {
      return -1;
    }
    else {
      return rows[0];
    }
    
  }

  async terminate() {
    this.pool.end();
  }
}

module.exports = Database;