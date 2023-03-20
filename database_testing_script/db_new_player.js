import { Database } from './database_abs.js'

class DBNewPlayer {
    constructor() {
        this.db = new Database();
    }

    async #check_username(username) {
        var sql = [[`SELECT * FROM player WHERE username = ?`], [username]];
        var rows = await this.db.query(sql);
        if (rows == -1) {
            return -1;
        }
        else {
            return rows[0];
        }
        
    }

    async insert_new_player(username, password) {
        if (await this.#check_username(username) == -1) {
            var sql = [[`INSERT INTO player (username, password) VALUES (?, ?)`], [username, password]];
            console.log(sql);
            return await this.db.query(sql);
        }
        else {
            return false;
        }
    }
}
export {DBNewPlayer};
// var newplayer = new DBNewPlayer();
// console.log(await newplayer.insert_new_player('testplayer2', 'password2'));

