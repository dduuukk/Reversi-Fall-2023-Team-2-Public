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
        const boardarr = Array.from(Array(half), _ => Array(half).fill(0));

        // Define starting board layout row and column
        const starting_row = (half / 2) - 1;
        const starting_col = (boardarr.length / 2) - 1;

        // Fill the board with 4 starting peices
        boardarr[starting_row][starting_col] = 1;
        boardarr[starting_row][starting_col + 1] = 2;
        boardarr[starting_row + 1][starting_col] = 2;
        boardarr[starting_row + 1][starting_col + 1] = 1;

        this.boardarr = boardarr;

        return boardarr;
    }
}


// Class test code
const size = 12;
let board = new Board(size);
console.log(board);



// 
// 0 for empty, 1 for black, 2 for white

// from model.player import Player

// class Board:
//     def __init__(self, size) -> None:
//         self.size = size
//         self.grid = [[0]*size for _ in range(size)]
        
//     def __getitem__(self, location):
//         return self.grid[location[0]][location[1]]
    
//     def __setitem__(self, location, player: Player):
//         self.grid[location[0]][location[1]] = player