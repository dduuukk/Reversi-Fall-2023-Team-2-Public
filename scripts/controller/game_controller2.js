import { Game } from "../model/game2.js";
//import { Board } from "../model/board2.js"
import { GameView } from "../view/gameView.mjs";
import { BoardView } from "../view/boardView.mjs";

class GameController {
    constructor(board_size, starting_player) {
        this.current_game = new Game(board_size, starting_player);
        this.board_size = this.current_game.game_board.return_size();
        this.game_view = new GameView(this.board_size);
    }

    show_board() {
        this.current_game.return_board();
        console.log(this.current_game.game_board.board);
        this.game_view.show_board();
    }

    display_pieces() {
        this.game_view.place_pieces(this.current_game.game_board.board);
    }

    display_moves() {
        console.log("Valid moves array:", this.current_game.get_valid_moves());
        this.game_view.place_moves(this.current_game.get_valid_moves());
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