class LocalPlayer {
    constructor(starting_player) {
        this.player = starting_player;
    }

    // Switch the player
    static next_player (current_player) {
        // Change the current player when called
        current_player.player = 3 - current_player.player;
    }

    // Return the current player
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
