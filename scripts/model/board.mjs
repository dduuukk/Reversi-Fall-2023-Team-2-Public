class Board {
    constructor(size) {
        this.size = size;

        // Check if the board size is valid
        if (this.size % 2 != 0) {
            console.log("Invalid board size! Returning to default board.");
            this.size = 8;
        }
        
        // Create 2D array, initialize to 0
        const board = Array.from(Array(this.size), _ => Array(this.size).fill(0));

        // Define starting board layout row and column
        const starting_row = (this.size / 2) - 1;
        const starting_col = (board.length / 2) - 1;

        // Fill the board with 4 starting peices
        board[starting_row][starting_col] = 1;
        board[starting_row][starting_col + 1] = 2;
        board[starting_row + 1][starting_col] = 2;
        board[starting_row + 1][starting_col + 1] = 1;

        // Define the board array
        this.board = board;
    }

    static get_piece (game_board, x, y) {
        // Return the piece at a specified board location
        if (x == -1 || y == -1) {
            return -1;
        }
        else{
            return game_board.board[y][x];
        }
        
    }

    static set_piece (current_board, x, y, value) {
        // Change the piece at a specified board location
        // if (Board.get_piece(current_board, x, y) != 0){
        //     console.log("Piece already exists in this location!")
        // }
        
        current_board.board[y][x] = value;
        
    }

    static check_endpoints(current_board, current_player, start_x, start_y, x, y){
        
        if (Board.get_piece(current_board, x, y) == current_player) {
            console.log("Startpoint: x: ", start_x, "y: ", start_y);
            console.log("Endpoint: x: ", x, "y: ", y);
            Board.flip(current_board, current_player, start_x, start_y, x, y);
            return -1;
        }
        else if (Board.get_piece(current_board, x, y) == 0) {
            return -1;
        }
        return 1;
    }

    static flip_pieces (current_board, current_player, x, y) {
        let size = current_board.size;
        var originalX = x;
        var originalY = y;
        console.log(current_board);
        
        
        // Check left
        x = originalX;
        y = originalY;
        while (Board.get_piece(current_board, x, y) > 0) {
            x--;
            if(Board.check_endpoints(current_board, current_player, originalX, originalY, x, y) == -1) {
                break;
            }
        }

        // Check right
        x = originalX;
        y = originalY;
        while (Board.get_piece(current_board, x, y) > 0) {
            if (x == size -  1) {
                break;
            }
            x++;
            if(Board.check_endpoints(current_board, current_player, originalX, originalY, x, y) == -1) {
                break;
            }
        }
        
        // Check up
        x = originalX;
        y = originalY;
        while (Board.get_piece(current_board, x, y) > 0) {
            y--;
            if(Board.check_endpoints(current_board, current_player, originalX, originalY, x, y) == -1) {
                break;
            }
        }

        // Check down
        x = originalX;
        y = originalY;
        while (Board.get_piece(current_board, x, y) > 0) {
            y++;
            if(Board.check_endpoints(current_board, current_player, originalX, originalY, x, y) == -1) {
                break;
            }
        }

        // Check right -> up
        x = originalX;
        y = originalY;
        while (Board.get_piece(current_board, x, y) > 0) {
            x++;
            y--;
            if(Board.check_endpoints(current_board, current_player, originalX, originalY, x, y) == -1) {
                break;
            }
        }

        // Check left -> up
        x = originalX;
        y = originalY;
        while (Board.get_piece(current_board, x, y) > 0) {
            x--;
            y--;
            if(Board.check_endpoints(current_board, current_player, originalX, originalY, x, y) == -1) {
                break;
            }
        }

        // Check right -> down
        x = originalX;
        y = originalY;
        while (Board.get_piece(current_board, x, y) > 0) {
            x++;
            y++;
            if(Board.check_endpoints(current_board, current_player, originalX, originalY, x, y) == -1) {
                break;
            }
        }

        // Check left -> down
        x = originalX;
        y = originalY;
        while (Board.get_piece(current_board, x, y) > 0) {
            x--;
            y++;
            if(Board.check_endpoints(current_board, current_player, originalX, originalY, x, y) == -1) {
                break;
            }
        }
    }

    static flip (current_board, current_player, start_x, start_y, end_x, end_y) {
        
        if (start_x > end_x) {
            end_x = [start_x, start_x = end_x][0];
            end_y = [start_y, start_y = end_y][0];
        }
        else if (start_y > end_y) {
            end_x = [start_x, start_x = end_x][0];
            end_y = [start_y, start_y = end_y][0];
        }

        console.log("Startpoint: start_x: ", start_x, "start_y: ", start_y);
        console.log("Endpoint: end_x: ", end_x, "end_y: ", end_y);
        
        if (start_x - end_x == 0) {
            for (var j = start_y; j <= end_y; j++){
                Board.set_piece(current_board, start_x, j, current_player);
            }
        }
        else if (start_y - end_y == 0) {
            for (var i = start_x; i <= end_x; i++){
                Board.set_piece(current_board, i, start_y, current_player);
            }
        }
        else if ((start_x - end_x) < 0 && (start_y - end_y) < 0) {
            var i = start_x;
            var j = start_y;
            while (i != end_x) {
                i++;
                j++;
                Board.set_piece(current_board, i, j, current_player);
            }
        }
        else if ((start_x - end_x) < 0 && (start_y - end_y) > 0) {
            var i = start_x;
            var j = start_y;
            console.log("i: ", i, "j: ", j);
            while (i != end_x) {
                i++;
                j--;
                Board.set_piece(current_board, i, j, current_player);
            }
        }
    }
}

export{Board};

// Class test code (ctrl + / to uncomment)
// const size = 12;
// let board1 = new Board(size);
// console.log(board1);
// console.log(Board.get_piece(board1, 2, 3));
// Board.set_piece(board1, 2, 1, 2);
// console.log(board1);
// Board.set_piece(board1, 2, 1, 1);
// console.log(board1);


// Extra test code for flipping pieces
// const size = 6;
// let board1 = new Board(size);
// Board.set_piece(board1, 2, 1, 1);
// Board.set_piece(board1, 3, 1, 1);
// Board.set_piece(board1, 2, 0, 2);
// Board.set_piece(board1, 1, 2, 1);
// Board.set_piece(board1, 1, 3, 2);
// Board.set_piece(board1, 4, 4, 2);
// Board.set_piece(board1, 1, 1, 2);
// Board.set_piece(board1, 3, 0, 1);
// Board.set_piece(board1, 4, 0, 2);
// Board.flip_pieces(board1, 2, 4, 0);
// console.log(board1); 


// there has to be a better way to do this, loop_endpoints is so ugly :)