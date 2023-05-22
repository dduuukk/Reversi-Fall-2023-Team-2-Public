const subject = require("./subject");

class LocalPlayer extends subject {
    constructor(starting_player) {
        super();
        this.player = starting_player;
    }

    next_player() {
        this.player = 3 - this.player;
        (async() => {
            await this.notify(this.player);
        })();
    }
}
module.exports = LocalPlayer;