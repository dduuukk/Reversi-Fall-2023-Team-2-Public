import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'reversi'
}).promise()

async function get_rows () {
    const [rows] = await pool.query("SELECT * FROM player")
    return rows;
}

async function get_row (username) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM player
    WHERE username = ?`, [username])
    return rows[0];
}

async function create_row(title, content) {
    const result = await pool.query(`
    INSERT INTO player
    FROM player
    WHERE username = ?`, [username])
    return result;
}


const rows = await get_rows();
const row = await get_rows(`testplayer`);
console.log(rows);
console.log(row);