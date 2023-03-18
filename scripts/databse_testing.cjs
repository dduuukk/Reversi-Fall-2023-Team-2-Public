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



// var sql = "INSERT INTO player (idplayer, username, password, elo, chipcolor, num_games_won, num_games_lost) VALUES (00001, 'testplayer', 'password', 500, 'black', 0, 0)";
// db.query(sql, (err, res) =>{
//   console.log("queried");
//   return console.log(res);
// });

db.query(`SELECT * FROM reversi.player`, (err, res) =>{
  return console.log(res);
});


