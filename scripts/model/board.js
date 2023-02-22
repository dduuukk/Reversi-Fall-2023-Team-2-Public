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
        console.log(this.board);
    }

    // Return piece at given x and y value
    static get_piece (game_board, x, y) {
        // Return the piece at a specified board location
            return game_board.board[y][x];
  
        
    }

    // Set x and y value to player
    static set_piece (current_board, x, y, value) {
        // Change the piece at a specified board location
        current_board.board[y][x] = parseInt(value);
        
    }

    // Check if found endpoints should resut in a flip
    static check_endpoints(current_board, current_player, start_x, start_y, x, y){
        // Check if in the found endpoint is the same as the current player
        if (Board.get_piece(current_board, x, y) == current_player) {
            // If same, flip all pieces between piece and endpoint
            Board.flip(current_board, current_player, start_x, start_y, x, y);
            // Break loop
            return -1;
        }

        // If space is a 0, endpoint is not a piece, no pieces to flip
        else if (Board.get_piece(current_board, x, y) == 0) {
            return -1;
        }

        return 1;
    }

    // Check in all directions for places where flipping might need to occur
    static flip_pieces (current_board, current_player, x, y) {
        // Set constants to input values for easier reading
        var size = current_board.size;
        var originalX = x;
        var originalY = y;
        
        // Check LEFT
        x = originalX;
        y = originalY;
        // Check that x is not at left border
        if (x != 0) {
        console.log("LEFT");
        while (Board.get_piece(current_board, x, y) > 0) {
                x--;
                // Check if current point is an endpoint
                if(Board.check_endpoints(current_board, current_player, originalX, originalY, x, y) == -1) {
                    break;
                }

                // Check if current point is at border
                if (x == 0) {
                    break;
                }
            }
        }

        // Check RIGHT
        x = originalX;
        y = originalY;
        // Check that x is not at right border
        if (x != size -  1) {
            console.log("RIGHT");
            while (Board.get_piece(current_board, x, y) > 0) {
                x++;
                // Check if current point is an endpoint
                if(Board.check_endpoints(current_board, current_player, originalX, originalY, x, y) == -1) {
                    break;
                }

                // Check if current point is at border
                if (x == size - 1) {
                    break;
                }
            }
        }
        
        
        // Check UP
        x = originalX;
        y = originalY;
        // Check that y is not at top border
        if (y != 0) {
            console.log("UP");
            while (Board.get_piece(current_board, x, y) > 0) {
                y--;
                // Check if current point is an endpoint
                if(Board.check_endpoints(current_board, current_player, originalX, originalY, x, y) == -1) {
                    break;
                }

                //Check if current point is at border
                if(y == 0) {
                    break;
                }
            }
        }

        // Check DOWN
        x = originalX;
        y = originalY;
        // Check that y is not at bottom border
        if (y != size - 1) {
            console.log("DOWN");
            while (Board.get_piece(current_board, x, y) > 0) {
                y++;
                // Check if current point is an endpoint
                if(Board.check_endpoints(current_board, current_player, originalX, originalY, x, y) == -1) {
                    break;
                }

                //Check if current point is at border
                if (y == size - 1) {
                    break;
                }
            }
        }

        // Check RIGHT -> UP
        x = originalX;
        y = originalY;
        // Check that x is not at right border, y is not at top border
        if(x != size - 1 && y != 0) {
            console.log("RIGHT -> UP");
            while (Board.get_piece(current_board, x, y) > 0) {
                console.log("RIGHT -> UP");
                x++;
                y--;
                // Check if current point is an endpoint
                if(Board.check_endpoints(current_board, current_player, originalX, originalY, x, y) == -1) {
                    break;
                }

                //Check if current point is at border
                if(x == size - 1 || y == 0) {
                    break;
                }
                }
        }

        // Check LEFT -> UP
        x = originalX;
        y = originalY;
        // Check that x is not at left border, y is not at top border
        if (x != 0 && y != 0) {
            console.log("LEFT -> UP");
            while (Board.get_piece(current_board, x, y) > 0) {
                x--;
                y--;
                // Check if current point is an endpoint
                if(Board.check_endpoints(current_board, current_player, originalX, originalY, x, y) == -1) {
                    break;
                }

                //Check if current point is at border
                if(x == 0 || y == 0) {
                    break;
                }
            }
        }

        // Check RIGHT -> DOWN
        x = originalX;
        y = originalY;
        // Check that x is not at right border, y is not at bottom border
        if (x != size - 1 && y != size - 1) {
            console.log("RIGHT -> DOWN");
            while (Board.get_piece(current_board, x, y) > 0) {
                
                x++;
                y++;
                // Check if current point is an endpoint
                if(Board.check_endpoints(current_board, current_player, originalX, originalY, x, y) == -1) {
                    break;
                }

                //Check if current point is at border
                if(x == size - 1|| y == size - 1) {
                    break;
                }
            }
        }

        // Check LEFT -> DOWN
        x = originalX;
        y = originalY;
        // Check that x is not at left border, y is not at bottom borders
        if (x != 0 && y != size - 1) {
            console.log("LEFT -> DOWN");
            while (Board.get_piece(current_board, x, y) > 0) {
                x--;
                y++;
                // Check if current point is an endpoint
                if(Board.check_endpoints(current_board, current_player, originalX, originalY, x, y) == -1) {
                    break;
                }

                //Check if current point is at border
                if(x == 0 || y == size - 1) {
                    break;
                }
            }
        }
        
    }

    // Flip the pieces in directions identified by check endpoints
    static flip (current_board, current_player, start_x, start_y, end_x, end_y) {
        // If starting x > ending x, swith the two points
        if (start_x > end_x) {
            end_x = [start_x, start_x = end_x][0];
            end_y = [start_y, start_y = end_y][0];
        }

        // Debugging logs
        // console.log("Startpoint: start_x: ", start_x, "start_y: ", start_y);
        // console.log("Endpoint: end_x: ", end_x, "end_y: ", end_y);
        
        // If the points are related vertically
        if (start_x - end_x == 0) {
            // If starting y > ending y, switch the two y values
            if (start_y > end_y) {
                end_y = [start_y, start_y = end_y][0];
            }
            
            // Fill the vertical line with currrent player
            for (var j = start_y; j <= end_y; j++){
                Board.set_piece(current_board, start_x, j, current_player);
            }
        }
        // If the points are horizontally related
        else if (start_y - end_y == 0) {
            // Fill the horizontal line with current player
            for (var i = start_x; i <= end_x; i++){
                Board.set_piece(current_board, i, start_y, current_player);
            }
        }
        // If the points are diagonally related & starting y < ending y
        else if ((start_x - end_x) < 0 && (start_y - end_y) < 0) {
            var i = start_x;
            var j = start_y;
            // Fill the downwards horizontal line with current player
            while (i != end_x) {
                i++;
                j++;
                Board.set_piece(current_board, i, j, current_player);
            }
        }
        // If the points are diagonally related & starting y > ending y
        else if ((start_x - end_x) < 0 && (start_y - end_y) > 0) {
            var i = start_x;
            var j = start_y;
            // Fille the upwards horizontal line with currrent player
            while (i != end_x) {
                i++;
                j--;
                Board.set_piece(current_board, i, j, current_player);
            }
        }
    }

    // Return the current board array for display purposes
    static return_array (current_board) {
        return current_board.board;
    }
    
    static flip_true(current_board, current_player, start_x, start_y, x, y){
        // Check if in the found endpoint is the same as the current player
        console.log("MADE IT HERE!!!!");
        var isValid = 0;
        if (Board.get_piece(current_board, x, y) == current_player && (Math.abs(start_x - x != 1)) && (Math.abs(start_y - y != 0))) {
            // If same, flip all pieces between piece and endpoint
            Board.flip(current_board, current_player, start_x, start_y, x, y);
            // Break loop
            isValid = 1;
        }

        // If space is a 0, endpoint is not a piece, no pieces to flip
        else if (Board.get_piece(current_board, x, y) == 0) {
            isValid = 0;
        }

        return isValid;
    }
    

    static check_flip (current_board, current_player, x, y) {
        // Set constants to input values for easier reading
        var size = current_board.size;
        var originalX = x;
        var originalY = y;
        var OK = 0;
        
        // Check LEFT
        x = originalX;
        y = originalY;
        // Check that x is not at left border
        if (x != 0) {
        console.log("LEFT");
        while (Board.get_piece(current_board, x, y) >= 0) {
                x--;
                // Check if current point is an endpoint
                if(Board.flip_true(current_board, current_player, originalX, originalY, x, y) == 1) {
                    OK = 1;
                    break;
                }

                // Check if current point is at border
                if (x == 0) {
                    break;
                }
            }
        }

        // Check RIGHT
        x = originalX;
        y = originalY;
        // Check that x is not at right border
        if (x != size -  1) {
            console.log("RIGHT");
            while (Board.get_piece(current_board, x, y) >= 0) {
                x++;
                // Check if current point is an endpoint
                if(Board.flip_true(current_board, current_player, originalX, originalY, x, y) == 1) {
                    OK = 1;
                    break;
                }

                // Check if current point is at border
                if (x == size - 1) {
                    break;
                }
            }
        }
        
        
        // Check UP
        x = originalX;
        y = originalY;
        // Check that y is not at top border
        if (y != 0) {
            console.log("UP");
            while (Board.get_piece(current_board, x, y) >= 0) {
                y--;
                // Check if current point is an endpoint
                if(Board.flip_true(current_board, current_player, originalX, originalY, x, y) == 1) {
                    OK = 1;
                    break;
                }

                //Check if current point is at border
                if(y == 0) {
                    break;
                }
            }
        }

        // Check DOWN
        x = originalX;
        y = originalY;
        // Check that y is not at bottom border
        if (y != size - 1) {
            console.log("DOWN");
            while (Board.get_piece(current_board, x, y) >= 0) {
                y++;
                // Check if current point is an endpoint
                if(Board.flip_true(current_board, current_player, originalX, originalY, x, y) == 1) {
                    OK = 1;
                    break;
                }

                //Check if current point is at border
                if (y == size - 1) {
                    break;
                }
            }
        }

        // Check RIGHT -> UP
        x = originalX;
        y = originalY;
        // Check that x is not at right border, y is not at top border
        if(x != size - 1 && y != 0) {
            console.log("RIGHT -> UP");
            while (Board.get_piece(current_board, x, y) >= 0) {
                console.log("RIGHT -> UP");
                x++;
                y--;
                // Check if current point is an endpoint
                if(Board.flip_true(current_board, current_player, originalX, originalY, x, y) == 1) {
                    OK = 1;
                    break;
                }

                //Check if current point is at border
                if(x == size - 1 || y == 0) {
                    break;
                }
                }
        }

        // Check LEFT -> UP
        x = originalX;
        y = originalY;
        // Check that x is not at left border, y is not at top border
        if (x != 0 && y != 0) {
            console.log("LEFT -> UP");
            while (Board.get_piece(current_board, x, y) >= 0) {
                x--;
                y--;
                // Check if current point is an endpoint
                if(Board.flip_true(current_board, current_player, originalX, originalY, x, y) == 1) {
                    OK = 1;
                    break;
                }

                //Check if current point is at border
                if(x == 0 || y == 0) {
                    break;
                }
            }
        }

        // Check RIGHT -> DOWN
        x = originalX;
        y = originalY;
        // Check that x is not at right border, y is not at bottom border
        if (x != size - 1 && y != size - 1) {
            console.log("RIGHT -> DOWN");
            while (Board.get_piece(current_board, x, y) >= 0) {
                
                x++;
                y++;
                // Check if current point is an endpoint
                if(Board.flip_true(current_board, current_player, originalX, originalY, x, y) == 1) {
                    OK = 1
                    break;
                }

                //Check if current point is at border
                if(x == size - 1|| y == size - 1) {
                    break;
                }
            }
        }

        // Check LEFT -> DOWN
        x = originalX;
        y = originalY;
        // Check that x is not at left border, y is not at bottom borders
        if (x != 0 && y != size - 1) {
            console.log("LEFT -> DOWN");
            while (Board.get_piece(current_board, x, y) >= 0) {
                x--;
                y++;
                // Check if current point is an endpoint
                if(Board.flip_true(current_board, current_player, originalX, originalY, x, y) == 1) {
                    OK = 1;
                    break;
                }

                //Check if current point is at border
                if(x == 0 || y == size - 1) {
                    break;
                }
            }
        }
        return OK;
        
    }

    // Flip the pieces in directions identified by check endpoints
    static flip (current_board, current_player, start_x, start_y, end_x, end_y) {
        // If starting x > ending x, swith the two points
        if (start_x > end_x) {
            end_x = [start_x, start_x = end_x][0];
            end_y = [start_y, start_y = end_y][0];
        }

        // Debugging logs
        // console.log("Startpoint: start_x: ", start_x, "start_y: ", start_y);
        // console.log("Endpoint: end_x: ", end_x, "end_y: ", end_y);
        
        // If the points are related vertically
        if (start_x - end_x == 0) {
            // If starting y > ending y, switch the two y values
            if (start_y > end_y) {
                end_y = [start_y, start_y = end_y][0];
            }
            
            // Fill the vertical line with currrent player
            for (var j = start_y; j <= end_y; j++){
                Board.set_piece(current_board, start_x, j, current_player);
            }
        }
        // If the points are horizontally related
        else if (start_y - end_y == 0) {
            // Fill the horizontal line with current player
            for (var i = start_x; i <= end_x; i++){
                Board.set_piece(current_board, i, start_y, current_player);
            }
        }
        // If the points are diagonally related & starting y < ending y
        else if ((start_x - end_x) < 0 && (start_y - end_y) < 0) {
            var i = start_x;
            var j = start_y;
            // Fill the downwards horizontal line with current player
            while (i != end_x) {
                i++;
                j++;
                Board.set_piece(current_board, i, j, current_player);
            }
        }
        // If the points are diagonally related & starting y > ending y
        else if ((start_x - end_x) < 0 && (start_y - end_y) > 0) {
            var i = start_x;
            var j = start_y;
            // Fille the upwards horizontal line with currrent player
            while (i != end_x) {
                i++;
                j--;
                Board.set_piece(current_board, i, j, current_player);
            }
        }
    }

    static checkAdjacent (current_board, x, y, current_player) {
        const tempx = parseInt(x);
        const tempy = parseInt(y);
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

        console.log("opposite_color: ", oppositeColor);
        if (x > 0){
            if (Board.get_piece(current_board, tempx-1, tempy) == oppositeColor){
                w = true;
                console.log('this evaluated');
            }
            // w = (Board.get_piece(current_board, x-1, y) == oppositeColor);
        }

        if (x < current_board.size - 1){
            if (Board.get_piece(current_board, tempx+1, tempy) == oppositeColor){
                e = true;
                console.log('this evaluated');
            }
        }   

        console.log(current_board.board);
        if (y > 0){
            n = (Board.get_piece(current_board, tempx, tempy-1) == oppositeColor);
        }
        if (y < current_board.size - 1){
            s = (Board.get_piece(current_board, tempx, tempy+1) == oppositeColor);
        }
        if (x > 0 && y > 0){
            nw = (Board.get_piece(current_board, tempx-1, tempy-1) == oppositeColor);
        }
        if (x > 0 && y < current_board.size - 1){
            sw = (Board.get_piece(current_board, tempx-1, tempy+1) == oppositeColor);
        }
        if (x < current_board.size - 1 && y > 0){
            ne = (Board.get_piece(current_board, tempx+1, tempy-1) == oppositeColor);
        }
        if (x < current_board.size - 1 && y < current_board.size - 1){
            se = (Board.get_piece(current_board, tempx+1, tempy+1) == oppositeColor);
        } 
        // console.log(w);
        // console.log(e);
        return n || nw || ne || e || w || s || sw || se;
    }
}

export{Board};
