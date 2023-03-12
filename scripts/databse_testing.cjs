var mysql = require('mysql2');

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "SQL55tuxy!!",
  database: "test_db"
});

db.connect((err) => {
  if(err) {
    throw err;
  }
  console.log('MySQL Connected...')
});

// var sql = "INSERT INTO users (id, first_name, last_name) VALUES ('00001', 'Chris', 'Bender')";
// db.query(sql, (err, res) =>{
//   return console.log(res)
// });

db.query(`SELECT * FROM test_db.users`, (err, res) =>{
  return console.log(res)
});

