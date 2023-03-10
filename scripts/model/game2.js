import { GameLogic } from "./game_logic2.js";


export class Game extends GameLogic {
    constructor(size, player) {
        super(size, player);
    }

    return_board () {
        return this.game_board.board;
    }
    
    // Check if selected move is valid
    #is_valid_move (x, y, player) {
        // Check if the current move is does not have a piece on it
        if (this.game_board.get_piece(x, y) == 0) {
            if(this.game_board.get_valid_moves(player) != []) {
                return true;
            }
        }
        else {
            console.log("Invalid Space!")
            return false;
        }
    }

    // Takes click from view -> controller and inputs move into model
    make_move (x, y) {
        // Check if the selected move is valid
        if (this.#is_valid_move(x, y, this.player)) {
            // Set the selected piece to current player
            this.game_board.set_piece(x, y, this.player);
            
            // Switch player
            this.player.next_player();
        }
    }
}
