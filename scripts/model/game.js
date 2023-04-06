const GameLogic = require('./game_logic');
const AI = require('./ai');


class Game extends GameLogic {
    constructor(size, player, diff) {
        super(size, player);
        // var chosenDiff = localStorage.getItem('boardDiff');
        if(diff){
            this.ai = new AI(diff, this.size, this.player.player);
        }
        
    }

    return_board() {
        return this.game_board.board;
    }

    get_valid_moves() {
        // console.log(this.game_board.board);
        // console.log(this.player.player);
        return this.game_board.get_valid_moves(this.player.player);
    }
    
    // FACADE design pattern to simplify valid move checker
    move_checker(x, y, player) {
        // Check if the current move is does not have a piece on it
        if (this.game_board.get_piece(x, y) != 0) {
            return false;
        }
        if((this.game_board.get_endpoints(x, y, player)).length == 0) {
            return false;
        }
        if(!this.game_board.in_valid_moves(x, y, player)) {
            return false;
        }
        return true;
    }

    // Takes click from view -> controller and inputs move into model
    make_move(x, y) {
        // Check if the selected move is valid
        if (this.move_checker(x, y, this.player.player)) {
            // Set the selected piece to current player
            this.game_board.set_piece(x, y, this.player.player);
            this.game_board.flip_pieces(x, y, this.player.player);
            //console.log("game_board:", this.game_board.board);

            // Switch player
            this.player.next_player();
        }
        else {
            console.log("Invalid Move.")
        }
    }

    make_player_move(x,y) {
        // Check if the selected move is valid
        if (this.move_checker(x, y, this.player.player)) {
            // Set the selected piece to current player
            this.game_board.set_piece(x, y, this.player.player);
            this.game_board.flip_pieces(x, y, this.player.player);
        }
        else {
            console.log("Invalid Move.")
        }
    }

    make_ai_move() {
        // AI player goes
        var bestMove = this.ai.make_ai_move(this.game_board);

        this.game_board.set_piece(bestMove[0], bestMove[1], 2);
        this.game_board.flip_pieces(bestMove[0], bestMove[1], 2);
    }
}
module.exports = Game;