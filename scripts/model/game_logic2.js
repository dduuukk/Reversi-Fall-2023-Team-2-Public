import {Board} from "./board2.js"
import {LocalPlayer} from "./player2.js"

class GameLogic {
    constructor(size, starting_player) {
        this.game_board = new Board(size);
        this.size = this.game_board.return_size();
        this.player = new LocalPlayer(starting_player);
    }

    // Return the current game score
    get_scores () {
        let size = this.game_board.length;
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
    check_winner() {
        let size = this.game_board.length;
        let [blackScore, whiteScore] = this.get_scores();
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