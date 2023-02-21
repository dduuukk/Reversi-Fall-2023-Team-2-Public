import { Board } from "../model/board.mjs";
import { LocalPlayer } from "../model/player.mjs";
import { GameLogic } from "../model/game_logic.mjs";

export class gameController {
    constructor() {
        let board_size = 8;
        let starting_player = 1;
        Board.board_size = 8;
    }

    static start_game(board_size, starting_player) {

    }

    static change_size(size){
        this.board_size = size;
        console.log(size);
    }

    static change_starting_player(startingPlayer){
        this.starting_player = startingPlayer;
    }
}