const AI = require('../model/ai.js');
jest.setTimeout(5000);

describe('AI class testing', () => {
    var ai;
    var size;
    var diff;
    var fourBoard = [[-1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, 0, 0, 0, 0, -1, -1],
                    [-1, -1, 0, 1, 2, 0, -1, -1],
                    [-1, -1, 0, 2, 1, 0, -1, -1],
                    [-1, -1, 0, 0, 0, 0, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1]];
    var playerMove = [[-1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, 0, 0, 1, 0, -1, -1],
                    [-1, -1, 0, 1, 1, 0, -1, -1],
                    [-1, -1, 0, 2, 1, 0, -1, -1],
                    [-1, -1, 0, 0, 0, 0, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1]];
    var expectedAIMove = [[-1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, 0, 0, 1, 2, -1, -1],
                    [-1, -1, 0, 1, 2, 0, -1, -1],
                    [-1, -1, 0, 2, 1, 0, -1, -1],
                    [-1, -1, 0, 0, 0, 0, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1]];

    test("create_ai", () => {
        //tests constructor
        size = 8;
        diff = 1;
        ai = new AI(diff, size);
        expect(ai.original_board.board).toStrictEqual(fourBoard);
        expect(ai.size).toBe(size);
        expect(ai.difficulty).toBe(diff);
    });

    test("get_ai_valid_moves", () => {
        //get valid moves after player move
        ai.original_board.board = playerMove;
        ai.get_ai_valid_moves(ai.original_board);
        expect(ai.moves).toStrictEqual([[3,2],[5,2],[5,4]]);
    });

    test("return_ai_valid_moves", () => {
        //return valid moves in array
        var moves = ai.return_ai_valid_moves(ai.original_board);
        expect(moves).toStrictEqual([[3,2],[5,2],[5,4]]);
    });

    test("make_temp_move", () => {
        //make a move in the temp board and check result
        ai.temp_board.board = playerMove;
        ai.make_temp_move(5, 2, 2);
        expect(ai.temp_board.board).toStrictEqual(expectedAIMove);
    });

    test("min_or_max_value", () => {
        //get returned v value to determine move after player move
        ai.temp_board.board = playerMove;
        var v = ai.min_or_max_value(ai.temp_board, true, ai.difficulty);
        expect(v).toBe(10);
    });

    test("minimax", () => {
        //get returned v value to determine move after player move (same return as above)
        ai.temp_board.board = playerMove;
        var v = ai.minimax(ai.temp_board, true, ai.difficulty);
        expect(v).toBe(10);
    });

    test("get_state", () => {
        //get difference between two scores and apply corner bonus to assign v to move
        ai.temp_board.board = playerMove;
        var scoreDiff = ai.get_state(ai.temp_board);
        expect(scoreDiff).toBe(2);
    });

    test("get_ai_scores", () => {
        //get scores for players 1 and 2
        ai.temp_board.board = playerMove;
        var scores = ai.get_ai_scores(ai.temp_board);
        expect(scores).toStrictEqual([3, 3]);
    });

    test("make_ai_move", () => {
        //returns best possible move to make in circumstance
        ai.original_board.board = playerMove;
        var move = ai.make_ai_move(ai.original_board);
        expect(move).toStrictEqual([3, 2]);
    });

});