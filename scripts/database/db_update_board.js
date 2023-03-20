import { Database } from './database_abs.js'

class DBUpdateBoard {
    constructor(username) {
        this.db = new Database();
        this.username = username;
    }

    async store_board(board_array) {
        var board_formatted = await this.#format_board(board_array);
        var board_format_str = board_formatted.join('');
        if(await this.#match_currentplayer(this.username)) {
            var sql = [[`UPDATE board SET boardstate = ? WHERE currentplayer = ?`], [board_format_str, this.username]]; 
            await this.db.query(sql);
            
        }
        else {
            var sql = [[`INSERT INTO board (boardstate, currentplayer) VALUES (?, ?)`], [board_format_str, this.username]]; 
            await this.db.query(sql);
            sql = [[`SELECT idboard FROM board WHERE currentplayer = ?`], [this.username]];
            var ret = await this.db.query(sql);
            var idboard = ret.idboard;
            sql = [[`UPDATE player SET board_idboard = ? WHERE username = ?`], [idboard, this.username]];
            await this.db.query(sql);
            
        }
        return true;
    }

    async #format_board(board_array) {
        var flat_arr = []
        console.log(`length:`,board_array.length);
        for(var i = 2; i < board_array.length - 2; i++) {
            for(var j = 2; j < board_array.length - 2; j++) {
                flat_arr.push(board_array[j][i]);
            }
        }
        return flat_arr;
    }

    async #match_currentplayer(username) {
        var sql = [[`SELECT currentplayer FROM board WHERE currentplayer = ?`], [username]];
        var db_user = await this.db.query(sql);
        // console.log(username, db_user.username);
        if (username != db_user.currentplayer) {
            return false;
        }
        else {
            return true;
        }
        
    }

    async delete_board() {
        var sql = [[`DELETE FROM board WHERE currentplayer = ?`], [this.username]];
        await this.db.query(sql);
        sql = [[`UPDATE player SET board_idboard = ? WHERE username = ?`], [null, this.username]];
        await this.db.query(sql);
    }

}
export {DBUpdateBoard};

// var updateboard = new DBUpdateBoard('testplayer');
// var board = [
//     [-1, -1, -1, -1, -1, -1, -1, -1],
//     [-1, -1, -1, -1, -1, -1, -1, -1],
//     [-1, -1, 0, 0, 0, 0, -1, -1],
//     [-1, -1, 0, 1, 2, 0, -1, -1],
//     [-1, -1, 0, 2, 1, 0, -1, -1],
//     [-1, -1, 0, 0, 0, 0, -1, -1],
//     [-1, -1, -1, -1, -1, -1, -1, -1],
//     [-1, -1, -1, -1, -1, -1, -1, -1],
// ];
// console.log(updateboard.store_board(board));