import { Board } from "./board.js";

class GameLogic {
    constructor() {
        // Abstract class, nothing to construct
    }   

    // Build board for controller interaction
    static build_board (size) {
        let game_board = new Board(size);
        return game_board;
    }

    // Check if selected move is valid
    static is_valid_move (game_board, x, y, current_player) {
        // Check if the current move is does not have a piece on it
        if (Board.get_piece(game_board, x, y) == 0) {
            return true; //Board.checkAdjacent(game_board, x, y, current_player);
        }
        else {
            console.log("That space already has a piece on it!")
            return false;
        }
    }

    // Return the current game score
    static get_scores (game_board) {
        let size = game_board.length;
        let blackScore = 0;
        let whiteScore = 0;
        // Sum the number of tiles for each player
        for(let i = 0; i < size; i++){
            for(let j = 0; j < size; j++){
                if(game_board[i][j] === 1) {
                    blackScore++;
                }
                else if (game_board[i][j] === 2) {
                    whiteScore++;
                }
            }
        }
        return [blackScore, whiteScore];
    }

    // Check if a player has won the game
    static check_winner(game_board) {
        let size = game_board.length;
        let [blackScore, whiteScore] = GameLogic.get_scores(game_board);
        console.log("blackScore: " + blackScore + " whiteScore: " + whiteScore);
        // Check if the total scores are filling the board and if so return winner
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

export {GameLogic};
