import { Game } from "./game2.js";
import { Board } from "./board2.js"


class AI {
    constructor(difficulty, size) {
        this.difficulty = difficulty;
        this.turn = 2;

        //initialize default best move
        this.best_move = [2, 2];
        this.original_moves = [];
        this.moves = [];
        this.current_board = new Board(size);
        this.temp_board = new Board(size);
        this.size = size + 4;

    }

    // gets possible moves that can be chosen from
    get_ai_valid_moves() {
        this.moves = this.temp_board.get_valid_moves(this.turn);
    }

    return_ai_valid_moves() {
        var temp_moves = this.temp_board.get_valid_moves(this.turn);
        return temp_moves;
    }

    next_turn() {
        this.turn = 3 - this.turn;
    }

      //makes a move in our passed-in temporary board
    make_temp_move(x, y, turn) {
        //figure out how to use these functions on 
        this.temp_board.set_piece(x, y, turn);
        this.temp_board.flip_pieces(x, y, turn);
    }


    make_ai_move(current_board) {
        // find all possible moves
        this.current_board = current_board;
        this.temp_board = current_board;
        this.get_ai_valid_moves();

        this.original_moves = this.moves;
        console.log(this.moves);
        var point =  this.moves[0];
        var tempx = point[0];
        var tempy = point[1];
        
        // gets us our saved best move
        this.minimax(true, this.difficulty);
        

        //evaluate placed move
        console.log('best x, y: ', this.best_move[0], this.best_move[1]);
        // board.set_piece(bestx, besty, this.turn);
        // board.flip_pieces(bestx, besty, this.turn);
        return [this.best_move[0], this.best_move[1]];
    }

    minimax(max_true, depth) {
        //console.log(max);
        console.log("depth:", depth);
        var v;
        //return state's utility if at terminal state
        if (depth < 1 || (this.return_ai_valid_moves()).length == 0) {
            return this.get_state(this.temp_board);
        }
        else if (max_true){
            v = this.min_or_max_value(max_true, depth);
        }
        else {
            v = this.min_or_max_value(max_true, depth);
        }
        return v;
    }
}

export {AI};