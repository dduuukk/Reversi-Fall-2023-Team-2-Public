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

    //returns if game is over
    check_win () {
        return Game.check_winner(this.currentGame.board);
    }

    //calls the game view function to display pieces
    display_pieces () {  
        let temp = Game.return_board_array(this.currentGame);
        GameView.placePieces(temp);
    }

    //calls the game view function to display board
    show_board () {
        BoardView.makeBoard(this.board_size);
    }

    //calls the game function to handle new move
    handle_move (x, y) {
        Game.make_move(this.currentGame, x, y);
        // Board.flip_pieces(current_game.board, current_game.player.player, x, y);
        // LocalPlayer.next_player(current_game.player);
    }

    //calls the game view function to display scores
    displayScores() {
        var blackScore;
        var whiteScore;
        [blackScore, whiteScore] = Game.get_scores(this.currentGame);
        GameView.displayScores(blackScore, whiteScore);
    }

    //checks who the winner is
    checkWinner() {
        return Game.get_winner(this.currentGame);
    }

    //calls the game view function to display end game message
    static endGame(winner){
        GameView.gameEndMessage(winner);
    }

}
