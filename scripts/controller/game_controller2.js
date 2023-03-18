import { Game } from "../model/game2.js";
import { GameView } from "../view/gameView.mjs";

class GameController {
    constructor(board_size, starting_player) {
        this.current_game = new Game(board_size, starting_player);
        this.board_size = this.current_game.game_board.return_size();
        this.game_view = new GameView(this.board_size);
    }

    show_board() {
        //this.current_game.return_board();
        this.game_view.show_board();
    }

    display_pieces() {
        this.game_view.place_pieces(this.current_game.game_board.board);
    }

    display_moves() {
        this.game_view.place_moves(this.current_game.get_valid_moves());
    }

    display_scores() {
        var black_score;
        var white_score;
        [black_score, white_score] = this.current_game.get_scores();
        this.game_view.display_scores(black_score, white_score);
    }

    check_win() {
        if(this.current_game.check_winner() != 0) {
            this.end_game(this.current_game.check_winner());
        }
    }

    handle_move(x, y) {
        this.current_game.make_move(x, y);
    }

    handle_ai_move(x, y){
        this.current_game.make_player_move(x,y);
        this.current_game.make_ai_move();
    }

    end_game(winning_player) {
        this.game_view.game_end_message(winning_player);
    }

    startLocalGame() {
        this.show_board();
        this.display_pieces();
        this.display_moves();
        //when a cell is clicked a piece is placed
        window.onclick = e => {
            if(e.target.classList.contains('piece')){
                console.log("Already a piece there!");
            }
            else{
                var x = e.target.id.charAt(7);
                var y = e.target.id.charAt(5);
                //update board array if move is valid
                this.handle_move(x, y);
                //shows piece layout on board after flip
                this.display_pieces();
                //shows new valid moves
                this.display_moves();
                //show new scores
                this.display_scores();
                //checks if a player has won
                this.check_win();
            } 
        } 
    }

    startAIGame() {
        this.show_board();
        this.display_pieces();
        this.display_moves();
        //when a cell is clicked a piece is placed
        window.onclick = e => {
            if(e.target.classList.contains('piece')){
                console.log("Already a piece there!");
            }
            else{
                var x = e.target.id.charAt(7);
                var y = e.target.id.charAt(5);
                //update board array if move is valid
                this.handle_ai_move(x, y);
                //shows piece layout on board after flip
                this.display_pieces();
                //shows new valid moves
                this.display_moves();
                //show new scores
                this.display_scores();
                //checks if a player has won
                this.check_win();
            } 
        } 
        }
}
export {GameController};