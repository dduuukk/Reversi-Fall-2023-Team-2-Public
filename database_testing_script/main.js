import { DBCheckLogin } from "./db_checklogin.js";
import { DBNewPlayer } from "./db_new_player.js";
import { DBReadBoard } from "./db_read_board.js";
import { DBUpdateBoard } from "./db_update_board.js";
import { DBChangeColor } from "./db_change_color.js";
import PromptSync from "prompt-sync";
const prompt = PromptSync();

console.log(`Select Option:`);

var loop = true;
while (loop) {
    var inp = prompt("1. Login, 2. Create New Account, 3. Update Board, 4. Change Color: ");
    switch(inp) {
        case 'login':
            await test_login();
            break;
        case 'create new account':
            await test_create_account();
            break;
        case 'update board':
            await test_update_board();
            break;
        case 'change color':
            await change_color();
            break;
        case 'terminate':
            loop = false;
            break;
        default:
            console.log(`Not an option!`)
            break;
    }
}


async function test_login() {
    var dbcl = new DBCheckLogin();
    var username = prompt("Input Username: ");
    var password = prompt("Input Password: ");
    if(await dbcl.match_password(username, password)) {
        console.log("Username and Password Match, Logging In!");
    }
    else {
        console.log("Incorrect Username and Password!");
    }
}

async function test_create_account() {
    var dbnp = new DBNewPlayer();
    var username = prompt("Input Username: ");
    var password = prompt("Input Password: ");
    if(await dbnp.insert_new_player(username, password) == false) {
        console.log('Username Already Taken!, Try Again')
        test_create_account();
    }
    else {
        console.log('Username Accepted!')
    }
}

async function test_update_board() {
    var dbub = new DBUpdateBoard('testplayer');
    var dbrb = new DBReadBoard('testplayer');
    
    var board_array_init = [
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, 0, 0, 0, 0, -1, -1],
        [-1, -1, 0, 1, 2, 0, -1, -1],
        [-1, -1, 0, 2, 1, 0, -1, -1],
        [-1, -1, 0, 0, 0, 0, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1],
    ];

    var board_array_update = [
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, 0, 0, 1, 0, -1, -1],
        [-1, -1, 0, 1, 1, 0, -1, -1],
        [-1, -1, 0, 2, 1, 0, -1, -1],
        [-1, -1, 0, 0, 0, 0, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1],
    ];

    console.log('Setting board to init value!');
    await dbub.store_board(board_array_init);

    console.log('Getting board from DB!');
    var b_a_i_db = await dbrb.read_board_from_db();
    console.log('Board input into database: \n', board_array_init, '\n Board returned from database: \n', b_a_i_db);

    var yn = prompt ('Update the init board with new board? ')
    if(yn == 'yes') {
        console.log('Setting board to init value!');
        await dbub.store_board(board_array_update);

        console.log('Getting board from DB!');
        var b_a_u_db = await dbrb.read_board_from_db();
        console.log('Board input into database: \n', board_array_update, '\n Board returned from database: \n', b_a_u_db);
    }

    var yn2 = prompt ('Delete the board? ');
    if(yn2 == 'yes') {
        console.log('Deleting board');
        await dbub.delete_board();

        console.log('Board deleted!');
    }
}

async function change_color() {
    var dbcc = new DBChangeColor('testplayer');
    var inp = prompt('Change color? ')
    if(inp == 'yes') {
        var color = prompt('Select Color: ')
        await dbcc.change_color(color);
        change_color();
    }
}
