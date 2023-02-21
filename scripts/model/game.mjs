import { Board } from "./board.mjs";
import { LocalPlayer } from "./player.mjs";
import { GameLogic } from "./game_logic.mjs";


export class Game extends GameLogic {
    constructor(size, starting_player,  mode) {
        super();
        // Instantiate size
        this.size = size;
        // Instantiate new board
        this.board = new Board(this.size);

        this.player = new LocalPlayer(starting_player);
    }

    static switch_player (current_player) {
        LocalPlayer.next_player(current_player);
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
    