import { Game } from "./game2.js";
import { Board } from "./board2.js"


class AI {
    constructor(difficulty, size, player) {
        this.difficulty = difficulty;
        if (player == 1){
            this.turn = 2;
        }
        else {
            this.turn = 1;
        }
        //initialize default best move
        this.best_move = [2, 2];
        this.moves = [];
        this.temp_board = new Board(size);
        this.size = size + 4;
    }

    //gets possible moves that can be chosen from
    get_ai_valid_moves(board) {
        this.moves = board.get_valid_moves(this.turn);
    }

    return_ai_valid_moves(board) {
        var temp_moves = board.get_valid_moves(this.turn);
        return temp_moves;
    }

    //makes a move in our passed-in temporary board
    make_temp_move(x, y, turn) {
        //figure out how to use these functions on 
        console.log("x,y", x, y);
        console.log("funky board ", this.temp_board.board);
        this.temp_board.set_piece(x, y, turn);
        this.temp_board.flip_pieces(x, y, turn);
        console.log("new funky board ", this.temp_board.board);
    }

    //find our min or max value through recursion
    min_or_max_value(board, max, depth) {
        //Set v max or min value
        if(max){
            var v = Number.NEGATIVE_INFINITY;
        }
        else {
            var v = Number.INFINITY;
        }
        //check all valid moves
        for(var i = 0; i < this.moves.length; i++){
            var point = this.moves[i];
            console.log("Moves inside of min/max", this.moves);
            var x = point[0];
            var y = point[1];
            //get a new temp board
            console.log("MOVE x,y", x, y);
            console.log("first  board", board.board);
            this.temp_board.board = board.board;
            if(max){
                this.make_temp_move(x, y, this.turn);
            }
            else{
                this.make_temp_move(x, y, this.player)
            }
            var val = this.minimax(this.temp_board, !max, depth - 1);
            if(max){
                if(val > v){
                    this.best_move[0] = x;
                    this.best_move[1] = y;
                    v = val;
                }
            }
            else {
                if(val < v){
                    this.best_move[0] = x;
                    this.best_move[1] = y;
                    v = val;
                }
            }
        }
        return v;
    }

    //minimax alogorithm to find best point
    minimax(board, max, depth) {
        console.log(max);
        console.log(depth);
        var v;
        //return state's utility if at terminal state
        if (depth < 1 || this.return_ai_valid_moves(this.temp_board) == []) {
            return this.get_state(this.temp_board);
        }
        if (max){
            v = this.min_or_max_value(board, max, depth);
        }
        else {
            v = this.min_or_max_value(board, max, depth);
        }
        return v;
    }

    //evaluate board state and incentivize corner
    #corner_bonus(board, player){
        //set default bonus value for having a corner
        var bonus_value = 2;
        var bonus_total = 0;
        if(board[2][2] == player){
            bonus_total += bonus_value;
        }
        if(board[this.size-3][2] == player){
            bonus_total += bonus_value;
        }
        if(board[2][this.size-3] == player){
            bonus_total += bonus_value;
        }
        if(board[this.size-3][this.size-3] == player){
            bonus_total += bonus_value;
        }
        return bonus_total;
    }

    //calculate total board state position score
    get_state(board){
        var [blackScore, whiteScore] = this.get_ai_scores(board);
        blackScore += this.#corner_bonus(board, 1);
        whiteScore += this.#corner_bonus(board, 2);
        return whiteScore - blackScore;
    }

    //high-level make ai move function
    make_ai_move(board) {
        //find all possible moves
        this.get_ai_valid_moves(board);
        console.log('moves: ', this.moves);
        //gets us our saved best move
        this.minimax(board, true, this.difficulty);

        var bestx = this.best_move[0];
        var besty = this.best_move[1];
        //evaluate placed move
        console.log('best x, y: ', bestx, besty);
        board.set_piece(bestx, besty, this.turn);
        board.flip_pieces(bestx, besty, this.turn);
        return board;
    }

    get_ai_scores(board) {
        console.log(board.board);
        var black_score = 0;
        var white_score = 0;
        // Sum the number of tiles for each player
        for(var i = 0; i < this.size; i++){
            for(var j = 0; j < this.size; j++){
                if(board.get_piece(j,i) === 1) {
                    black_score++;
                }
                else if (board.get_piece(j,i) === 2) {
                    white_score++;
                }
            }
        }
        return [black_score, white_score];
    }
}

export {AI};