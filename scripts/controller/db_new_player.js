import mysql from 'mysql2'
import { Database } from './database_abs.js'

class DBNewPlayer {
    constructor() {
        this.db = new Database();
    }

    async check_username(username) {
        var sql = (`SELECT * FROM player WHERE username = ?`, [username]);
        var rows = await this.db.query(sql);
        return rows[0];
    }

    async insert_new_player(username, password) {
        var sql = (`INSERT INTO player (username, password) VALUES = ?`, [username, password]);
        var rows = await this.db.query(sql);
    }
}