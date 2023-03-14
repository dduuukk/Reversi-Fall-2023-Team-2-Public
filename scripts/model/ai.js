import { Game } from "./game2.js";
import { Board } from "./board2.js"


class AI extends Game {
    constructor(difficulty, size, player) {
        super(size, player);
        this.difficulty = difficulty;
        this.size = size;
        if (this.player == 1){
            this.turn = 2;
        }
        else {
            this.turn = 1;
        }
        //initialize default best move
        this.best_move = [2, 2];
        this.moves = [];
        this.temp_board = new Board(this.size);
    }

    //gets possible moves that can be chosen from
    get_ai_valid_moves() {
        this.moves = this.game_board.get_valid_moves(this.turn);
    }

    //makes a move in our passed-in temporary board
    make_temp_move(x, y, turn) {
        //figure out how to use these functions on  
        this.temp_board.set_piece(x, y, turn);
        this.temp_board.flip_pieces(x, y, turn);
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
            var x = point[0];
            var y = point[1];
            //get a new temp board
            this.temp_board.board = board;
            console.log('temp board', this.temp_board.board);
            if(max){
                this.make_temp_move(x, y, this.turn);
            }
            else{
                this.make_temp_move(x, y, this.player)
            }
            var val = this.minimax(this.temp_board.board, !max, depth - 1);
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
        var v;
        //return state's utility if at terminal state
        if (depth < 1 || this.get_ai_valid_moves(this.tem) == []) {
            return this.get_state(board);
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
        var [blackScore, whiteScore] = this.get_scores(board);
        blackScore += this.#corner_bonus(board, 1);
        whiteScore += this.#corner_bonus(board, 2);
        return whiteScore - blackScore;
    }

    //high-level make ai move function
    make_ai_move() {
        //find all possible moves
        this.get_ai_valid_moves();
        console.log('moves: ', this.moves);
        //gets us our saved best move
        this.minimax(this.game_board.board, false, this.difficulty);

        var bestx = this.best_move[0];
        var besty = this.best_move[1];
        //evaluate placed move
        console.log('best x, y: ', bestx, besty);
        this.game_board.set_piece(bestx, besty, this.turn);
        this.game_board.flip_pieces(bestx, besty, this.turn);
    }

    // Takes click from view -> controller and inputs move into model for ai
    handle_ai_move(x, y) {
        // Check if the selected move is valid
        if (this.is_valid_move(x, y, this.player.player)) {
            // Set the selected piece to current player
            this.game_board.set_piece(x, y, this.player.player);
            this.game_board.flip_pieces(x, y, this.player.player);
            // AI player goes
            //this.make_ai_move();
        }
        else {
            console.log("Invalid Move.")
        }
    }
}

export {AI};