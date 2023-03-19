import mysql from 'mysql2'

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
    if(typeof sql === "string" || sql instanceof String) {
      var [rows] = await this.pool.query(sql);
      //console.log(rows[0]);
      return rows[0];
    }
    else {
      console.log("sql input was not a string");
    }
  }

  async terminate() {
    this.pool.end();
  }
}

export {Database};