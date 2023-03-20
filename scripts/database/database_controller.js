import { DBNewPlayer } from "./db_new_player.js";
import { DBCheckLogin } from "./db_checklogin.js";
import { DBUpdateBoard } from "./db_update_board.js";
import { DBReadBoard } from "./db_read_board.js";

class DatabaseController {
    constructor() {
        this.npdb = new DBNewPlayer();
        this.cldb = new DBCheckLogin();
        this.ubdb = new DBUpdateBoard();
        this.rbdb = new DBReadBoard();
    }

    async create_new_account(username, password){
        await this.npdb.insert_new_player(username, password);
    }

    async verify_login(username, password){
        return await this.cldb.match_password(username, password);
    }

    async read_board(){
        return await this.rbdb.read_board_from_db();
    }

    async update_board(board_array){
        await this.ubdb.store_board(board_array);
    }

    
}
export {DatabaseController};