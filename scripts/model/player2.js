class LocalPlayer {
    constructor(starting_player) {
        this.player = starting_player;
    }

    next_player() {
        this.player = 3 - this.player;
    }
}