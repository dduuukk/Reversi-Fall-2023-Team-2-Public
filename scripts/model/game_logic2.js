import {Board} from "./board2.js"
import {LocalPlayer} from "./player2.js"

class GameLogic {
    constructor(size, starting_player) {
        this.game_board = new Board(size);
        this.size = this.game_board.return_size();
        this.player = new LocalPlayer(starting_player);
    }

    // Return the current game score
    get_scores() {
        let black_score = 0;
        let white_score = 0;
        // Sum the number of tiles for each player
        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++){
                if(this.game_board.board[i][j] === 1) {
                    black_score++;
                }
                else if (this.game_board.board[i][j] === 2) {
                    white_score++;
                }
            }
        }
        return [black_score, white_score];
    }

    // Check if a player has won the game
    check_winner() {
        var [black_score, white_score] = this.get_scores();
        console.log("blackScore: " + black_score + " whiteScore: " + white_score);
        // Check if the total scores are filling the board and if so return winner
        if (black_score + white_score >= Math.pow(this.size, 2)){
            if (black_score > white_score){
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