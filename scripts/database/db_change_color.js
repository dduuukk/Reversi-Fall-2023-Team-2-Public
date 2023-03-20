import { Database } from './database_abs.js'

class DBChangeColor {
    constructor(username) {
        this.db = new Database();
        this.username = username;
    }

    async change_color(color) {
        var sql = [[`UPDATE player SET chipcolor = ? WHERE username = ?`], [color, this.username]];
        // console.log(sql);
        var ret_col = await this.db.query(sql);
        // console.log(ret_col);
        return ret_col;
    }
}
export {DBChangeColor};
// var newplayer = new DBNewPlayer();
// console.log(await newplayer.insert_new_player('testplayer2', 'password2'));

