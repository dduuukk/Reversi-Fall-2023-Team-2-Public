import { Board } from "./board.js";

export class GameLogic {
    constructor() {
        // if (this.constructor == GameLogic) {
        //     throw new error
        // }
    }

    static is_valid_move (game_board, x, y) {
        // Check if the current move is valid
        if (Board.get_piece(game_board, x, y) == 0) {
            return true;
        }
        else {
            console.log("That space already has a piece on it!")
            return false;
        }
    }

    static make_move (game_board, x, y, current_player) {
        if (this.is_valid_move(game_board, x, y)){
            Board.set_piece(game_board, x, y, current_player);
        }
    }

    static get_scores (game_board) {
        let size = game_board.length;
        let blackScore = 0;
        let whiteScore = 0;
        // count up number of tiles for each player
        for(let i = 0; i < size; i++){
            for(let j = 0; j < size; j++){
                switch(game_board[i][j]) {
                    case 1:
                        blackScore++;
                        break;
                    case 2:
                        whiteScore++;
                        break;
                }
            }
        }
        return [blackScore, whiteScore];
    }

    static check_winner(game_board) {
        let size = game_board.length;
        let {blackScore, whiteScore} = get_scores();
        // checks if the total scores are filling the board and if so return winner
        if (blackScore + whiteScore >= Math.pow(size, 2)){
            if (blackScore > whiteScore){
                return 1;
            }
            else {
                return 2;
            }
        }
        return 0;   
    }
}


// Reference Python code
// from abc import ABC, abstractmethod

// class GameLogic(ABC):
//     def __init__(self) -> None:
//         pass
    
//     @abstractmethod
//     def is_valid_move(self, game):
//         pass
    
//     def make_move(self, game):
//         pass
    
//     def check_winner(self, game):
//         pass
//     # duplicate classes are for controller
//     # controller will interact only with game class and therefore these classes are necessary