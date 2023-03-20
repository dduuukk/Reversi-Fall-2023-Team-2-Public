import { Database } from './database_abs.js'

class DBReadBoard {
    constructor(username) {
        this.db = new Database();
        this.username = username;
    }

    async read_board_from_db() {
        var sql = [[`SELECT boardstate FROM board WHERE currentplayer = ?`], [this.username]]; 
        var ret = await this.db.query(sql);
        var board_array = await this.#convert_to_array(ret.boardstate);
        return board_array;
    }

    async #convert_to_array(board_str) {
        var flat_array = Array.from(String(board_str), Number);
        var row_length = flat_array.length / 4;
        var arr = [...Array(row_length + 4)].map(e => Array(row_length + 4).fill(0));
        var y = 1;
        var x = 1;
        for(var i = 0; i < flat_array.length; i++) {
            if((i+1) % row_length == 0) {
                x = 1;
                y++;
            }
            arr[y][x] = flat_array[i];
            x++;
        }
        var board_array = await this.#place_buffer(arr);
        return board_array;
    }


    async #place_buffer(board_array) {
        // Fill outside buffer columns with -1
        for(var col = 0; col < board_array.length; col++) {
            for(var row = 0; row < board_array.length; row++) {
                if(col == 0 || row == 0 || col == 1 || row == 1) {
                    board_array[row][col] = -1;
                }
                else if(col == board_array.length - 1 || row == board_array.length - 1 || 
                  col == board_array.length - 2 || row == board_array.length - 2) {
                    board_array[row][col] = -1;
                }
            }
        }
        return board_array;
    }

}
export{DBReadBoard};