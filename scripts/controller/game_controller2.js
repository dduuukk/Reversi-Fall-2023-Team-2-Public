import { Game } from "../model/game2.js";
import { GameView } from "../view/gameView.mjs";
import { BoardView } from "../view/boardView.mjs";

class GameController {
    constructor(board_size, starting_player) {
        this.starting_player = starting_player;
        this.current_game = new Game(board_size, this.starting_player);
        this.board_size = this.current_game.game_board.return_size();
    }

    check_win() {
        return this.current_game.check_winner();
    }

    handle_move(x, y) {
        this.current_game.make_move(x, y);
    }

    end_game() {
        // Put the view stuff in here
    }



}
export {GameController};