var Database = require('./database_abs')

class DBCheckLogin {
    constructor() {
        this.db = new Database();
    }

    async #match_username(username) {
        var sql = [[`SELECT username FROM player WHERE username = ?`], [username]];
        var db_user = await this.db.query(sql);
        // console.log(username, db_user.username);
        if (username != db_user.username) {
            return false;
        }
        else {
            return true;
        }
        
    }

    async match_password(username, password) {
        var sql = [[`SELECT password FROM player WHERE username = ?`], [username]];
        var db_pass = await this.db.query(sql);
        if(await this.#match_username(username)) {
            // console.log(password, db_pass.password);
            if(password != db_pass.password) {
                return false;
            }
            else {
                return true;
                
            }
        }
        
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
module.exports = DBCheckLogin;
// var checklogin = new DBCheckLogin();
// console.log(await checklogin.match_password('testplayer2', 'password2'));