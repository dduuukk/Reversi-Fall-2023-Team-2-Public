const LocalPlayer = require('../model/player.js');
jest.setTimeout(5000);

describe('Player class testing', () => {
    test("create_player", () => {
        //test constructor
        var playerOne = new LocalPlayer(1);
        expect(playerOne.player).toBe(1);
    });

    test("next_player", () => {
        //test switching to the next player
        var playerOne = new LocalPlayer(1);
        playerOne.next_player();
        expect(playerOne.player).toBe(2);
        //test switching back
        playerOne.next_player();
        expect(playerOne.player).toBe(1);
    });
});