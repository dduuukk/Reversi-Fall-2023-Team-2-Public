class Board {
    constructor(size) {
        this.size = size;

        // Check if the board size is valid
        if (this.size % 2 != 0) {
            console.log("Invalid board size! Returning to default board.");
            this.size = 8;
        }
        
        // Create 2D array, initialize to 0
        var board = new Array(this.size);
        for(let i = 0; i < this.size; i++) {
            board[i] = new Array(this.size);
            for(let j = 0; j < this.size; j++){
                board[i][j] = 0;
            }
        }

        // Define starting board layout row and column
        const starting_row = (this.size / 2) - 1;
        const starting_col = (board.length / 2) - 1;
        console.log(board);
        console.log(this.size);
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
            return game_board.board[y][x];
  
        
    }

    static set_piece (current_board, x, y, value) {
        // Change the piece at a specified board location
        current_board.board[y][x] = value;
        
    }

    static check_endpoints(current_board, current_player, start_x, start_y, x, y){
        // Check if in the found endpoint is the same as the current player
        // console.log(current_board.board);
        // console.log("start_x: ", start_x);
        // console.log("start_y: ", start_y);
        // console.log("x: " + x);
        // console.log("y: " + y);
        if (Board.get_piece(current_board, x, y) == current_player) {
            // Deubgging log
            // console.log("Startpoint: x: ", start_x, "y: ", start_y);
            // console.log("Endpoint: x: ", x, "y: ", y);
            
            // If same, flip all pieces between piece and endpoint
            Board.flip(current_board, current_player, start_x, start_y, x, y);
            // Break loop
            return -1;
        }
        // If spcae is a 0, no pieces to flip
        else if (Board.get_piece(current_board, x, y) == 0) {
            return -1;
        }
        
        return 1;
    }

    static flip_pieces (current_board, current_player, x, y) {
        var size = current_board.size;
        const originalX = x;
        const originalY = y;
        // Debugging log
        // console.log(current_board);
        
        
        // Check left
        x = originalX;
        y = originalY;
        if (x != 0) {
            console.log("LEFT");
        while (Board.get_piece(current_board, x, y) > 0) {
                x--;
                if(Board.check_endpoints(current_board, current_player, originalX, originalY, x, y) == -1) {
                    break;
                }
                if (x == 0) {
                    break;
                }
            }
        }

        // Check right
        x = originalX;
        y = originalY;
        if (x != size -  1) {
            console.log("RIGHT");
            while (Board.get_piece(current_board, x, y) > 0) {
                x++;
                if(Board.check_endpoints(current_board, current_player, originalX, originalY, x, y) == -1) {
                    break;
                }
                if (x == size - 1) {
                    break;
                }
            }
        }
        
        
        // Check up
        x = originalX;
        y = originalY;
        if (y != 0) {
            console.log("UP");
            while (Board.get_piece(current_board, x, y) > 0) {
                y--;
                if(Board.check_endpoints(current_board, current_player, originalX, originalY, x, y) == -1) {
                    break;
                }
                if(y == 0) {
                    break;
                }
            }
        }

        // Check down
        x = originalX;
        y = originalY;
        if (y != size - 1) {
            console.log("DOWN");
            while (Board.get_piece(current_board, x, y) > 0) {
                y++;
                if(Board.check_endpoints(current_board, current_player, originalX, originalY, x, y) == -1) {
                    break;
                }
                if (y == size - 1) {
                    break;
                }
            }
        }

        // Check right -> up
        x = originalX;
        y = originalY;
        if(x != size - 1 && y != 0) {
            
        while (Board.get_piece(current_board, x, y) > 0) {
            console.log("RIGHT -> UP");
            x++;
            y--;
            if(Board.check_endpoints(current_board, current_player, originalX, originalY, x, y) == -1) {
                break;
            }
            if(x == size - 1 || y == 0) {
                break;
            }
            }
        }

        // Check left -> up
        x = originalX;
        y = originalY;
        if (x != 0 && y != 0) {
            console.log("LEFT -> UP");
            while (Board.get_piece(current_board, x, y) > 0) {
                x--;
                y--;
                if(Board.check_endpoints(current_board, current_player, originalX, originalY, x, y) == -1) {
                    break;
                }
                if(x == 0 || y == 0) {
                    break;
                }
            }
        }

        // Check right -> down
        x = originalX;
        y = originalY;
        if (x != size - 1 && y != size - 1) {
            console.log("RIGHT -> DOWN");
            while (Board.get_piece(current_board, x, y) > 0) {
                
                x++;
                y++;
                if(Board.check_endpoints(current_board, current_player, originalX, originalY, x, y) == -1) {
                    break;
                }
                if(x == size - 1|| y == size - 1) {
                    break;
                }
            }
        }

        // Check left -> down
        x = originalX;
        y = originalY;
        if (x != 0 && y != size - 1) {
            console.log("LEFT -> DOWN");
            while (Board.get_piece(current_board, x, y) > 0) {
                x--;
                y++;
                if(Board.check_endpoints(current_board, current_player, originalX, originalY, x, y) == -1) {
                    break;
                }
                if(x == 0 || y == size - 1) {
                    break;
                }
            }
        }
        
    }

    static flip (current_board, current_player, start_x, start_y, end_x, end_y) {
        
        if (start_x > end_x) {
            end_x = [start_x, start_x = end_x][0];
            end_y = [start_y, start_y = end_y][0];
        }

        console.log("Startpoint: start_x: ", start_x, "start_y: ", start_y);
        console.log("Endpoint: end_x: ", end_x, "end_y: ", end_y);
        
        if (start_x - end_x == 0) {
            if (start_y > end_y) {
                end_y = [start_y, start_y = end_y][0];
            }
            
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

    static return_array (current_board) {
        return current_board.board;
    }

    static checkAdjacent (current_board, x, y, current_player) {
        const tempx = x;
        const tempy = y;
        var oppositeColor = 3 - current_player;
        var w = false;
        var e = false;
        var n = false;
        var s = false;
        var nw = false;
        var ne = false;
        var sw = false;
        var se = false;
        // var n, nw, ne, e, w, s, sw, se = false;
        if (x > 0){
            console.log("Value at x =", tempx, "y = ", tempy, ": ", Board.get_piece(current_board, tempx - 1, y));
            if (Board.get_piece(current_board, tempx-1, y) == oppositeColor){
                w = true;
                console.log('this evaluated');
            }
            // w = (Board.get_piece(current_board, x-1, y) == oppositeColor);
        }

        if (x < current_board.size - 1){
            console.log("Value at x =", tempx, "y = ", tempy, ": ", Board.get_piece(current_board, tempx +1, y));
            if (Board.get_piece(current_board, tempx+1, y) == 1){
                e = true;
                console.log('this evaluated');
            }
        }   

        //console.log(current_board.board);
        // if (y > 0){
        //     n = (Board.get_piece(current_board, x, y-1) == oppositeColor);
        // }
        // if (y < current_board.size - 1){
        //     s = (Board.get_piece(current_board, x, y+1) == oppositeColor);
        // }
        // if (x > 0 && y > 0){
        //     nw = (Board.get_piece(current_board, x-1, y-1) == oppositeColor);
        // }
        // if (x > 0 && y < current_board.size - 1){
        //     sw = (Board.get_piece(current_board, x-1, y+1) == oppositeColor);
        // }
        // if (x < current_board.size - 1 && y > 0){
        //     ne = (Board.get_piece(current_board, x+1, y-1) == oppositeColor);
        // }
        // if (x < current_board.size - 1 && y < current_board.size - 1){
        //     se = (Board.get_piece(current_board, x+1, y+1) == oppositeColor);
        // }
        // if (x > 0){
        //     //can go left
        //     w = (current_board.board[x-1][y] == oppositeColor);
        //     if (y > 0) {
        //         n = (current_board.board[x][y-1] == oppositeColor);
        //         nw = (current_board.board[x-1][y-1] == oppositeColor);
        //     }
        //     if (y < current_board.size - 1) {
        //         s = (current_board.board[x][y+1] == oppositeColor);
        //         sw = (current_board.board[x-1][y+1] == oppositeColor);
        //     }
        // }
        // if (x < current_board.size - 1){
        //     //can go right
        //     e = current_board.board[x+1][y] == oppositeColor;
        //     if (y > 0) {
        //         n = current_board.board[x][y-1] == oppositeColor;
        //         ne = current_board.board[x+1][y-1] == oppositeColor;
        //     }
        //     if (y < current_board.size - 1) {
        //         s = current_board.board[x][y+1] == oppositeColor;
        //         se = current_board.board[x+1][y+1] == oppositeColor;
        //     }   
        console.log(w);
        console.log(e);
        return n || nw || ne || e || w || s || sw || se;
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