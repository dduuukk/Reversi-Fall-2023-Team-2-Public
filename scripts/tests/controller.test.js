const GameController = require('../controller/game_controller.js');
jest.setTimeout(5000);

describe('GameController class testing', () => {
    var size;
    var player;
    var controller;
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
    var endedBoard = [[-1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, 1, 1, 2, 1, -1, -1],
                    [-1, -1, 1, 1, 2, 2, -1, -1],
                    [-1, -1, 1, 2, 1, 2, -1, -1],
                    [-1, -1, 1, 2, 1, 1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1]];

    test("setup", () => {
        //this function calls setup that populates the object
        size = 4;
        player = 1;
        var diff = 1;
        controller = new GameController();
        controller.setup(size, player, diff);
        expect(controller.current_game.game_board.board).toStrictEqual(fourBoard);
        expect(controller.board_size).toBe(size + 4);
        expect(controller.current_game.player.player).toBe(player);
    });

    test("check_win", () => {
        //check winner without filled board
        var result = controller.check_win();
        expect(result).toBe(0);
        //replace board with a filled board that player 1 won
        controller.current_game.game_board.board = endedBoard;
        result = controller.check_win();
        expect(result).toBe(1);
    });

    test("handle_move", () => {
        //Make a move and verify it results in the correct board
        controller.current_game.game_board.board = fourBoard;
        controller.handle_move(4, 2);
        expect(controller.current_game.game_board.board).toStrictEqual(playerMove);
    });

    test("handle_ai_player_move", () => {
        //Make a player move in an ai game and verify it results in the correct board
        controller.current_game.game_board.board = fourBoard;
        controller.handle_move(4, 2);
        expect(controller.current_game.game_board.board).toStrictEqual(playerMove);
    });

    test("handle_ai_move", () => {
        //Make an ai move and verify it results in the correct board
        controller.current_game.game_board.board = playerMove;
        controller.handle_ai_move();
        expect(controller.current_game.game_board.board).toStrictEqual(expectedAIMove);
    });
});