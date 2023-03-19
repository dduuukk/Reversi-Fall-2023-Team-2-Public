var mysql = require('mysql2');

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "reversi"
});

db.connect((err) => {
  if(err) {
    throw err;
  }
  console.log('MySQL Connected!');
});

var table = "player";
var columns = ["username", "password", "elo", "chipcolor", "num_games_won", "num_games_lost"];
var values = ["testplayer", "password", 500, "black", 0, 0];
var col_str = columns.join(", ");
var val_str = values.map(a => `\'${a}\'`).join(", ");

var sql = `INSERT INTO ${table} (${col_str}) VALUES (${val_str})`;
console.log(sql);

db.query(sql, (err, res) =>{
  console.log("queried");
  return console.log(res);
});


// var column_array = ['username']
// var col_str = column_array.join(", ");

// var sql = `SELECT ${col_str} FROM ${table}`;
// console.log(sql);






// var sql = `INSERT INTO player (idplayer, username, password, elo, chipcolor, num_games_won, num_games_lost) VALUES ('4', 'testplayer4', 'password', '500', 'black', '0', '0')
// var sql = `INSERT INTO player (idplayer, username, password, elo, chipcolor, num_games_won, num_games_lost) VALUES ('00003', 'testplayer3', 'password', '500', 'black', '0', '0')`;
// function get_info(sql, callback) {
//   db.query(sql, (err, res) =>{
//     console.log("queried");
//     console.log(res);
//     return callback(res);
//   })
// }

// var stuff = ``;
// get_info


// console.log("temp:", temp);


// db.query(`SELECT * FROM reversi.player`, (err, res) =>{
//   return console.log(res);
// });


