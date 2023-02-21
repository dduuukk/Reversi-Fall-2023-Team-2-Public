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
        return 3 - current_player.player;
    }

    static return_player (current_player) {
        if (current_player.player == 1) {
            return 1;
        }
        else {
            return 2;
        }
    }
}

export {LocalPlayer};

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