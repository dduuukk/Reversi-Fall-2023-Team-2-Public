// import {flipPieces} from "./flipPieces2.js"

class Board {
    // Construct board with starting pieces based on size
    constructor(size) {
        this.size = size;

        // Create starting board array
        this.board = this.#build_board();

        this.directions = [
            [0, -1],
            [1, -1],
            [1, 0], 
            [1, 1],  
            [0, 1],  
            [-1, 1], 
            [-1, 0],  
            [-1, -1] 
        ];

        console.log(this.board);
    }

    // Check if input bopard size is valid
    #check_valid_board_size() {
        // Check if board size is not an even number
        if (this.size % 2 != 0) {
            // If board size not an even number, set to default size
            console.log("Invalid board size! Returning to default board.");
            this.size = 8;
        }
    }

    // Build board array
    #build_board() {
        // Check for valid board size
        this.#check_valid_board_size();

        this.size = this.size + 4;

        // Build an array of size size, fill with 0
        var board_array = new Array(this.size);
        for(var i = 0; i < this.size; i++) {
            board_array[i] = new Array(this.size);
            for(var j = 0; j < this.size; j++){
                board_array[i][j] = 0;
            }
        }

        // Place starting pieces of the 
        board_array = this.#place_starting_pieces(board_array);
        return board_array;
    }

    #place_starting_pieces(board_array) {
        var starting_row = (this.size / 2) - 1;
        var starting_col = (board_array.length / 2) - 1;
        
        // Fill the board with 4 starting peices
        board_array[starting_row][starting_col] = 1;
        board_array[starting_row][starting_col + 1] = 2;
        board_array[starting_row + 1][starting_col] = 2;
        board_array[starting_row + 1][starting_col + 1] = 1;

        // Fill outside buffer columns with -1
        board_array = this.#place_buffer(board_array);
        return board_array;
    }

    #place_buffer(board_array) {
        // Fill outside buffer columns with -1
        for(var col = 0; col < this.size; col++) {
            for(var row = 0; row < this.size; row++) {
                if(col == 0 || row == 0 || col == 1 || row == 1) {
                    board_array[row][col] = -1;
                }
                else if(col == this.size - 1 || row == this.size - 1 || 
                  col == this.size - 2 || row == this.size - 2) {
                    board_array[row][col] = -1;
                }
            }
        }
        return board_array;
    }

    get_piece(x, y) {
        return this.board[y][x];
    }

    set_piece(x, y, player) {
        this.board[y][x] = parseInt(player);
        this.#flip_pieces(x, y, player);
    }

    #get_endpoints(x, y, player) {
        endpoint_array = []
        for(var i = 0; i < this.directions.length; i++) {
            var temp_x = x;
            var temp_y = y;
            
            vector_arr = this.directions[i];
            vector_x = vector_arr[0];
            vector_y = vector_arr[1];
            
            while(this.get_piece(temp_x, temp_y) != -1) {
                temp_x = temp_x + vector_x;
                temp_y = temp_y + vector_y;
                if(this.get_piece(temp_x, temp_y) == player) {
                    if(Math.abs(temp_x - x) != 1 && Math.abs(temp_y - y) != 1)
                        endpoint_array.push([temp_x, temp_y]);
                }
                else if(this.get_piece(temp_x, temp_y) == 0) {
                    break;
                }
            }
        }
        return endpoint_array;
    }

    #flip_pieces(x, y, player) {
        var endpoints = this.#get_endpoints(x, y, player);
        for(var i = 0; i < endpoints.length; i++) {
            var temp_x = x;
            var temp_y = y;
            
            endpoint_arr = this.directions[i];
            end_x = vector_arr[0];
            end_y = vector_arr[1];

            // Change this to make sure we are not dividing by 0!
            if(Math.abs(end_x - temp_x) == 0) {
                unit_x = 0;
            }
            else {
                unit_x = (end_x - temp_x) / Math.abs(end_x - temp_x);
            }

            if(Math.abs(end_y - temp_y)) {
                unit_y = 0;
            }
            else {
                unit_y = (end_y - temp_y) / Math.abs(end_y - temp_y);
            }

            while(this.get_piece(temp_x, temp_y) != -1) {
                temp_x = temp_x + unit_x;
                temp_y = temp_y + unit_y;
                if(temp_x == end_x && temp_y == end_y) {
                    break;
                }
                else {
                    this.set_piece(temp_x, temp_y, player);
                }
            }
        }
    }

    
    get_valid_moves(player){
        //iterate through cells
        var adjacentList = [];
        var moves = [];
        if (player == 1){
            var other = 2;
        }
        else {
            var other = 1;
        }
        //check for all possible adjacent spaces
        for(var i = 1; i < this.size + 1; i++){
            for(var j = 1; j < this.size + 1; j++){
                if(this.board.get_piece(j, i) == 0){
                    for(var w = 0; w < this.directions.length; w++) {
                        var vector = this.directions[i];
                        var tempx = j + vector[0];
                        var tempy = i + vector[1];
                        if (this.board.get_piece(tempx, tempy) == other){
                            adjacentList.push([i, j]);
                        }
                    }
                }
            }
        }
        //check endpoints on all adjacent spots
        for(var z = 0; z < adjacentList.length; z++){
            var point = adjacentList[z];
            if(this.#get_endpoints(point[1], point[0], player) != []){
                moves.push(point);
            }
        }
        return moves;
    }

    return_size() {
        return this.size;
    }
}
export {Board};