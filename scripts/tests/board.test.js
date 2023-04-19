const Board = require('../model/board.js');
jest.setTimeout(5000);

describe('Board class testing', () => {
    var size;
    var board;
    var fourBoard = [[-1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, 0, 0, 0, 0, -1, -1],
                    [-1, -1, 0, 1, 2, 0, -1, -1],
                    [-1, -1, 0, 2, 1, 0, -1, -1],
                    [-1, -1, 0, 0, 0, 0, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1]];
    
    test("create_board", () => {
        //this function calls all private methods that are used in the constructor
        size = 4;
        board = new Board(size);
        expect(board.board).toStrictEqual(fourBoard);
    });

    test("get_piece", () => {
        //get pieces from the board
        var cell = board.get_piece(0, 0);
        expect(cell).toBe(-1);
        cell = board.get_piece(3, 3);
        expect(cell).toBe(1);
    });

    test("set_piece", () => {
        //get piece first
        var cell = board.get_piece(3, 3);
        expect(cell).toBe(1);
        //set piece to other player
        board.set_piece(3, 3, 2);
        cell = board.get_piece(3, 3);
        expect(cell).toBe(2);
        //set back
        board.set_piece(3, 3, 1);
        cell = board.get_piece(3, 3);
        expect(cell).toBe(1);
    });

    test("get_endpoints", () => {
        //recieve endpoints from given point
        var endpoints = board.get_endpoints(3, 2, 2);
        expect(endpoints).toStrictEqual([[3,4]]);
    });

    test("flip_pieces", () => {
        //flip piece from point on new board
        var flip_board = new Board(size);
        flip_board.flip_pieces(3, 2, 2);
        fourBoard[3][3] = 2;
        expect(flip_board.board).toStrictEqual(fourBoard);
        //undo expected board change
        fourBoard[3][3] = 1;
    });

    test("get_valid_moves", () => {
        //find valid moves for player 2
        var moves = board.get_valid_moves(2);
        var expectedMoves = [[2,3],[3,2],[4,5],[5,4]];
        expect(moves).toStrictEqual(expectedMoves);
    });

    test("in_valid_moves", () => {
        //check if point is in valid moves
        var valid = board.in_valid_moves(3, 2, 2);
        expect(valid).toBe(true);
        //check point not in valid moves
        var invalid = board.in_valid_moves(3, 3, 2);
        expect(invalid).toBe(false);
    });

    test("return_size", () => {
        //return size of board
        var foundSize = board.return_size();
        expect(foundSize).toBe(size + 4);
    });

    test("clone", () => {
        //return cloned board
        var clonedBoard = board.clone();
        expect(clonedBoard).toStrictEqual(fourBoard);
    });
});