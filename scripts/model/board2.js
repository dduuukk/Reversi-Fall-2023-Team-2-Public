class Board {
    // Construct board with starting pieces based on size
    constructor(size) {
        this.size = size;

        // Create starting board array
        this.board = this.#build_board()

        console.log(this.board)
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
        this.#check_valid_board_size()

        // Build an array of size size, fill with 0
        var board_array = new Array(this.size);
        for(let i = 0; i < this.size; i++) {
            board_array[i] = new Array(this.size);
            for(let j = 0; j < this.size; j++){
                board_array[i][j] = 0;
            }
        }

        // Place starting pieces of the 
        board_array = this.#place_starting_pieces(board_array)

        return board_array
    }

    #place_starting_pieces(board_array) {
        var starting_row = (this.size / 2) - 1;
        var starting_col = (board_array.length / 2) - 1;
        
        // Fill the board with 4 starting peices
        board_array[starting_row][starting_col] = 1;
        board_array[starting_row][starting_col + 1] = 2;
        board_array[starting_row + 1][starting_col] = 2;
        board_array[starting_row + 1][starting_col + 1] = 1;

        return board_array
    }

    get_piece (x, y) {
        return this.board[y][x]
    }

    
}


