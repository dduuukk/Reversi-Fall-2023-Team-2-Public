import { Game } from "../model/game.js";
import { GameView } from "../view/gameView.mjs";
import { BoardView } from "../view/boardView.mjs";
import { Board } from "../model/board.js";
import { LocalPlayer } from "../model/player.js";

export class GameController {
    constructor(board_size, starting_player) {
        this.board_size = board_size;
        this.starting_player = starting_player;
        this.currentGame = new Game(this.board_size, this.starting_player);
    }

    set change_size(size){
        this.board_size = size;
        console.log(this.board_size);
    }

    set change_starting_player(startingPlayer){
        this.starting_player = startingPlayer;
        console.log(this.starting_player);
    }

    static check_win (currentGame) {
        return Game.check_winner(currentGame.board);
    }

    static display_pieces (currentGameController) {  
        let temp = Game.return_board_array(currentGameController.currentGame);
        GameView.placePieces(temp);
    }

    static show_board (current_game) {
        BoardView.makeBoard(current_game.board_size);
    }

    static handle_move (currentController, x, y) {
        Game.make_move(currentController.currentGame, x, y);
        // Board.flip_pieces(current_game.board, current_game.player.player, x, y);
        // LocalPlayer.next_player(current_game.player);
    }

    static displayScores(currentController) {
        var blackScore;
        var whiteScore;
        [blackScore, whiteScore] = Game.get_scores(currentController.currentGame);
        GameView.displayScores(blackScore, whiteScore);
    }

    static checkWinner(currentController) {
        return Game.get_winner(currentController.currentGame);
    }

    static endGame(winner){
        GameView.gameEndMessage(winner);
    }

}
// gameControl.change_size = 10;
// gameControl.change_starting_player = 2;
// gameControl.start_game();
// console.log(gameControl);
// console.log(gameControl.currentGame.board);
// Game.return_board(gameControl.currentGame);

