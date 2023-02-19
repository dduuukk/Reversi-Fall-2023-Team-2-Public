// import {Player} from 'C:\1. University\Spring 2023\4. SOFTWARE ENGINEERING\Reversi-Fall-2023-Team-2\model\player.js'

class Board {
    constructor(size) {
        this.size = size;

        // Check if the board size is valid
        if (this.size % 4 != 0) {
            console.log("Invalid board size! Returning to default board.");
            this.size = 8;
        }

        // Create 1D board array
        const half = (this.size) / 2;
        
        // Create 2D array, initialize to 0
        const board = Array.from(Array(half), _ => Array(half).fill(0));

        // Define starting board layout row and column
        const starting_row = (half / 2) - 1;
        const starting_col = (board.length / 2) - 1;

        // Fill the board with 4 starting peices
        board[starting_row][starting_col] = 1;
        board[starting_row][starting_col + 1] = 2;
        board[starting_row + 1][starting_col] = 2;
        board[starting_row + 1][starting_col + 1] = 1;

        // Define the board array
        this.board = board;
    }

    static get_piece (board, x, y) {
        // Return the piece at a specified board location
        return board.board[x][y];
    }

    static set_piece (current_board, x, y, value) {
        // Change the piece at a specified board location
        if (Board.get_piece(current_board, x, y) != 0){
            console.log("Piece already exists in this location!")
        }
        else {
            current_board.board[x][y] = value;
        }
    }
}


// Class test code
// const size = 12;
// let board1 = new Board(size);
// console.log(board1);
// console.log(Board.get_piece(board1, 2, 3));
// Board.set_piece(board1, 2, 1, 2);
// console.log(board1);
// Board.set_piece(board1, 2, 1, 1);
// console.log(board1);