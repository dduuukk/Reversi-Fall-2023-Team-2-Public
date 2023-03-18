import { Game } from "./game2.js";
import { Board } from "./board2.js"


class AI {
    constructor(difficulty, size, player) {
        this.difficulty = difficulty;
        this.turn = 2;
        //initialize default best move
        this.best_move = [2, 2];
        this.moves = [];
        this.original_board = new Board(size - 4);
        this.temp_board = new Board(size - 4);
        this.size = size;
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
        
        console.log("avliable moves:", this.moves);
        if(max){
            var v = Number.NEGATIVE_INFINITY;
        }
        else {
            var v = Number.POSITIVE_INFINITY
        }
        //check all valid moves
        for(var i = 0; i < this.moves.length; i++){
            this.temp_board = this.original_board;
            var point = this.moves[i];
            console.log("Moves inside of min/max", this.moves);
            var x = point[0];
            var y = point[1];
            //get a new temp board
            console.log("MOVE x,y", x, y);
            console.log("first  board", this.temp_board.board);
            if(max){
                this.make_temp_move(x, y, this.turn);
            }
            else{
                this.make_temp_move(x, y, 3 - this.turn)
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
        //console.log(max);
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
        if(board.get_piece(2, 2) == player){
            bonus_total += bonus_value;
        }
        if(board.get_piece(this.size-3, 2) == player){
            bonus_total += bonus_value;
        }
        if(board.get_piece(2, this.size-3) == player){
            bonus_total += bonus_value;
        }
        if(board.get_piece(this.size-3, this.size-3) == player){
            bonus_total += bonus_value;
        }
        return bonus_total;
    }

    //calculate total board state position score
    get_state(board){
        var [blackScore, whiteScore] = this.get_ai_scores(board);
        blackScore += this.#corner_bonus(board, 1);
        whiteScore += this.#corner_bonus(board, 2);
        console.log("whitescore, blackscore, whitescore - blackscore:", whiteScore, blackScore, whiteScore - blackScore);
        return whiteScore - blackScore;
    }

    get_ai_scores(board) {
        console.log(board.board);
        var black_score = 0;
        var white_score = 0;
        // Sum the number of tiles for each player
        for(var i = 2; i < this.size - 2; i++){
            for(var j = 2; j < this.size - 2; j++){
                console.log("this.size:", this.size);
                console.log("i, j:", i, j);
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

    //high-level make ai move function
    make_ai_move(board) {
        //find all possible moves
        var original_moves = this.return_ai_valid_moves(board);
        
        this.original_board = board;
        this.temp_board = board;
        console.log(this.temp_board);
        this.get_ai_valid_moves(this.temp_board);
        console.log("original moves", this.moves);
        //gets us our saved best move
        this.minimax(board, true, this.difficulty);

        var bestx = this.best_move[0];
        var besty = this.best_move[1];
        //evaluate placed move
        console.log('best x, y: ', bestx, besty);
        // board.set_piece(bestx, besty, this.turn);
        // board.flip_pieces(bestx, besty, this.turn);
        return [bestx, besty];
    }
}

export {AI};