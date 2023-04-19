
var Database = require('./database_abs');
var observer = require('../observer');

class DBBoard extends observer {
    constructor(username) {
        super();
        this.db = new Database();
        this.username = username;
        console.log(this.username);
    }

    async read_board_from_db() {
        var sql = [[`SELECT boardstate FROM board WHERE currentplayer = ?`], [this.username]]; 
        if(await this.db.query(sql) == -1) {
            return false;
        } 
        else{
            var ret = await this.db.query(sql);
            var board_array = await this.#convert_to_array(ret.boardstate);
            return board_array;
        }
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

    async change_color(color) {
        var sql = [[`UPDATE player SET chipcolor = ? WHERE username = ?`], [color, this.username]];
        // console.log(sql);
        var ret_col = await this.db.query(sql);
        // console.log(ret_col);
        return ret_col;
    }

    async #update_board_player(current_player_int) {
        if(await this.#match_currentplayer(this.username)) {
            var sql = [[`UPDATE board SET nextplayer = ? WHERE currentplayer = ?`], [current_player_int, this.username]]; 
            await this.db.query(sql);
            return true;
        }
    }

    async notify(args) {
        if(Number.isInteger(args)) {
            console.log('Observer received next player')
            await this.#update_board_player(args);
        }
        else {
            console.log('Observer received board array');
            await this.store_board(args);
        }
    }
}
module.exports = DBBoard;
// var readboard = new DBReadBoard('testplayer');
// console.log(await readboard.read_board_from_db());

// console.log(updateboard.store_board(board));