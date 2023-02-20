class LocalPlayer {
    constructor(starting_player) {
        // Start with user selected first player
        if (starting_player != 1 || starting_player != 2) {
            starting_player = 1;
        }
        // Otherwise default to Player 1 as starting player
        else {
            starting_player = starting_player;
        }
        this.player = starting_player;
    }

    static next_player (current_player) {
        // Change the current player when called
        if (current_player.player == 1) {
            current_player.player += 1;
        }
        else {
            current_player.player -= 1;
        }
    }
}

// Class test code (ctrl + / to uncomment)
// let newplayer = new LocalPlayer();
// console.log(newplayer);
// LocalPlayer.next_player(newplayer);
// console.log(newplayer);
// LocalPlayer.next_player(newplayer);
// console.log(newplayer);
// LocalPlayer.next_player(newplayer);
// console.log(newplayer);
// LocalPlayer.next_player(newplayer);
// console.log(newplayer);

// Define a constant called active player. 

// Python example for reference
// from enum import IntEnum

// class Player(IntEnum):
//     X = 1
//     O = 2