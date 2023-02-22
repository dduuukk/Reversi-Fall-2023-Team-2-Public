import { Board } from "./board.js";
import { LocalPlayer } from "./player.js";
import { GameLogic } from "./game_logic.js";


export class Game extends GameLogic {
    constructor(size, starting_player) {
        super();
        // Instantiate size
        this.size = size;
        // Instantiate new board
        this.board = new Board(this.size);
        // Instatiate new player
        this.player = new LocalPlayer(starting_player);
    }

    // Return the board array for display purposes
    static return_board_array (current_game) {
        return Board.return_array(current_game.board);
    }

    get return_board () {
        return this.board;
    }
    
    // Takes click from view -> controller and inputs move into model
    static make_move (current_game, x, y) {
        // Check if the selected move is valid
        if (Game.is_valid_move(current_game.board, x, y, current_game.player.player)){ // changed this
            
            // Debugging log
            // console.log("current_player: ", current_game.player);

            // Set the selected piece to current player
            Board.set_piece(current_game.board, x, y, current_game.player.player);
            // Flip all pieces resulting from the current move
            Board.flip_pieces(current_game.board, current_game.player.player, x, y);
            // Switch player
            LocalPlayer.next_player(current_game.player);
        }
    }

    // Return player scores
    static get_scores(current_game){
        return GameLogic.get_scores(current_game.board.board);
    }

    // Check forr winner
    static get_winner(current_game){
        return GameLogic.check_winner(current_game.board.board);
    }
}
