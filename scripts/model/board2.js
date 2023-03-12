// import {flipPieces} from "./flipPieces2.js"

class Board {
    // Construct board with starting pieces based on size
    constructor(size) {
        this.size = size;
        console.log("Board size:", this.size);

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
        this.size = parseInt(this.size) + 4;

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
    }

    get_endpoints(x, y, player) {
        var endpoint_array = [];
        for(var i = 0; i < this.directions.length; i++) {
            var temp_x = parseInt(x);
            var temp_y = parseInt(y);
            
            var vector_arr = this.directions[i];
            var vector_x = vector_arr[0];
            var vector_y = vector_arr[1];
            
            while(this.get_piece(temp_x, temp_y) != -1) {
                var temp_x = temp_x + vector_x;
                var temp_y = temp_y + vector_y;
                if(this.get_piece(temp_x, temp_y) == player) {
                    if(Math.abs(temp_x - x) != 1 && Math.abs(temp_y - y) != 1) {
                        endpoint_array.push([temp_x, temp_y]);
                    }
                    else {
                        break;
                    }
                }
                else if(this.get_piece(temp_x, temp_y) == 0) {
                    break;
                }
            }
        }
        // console.log("endpoint array:", endpoint_array);
        return endpoint_array;
    }

    flip_pieces(x, y, player) {
        var endpoints = this.get_endpoints(x, y, player);
        // console.log("endpoints:", endpoints);
        var int_x = parseInt(x);
        var int_y = parseInt(y);
        console.log("int_x:", int_x, "int_y:", int_y);
        for(var i = 0; i < endpoints.length; i++) {
            var point = endpoints[i];
            var end_x = point[0];
            var end_y = point[1];
            
            console.log("end_x:", end_x, "end_y:", end_y);

            // Change this to make sure we are not dividing by 0!
            if(Math.abs(end_x - int_x) == 0) {
                var unit_x = 0;
            }
            else {
                var unit_x = (end_x - int_x) / Math.abs(int_x - end_x);
            }

            if(Math.abs(end_y - int_y) == 0) {
                var unit_y = 0;
            }
            else {
                var unit_y = (end_y - int_y) / Math.abs(int_y - end_y);
            }

            console.log("unit_x:", unit_x, "unit_y:", unit_y);

            var temp_x = int_x;
            var temp_y = int_y;

            while(this.get_piece(end_x, end_y) != -1) {
                temp_x = temp_x + unit_x;
                temp_y = temp_y + unit_y;
                console.log("temp_x:", temp_x, "temp_y:", temp_y);
                if(end_x == temp_x && end_y == temp_y) {
                    console.log("Made it here!");
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
        var adjacent_list = [];
        var moves = [];
        var other = 3 - player;
        // if (player == 1){
        //     var other = 2;
        // }
        // else {
        //     var other = 1;
        // }
        //check for all possible adjacent spaces
        for(var col = 0; col < this.size; col++){
            for(var row = 0; row < this.size; row++){
                if(this.get_piece(col, row) == 0){
                    for(var w = 0; w < this.directions.length; w++) {
                        var vector = this.directions[w];
                        var tempx = col + vector[0];
                        var tempy = row + vector[1];
                        if (this.get_piece(tempx, tempy) == other){
                            adjacent_list.push([col, row]);
                        }
                    }
                }
            }
        }
        adjacent_list = adjacent_list.map(JSON.stringify).filter((e,i,a) => i === a.indexOf(e)).map(JSON.parse)

        //check endpoints on all adjacent spots
        for(var z = 0; z < adjacent_list.length; z++){
            var point = adjacent_list[z];
            if((this.get_endpoints(point[0], point[1], player)).length != 0){
                moves.push(point);
            }
        }
        console.log("moves: " , moves);
        return moves;
    }

    return_size() {
        return this.size;
    }
}
export {Board};