const GameLogic = require('../model/game_logic.js');
jest.setTimeout(5000);

describe('GameLogic class testing', () => {
    var game_logic;
    var size;
    var fourBoard = [[-1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, 0, 0, 0, 0, -1, -1],
                    [-1, -1, 0, 1, 2, 0, -1, -1],
                    [-1, -1, 0, 2, 1, 0, -1, -1],
                    [-1, -1, 0, 0, 0, 0, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1]];
    var endedBoard = [[-1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, 1, 1, 2, 1, -1, -1],
                    [-1, -1, 1, 1, 2, 2, -1, -1],
                    [-1, -1, 1, 2, 1, 2, -1, -1],
                    [-1, -1, 1, 2, 1, 1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1]];

    test("create_game_logic", () => {
        //test constructor
        size = 4;
        var player = 1;
        game_logic = new GameLogic(size, player);
        expect(game_logic.game_board.board).toStrictEqual(fourBoard);
        expect(game_logic.size).toBe(size + 4);
        expect(game_logic.player.player).toBe(player);
    });

    test("get_scores", () => {
        //test getting the scores
        var scores = game_logic.get_scores();
        expect(scores).toStrictEqual([2,2]);
        //add new piece for player 1
        game_logic.game_board.set_piece(2,2,1);
        scores = game_logic.get_scores();
        expect(scores).toStrictEqual([3,2]);
    });

    test("check_winner", () => {
        //check winner without filled board
        var result = game_logic.check_winner();
        expect(result).toBe(0);
        //replace board with a filled board that player 1 won
        game_logic.game_board.board = endedBoard;
        result = game_logic.check_winner();
        expect(result).toBe(1);
    });

});