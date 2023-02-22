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
        this.player = new LocalPlayer(starting_player);
    }

    static return_board_array (current_game) {
        return Board.return_array(current_game.board);
    }

    get return_board () {
        return this.board;
    }
    
    static make_move (current_game, x, y) {
        if (Game.is_valid_move(current_game.board, x, y, current_game.player.player)){ // changed this
            console.log("current_player: ", current_game.player);
            Board.set_piece(current_game.board, x, y, current_game.player.player);
            Board.flip_pieces(current_game.board, current_game.player.player, x, y);
            LocalPlayer.next_player(current_game.player);
            console.log(current_game.player.player);
        }
    }

    static get_scores(current_game){
        return GameLogic.get_scores(current_game.board.board);
    }

    static get_winner(current_game){
        return GameLogic.check_winner(current_game.board.board);
    }
}


// Reference Code
// from model.board import Board 
// from model.player import Player
// from model.classical_mode import ClassicalMode

// class Game:
//     def __init__(self, game_logic = ClassicalMode(), size = 3) -> None:
//         # recommended to start from empty methods so that work can be divided between team members
//         self.board = Board()
//         self.curr_player = Player.X
//         self.game_logic = game_logic
//         pass
//     def is_valid_move(self, move):
//         return self.game_logic.is_valid_move(move)
//     def make_move(self, move):
//         pass
//     def switch_player(self):
//         self.curr_player = 3 - self.curr_player
//         pass
//     def get_winner(self):
//         pass
    