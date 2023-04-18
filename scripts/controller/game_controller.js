// import { Game } from "../model/game.js";
// import { GameView } from "../view/gameView.mjs";
const Game = require('../model/game.js');
const GameView = require('../../public/gameView.js');


class GameController {
    constructor() {
        this.current_game;
        this.board_size;
    }

    setup(board_size, starting_player, diff) {
        this.current_game = new Game(board_size, starting_player, diff);
        this.board_size = this.current_game.game_board.return_size();
    }

    show_board() {
        //this.current_game.return_board();
        this.game_view.show_board();
    }

    display_pieces() {
        this.game_view.place_pieces(this.current_game.game_board.board);
    }

    display_moves() {
        return this.current_game.get_valid_moves();
    }

    display_scores() {
        var scores = this.current_game.get_scores();
        return scores;
    }

    check_win() {
        if(this.current_game.check_winner() != 0) {
            return this.current_game.check_winner();
        }
        else{
            return false;
        }
    }

    handle_move(x, y) {
        this.current_game.make_move(x, y);
    }

    wait(s) {
        var start = Date.now(),
            now = start;
        while (now - start < s) {
          now = Date.now();
        }
    }

    handle_ai_player_move(x, y){
        this.current_game.make_player_move(x,y);
    }

    handle_ai_move(){
        //this.wait(2000);
        this.current_game.make_ai_move(); 
    }

    // delay(s){
    //     return new Promise(resolve => {
    //         setTimeout(resolve, s);
    //     });
    // }
}
module.exports = GameController;