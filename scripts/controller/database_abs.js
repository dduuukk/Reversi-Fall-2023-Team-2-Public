var mysql = require('mysql2');

class Database {
  constructor() {

  }

  connect() {
    this.db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database: "reversi"
    })

    db.connect((err) => {
      if(err) {
        throw err;
      }
      console.log('MySQL Connected!');
    })
  }

  query(sql) {
    db.query(sql, (err, res) =>{
      console.log("queried");
      return console.log(res);
    })
  }
  

  insert(table, column_array, value_array) {
    var col_str = column_array.join(", ");
    var val_str = value_array.map(a => `\'${a}\'`).join(", ");

    var sql = `INSERT INTO ${table} (${col_str}) VALUES (${val_str})`;
    this.query(sql);
  }

  get_columns(table, column_array) {
    var col_str = column_array.join(", ");

    var sql = `SELECT ${col_str} FROM ${table}`;
    var temp_array = this.query(sql);
    return temp_array;
  }


}

export {Database}






// var sql = "INSERT INTO player (idplayer, username, password, elo, chipcolor, num_games_won, num_games_lost) VALUES (00001, 'testplayer', 'password', 500, 'black', 0, 0)";
// db.query(sql, (err, res) =>{
//   console.log("queried");
//   return console.log(res);
// });

// db.query(`SELECT * FROM reversi.player`, (err, res) =>{
//   return console.log(res);
// });


