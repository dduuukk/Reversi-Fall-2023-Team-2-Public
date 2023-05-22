const Game = require('../model/game.js');
jest.setTimeout(5000);

describe('Game class testing', () => {
    var size;
    var game;
    var aiGame;
    var fourBoard = [[-1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, 0, 0, 0, 0, -1, -1],
                    [-1, -1, 0, 1, 2, 0, -1, -1],
                    [-1, -1, 0, 2, 1, 0, -1, -1],
                    [-1, -1, 0, 0, 0, 0, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1]];
    var expectedMove = [[-1, -1, -1, -1, -1, -1, -1, -1],
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

    test("create_game", () => {
        //tests constructor
        size = 4;
        var player = 1;
        game = new Game(size, player);
        expect(game.game_board.board).toStrictEqual(fourBoard);
        expect(game.size).toBe(size + 4);
        expect(game.player.player).toBe(player);
    });

    test("create_ai_game", () => {
        //tests constructor for ai game
        size = 4;
        var player = 1;
        var diff = 1;
        aiGame = new Game(size, player, diff);
        expect(aiGame.game_board.board).toStrictEqual(fourBoard);
        expect(aiGame.size).toBe(size + 4);
        expect(aiGame.player.player).toBe(player);
        expect(aiGame.ai.difficulty).toBe(diff);
    });

    test("return_board", () => {
        //tests returning board
        var returnedBoard = game.return_board();
        expect(returnedBoard).toStrictEqual(fourBoard);
    });

    test("get_valid_moves", () => {
        //find valid moves for player 1
        var moves = game.get_valid_moves();
        var expectedMoves = [[2,4],[3,5],[4,2],[5,3]];
        expect(moves).toStrictEqual(expectedMoves);
    });

    test("move_checker", () => {
        //check valid moves for different validity conditions
        var valid = game.move_checker(2, 4, 1);
        expect(valid).toBe(true);
        var invalid = game.move_checker(2, 2, 1);
        expect(invalid).toBe(false);
        invalid = game.move_checker(0, 0, 1);
        expect(invalid).toBe(false);
    });

    test("make_move", () => {
        //make a move and show board result
        expect(game.game_board.board).toStrictEqual(fourBoard);
        //make invalid move and observe no change
        game.make_move(0,0);
        expect(game.game_board.board).toStrictEqual(fourBoard);
        //make valid move
        game.make_move(4,2);
        expect(game.game_board.board).toStrictEqual(expectedMove);
    });

    test("make_player_move", () => {
        //make a player move and show board result
        expect(aiGame.game_board.board).toStrictEqual(fourBoard);
        //make invalid move and observe no change
        aiGame.make_player_move(0,0);
        expect(aiGame.game_board.board).toStrictEqual(fourBoard);
        //make valid move
        aiGame.make_move(4,2);
        expect(aiGame.game_board.board).toStrictEqual(expectedMove);
    });

    test("make_ai_move", () => {
        //make an ai move now and show board result
        expect(aiGame.game_board.board).toStrictEqual(expectedMove);
        aiGame.make_ai_move();
        expect(aiGame.game_board.board).toStrictEqual(expectedAIMove);
    });

});