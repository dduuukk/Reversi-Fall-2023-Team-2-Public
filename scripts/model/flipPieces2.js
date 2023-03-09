import {Board} from "./board2.js"

class flipPieces extends Board {
    constructor() {
        super(board, size)
    }

    flip_pieces (x, y, player) {
        // Set constants to input values for easier reading
        var size = this.size;
        var originalX = x;
        var originalY = y;
        
        // Check LEFT
        x = originalX;
        y = originalY;

        




        //Check that x is not at left border
        if (x != 0) {
        console.log("LEFT");
        while (Board.get_piece(x, y) > 0) {
                x--;
                // Check if current point is an endpoint
                if(Board.check_endpoints(originalX, originalY, x, y) == -1) {
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
            while (Board.get_piece(x, y) > 0) {
                x++;
                // Check if current point is an endpoint
                if(Board.check_endpoints(originalX, originalY, x, y) == -1) {
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
            while (Board.get_piece(x, y) > 0) {
                y--;
                // Check if current point is an endpoint
                if(Board.check_endpoints(originalX, originalY, x, y) == -1) {
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
            while (Board.get_piece(x, y) > 0) {
                y++;
                // Check if current point is an endpoint
                if(Board.check_endpoints(originalX, originalY, x, y) == -1) {
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
            while (Board.get_piece(x, y) > 0) {
                console.log("RIGHT -> UP");
                x++;
                y--;
                // Check if current point is an endpoint
                if(Board.check_endpoints(originalX, originalY, x, y) == -1) {
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
            while (Board.get_piece(x, y) > 0) {
                x--;
                y--;
                // Check if current point is an endpoint
                if(Board.check_endpoints(originalX, originalY, x, y) == -1) {
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
            while (Board.get_piece(x, y) > 0) {
                
                x++;
                y++;
                // Check if current point is an endpoint
                if(Board.check_endpoints(originalX, originalY, x, y) == -1) {
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
            while (Board.get_piece(x, y) > 0) {
                x--;
                y++;
                // Check if current point is an endpoint
                if(Board.check_endpoints(originalX, originalY, x, y) == -1) {
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
    flip (start_x, start_y, end_x, end_y) {
        // If starting x > ending x, swith the two points
        if (start_x > end_x) {
            end_x = [start_x, start_x = end_x][0];
            end_y = [start_y, start_y = end_y][0];
        }
        
        // If the points are related vertically
        if (start_x - end_x == 0) {
            // If starting y > ending y, switch the two y values
            if (start_y > end_y) {
                end_y = [start_y, start_y = end_y][0];
            }
            
            // Fill the vertical line with currrent player
            for (var j = start_y; j <= end_y; j++){
                Board.set_piece(start_x, j);
            }
        }
        // If the points are horizontally related
        else if (start_y - end_y == 0) {
            // Fill the horizontal line with current player
            for (var i = start_x; i <= end_x; i++){
                Board.set_piece(i, start_y);
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
                Board.set_piece(i, j);
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
                Board.set_piece(i, j);
            }
        }
    }

}