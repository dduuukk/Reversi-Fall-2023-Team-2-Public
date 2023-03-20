import { Database } from './database_abs.js'

class DBUpdateBoard {
    constructor(username) {
        this.db = new Database();
        this.username = username;
    }

    async store_board(board_array) {
        var board_formatted = await this.#format_board(board_array);
        var board_format_str = board_formatted.join('');
        console.log(board_format_str);
        var sql = [[`INSERT INTO board (boardstate, currentplayer) VALUES (?, ?)`], [board_format_str, this.username]]; 
        var ret = await this.db.query(sql);
        return ret;
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

}
export {DBUpdateBoard};