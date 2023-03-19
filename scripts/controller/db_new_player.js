import mysql from 'mysql2'
import { Database } from './database_abs.js'

class DBNewPlayer {
    constructor() {
        this.db = new Database();
    }

    async #check_username(username) {
        var sql = [[`SELECT * FROM player WHERE username = ?`], [username]];
        var rows = await this.db.query(sql);
        console.log(rows);
        if (rows == -1) {
            return -1;
        }
        else {
            return rows[0];
        }
        
    }

    async insert_new_player(username, password) {
        var sql = (`INSERT INTO player (username, password) VALUES = ?`, [username, password]);
        var rows = await this.db.query(sql);
    }
}

var newplayer = new DBNewPlayer();
var ret = await newplayer.check_username(`testplayer`);
console.log(ret);

