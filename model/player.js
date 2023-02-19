export class Player {
    static X = new Player(1);
    static O = new Player(2);

    constructor(player_marker) {
        this.player_marker = player_marker;
    }

    enumerate() {
        return this.player_marker;
    }
}

console.log(Object.keys(Player));
console.log(Player.enumerate.O);


// Define a constant called active player. 

// Python example for reference
// from enum import IntEnum

// class Player(IntEnum):
//     X = 1
//     O = 2