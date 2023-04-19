// Server IO communication dependencies
const express = require ('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');
const bodyparser = require('body-parser');

// Game model dependencies
const GameController = require('./scripts/controller/game_controller');
const AI = require('./scripts/model/ai');
const DBCheckLogin = require('./scripts/model/Database/db_checklogin');
const DBBoard = require('./scripts/model/Database/db_board');
const board_observer = require('./scripts/model/Database/db_board');

// Client dependencies
const favicon = require('serve-favicon');


app.set('view engine', 'ejs');
const port = 3000 || process.env.PORT;
// Load static assets
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/socket', express.static(path.join(__dirname, 'node_modules/socket.io/client-dist')));
app.use(favicon(__dirname + '/public/assets/favicon.png'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

var db_login = new DBCheckLogin();
var db_board;
var players_in_fourbyfour = [];
var online_fourbyfour_controller;


// Home page route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

//
function database_board_player_subscribe(game_controller, observer) {
    game_controller.current_game.game_board.subscribe(observer);
    game_controller.current_game.player.subscribe(observer);
}

function check_game_join_valid(username) {
    if(players_in_fourbyfour.length < 2 || typeof(players_in_fourbyfour.length) == 'undefined') {
        return true;
    }
    else if(players_in_fourbyfour[0] == username || players_in_fourbyfour[1] == username) {
        return true;
    }
    return false;
}

// Socket connection
io.on('connection', socket => {
    console.log(`Connected to socket ${socket.id}`);

    socket.game_controller = new GameController();
    socket.player_username;
    socket.online_room_name;
    socket.player_num;
    socket.obs;

    // Check login creds with DB
    socket.on('send_login', message => {
        var username = message.username;
        var password = message.password;
        socket.player_username = username;
        console.log(`Socket username redefined to ${socket.player_username}`);
        (async () => {
            if (await db_login.match_password(username, password)) {
                socket.emit('return_login', true);
            }
            else {
                socket.emit('return_login', false);
            }
        })();
    });

        // Check login creds with DB
        socket.on('send_credentials', message => {
            var username = message.username;
            var password = message.password;
            socket.player_username = username;
            console.log(`Socket username redefined to ${socket.player_username}`);
            (async () => {
                if (await db_login.insert_new_player(username, password) == false) {
                    socket.emit('return_credentials', false);
                }
                else {
                    
                    socket.emit('return_credentials', true);
                }
            })();
        });

    // Initial either of the 3 gamemodes
    socket.on('send_settings', message => {
        socket.obs = new board_observer(message.username);
        (async () => {
            console.log('socket obs:', await socket.obs.read_board_from_db());

            if(await socket.obs.read_board_from_db() != false) {
                console.log(`The input size is ${message.size} and player is ${message.player}`);
                socket.game_controller.setup(parseInt(message.size), parseInt(message.player));
                
                database_board_player_subscribe(socket.game_controller, socket.obs);
                var new_board 
                
                    new_board = await socket.obs.read_board_from_db();
                    console.log(new_board);
                    socket.game_controller.current_game.game_board.board = new_board;
                    socket.emit('settings_process', 1);
            }
            else {
                console.log('PLEASE TELL ME YOU MADE IT HERE');
                console.log(`The input size is ${message.size} and player is ${message.player}`);
                socket.game_controller.setup(parseInt(message.size), parseInt(message.player));
                socket.obs = new board_observer(message.username);
                database_board_player_subscribe(socket.game_controller, socket.obs);
                socket.emit('settings_process', 1);
            }
        })();
        
    });
    socket.on('send_ai_settings', message => {
        console.log(`The input size is ${message.size} and difficulty is ${message.diff}`);
        socket.game_controller.setup(parseInt(message.size), 1, parseInt(message.diff));
        // place the database stuff here
        socket.emit('settings_process', 1);
    });
    socket.on('send_online_settings', message => {
        if(check_game_join_valid(message.username)) {
            if(message.size == 4) {
                console.log(`Connected to room 4x4`);
                socket.online_room_name = '4x4';
            }
            else if(message.size == 8) {
                console.log(`Connected to room 8x8`);
                socket.online_room_name = '8x8';
            }
            else {
                console.log(`Connected to room 10x10`);
                socket.online_room_name = '10x10';
            }
            players_in_fourbyfour.push(message.username);
            if(players_in_fourbyfour[0] == message.username) {
                socket.player_num = 1;
            }
            else{
                socket.player_num = 2;
                socket.emit('found_player', players_in_fourbyfour[0]);
                socket.emit('opponent_move', 1);
            }
        }
        
        socket.join(socket.online_room_name);
        socket.game_controller.setup(parseInt(message.size), 1);
        // place the database stuff here
        socket.player_username = message.username;
        console.log(`Player ${message.username} joined the game`);
        console.log('Room array size', players_in_fourbyfour.length);
        io.to(socket.online_room_name).emit('found_player', message.username);
        io.to(socket.online_room_name).emit('join_log', 'A player has joined the game!!');
        console.log('room player array', players_in_fourbyfour);
        socket.emit('settings_process', 1);
    });
    socket.on('update_start', message => {
        // console.log('socket.game_controller is', socket.game_controller);
        socket.emit('update_size', JSON.stringify(socket.game_controller.board_size));
    });
    socket.on('pieces_start', message => {
        socket.emit('pieces_display', JSON.stringify(socket.game_controller.current_game.game_board.board));
    });
    socket.on('moves_start', message => {
        socket.emit('moves_display', JSON.stringify(socket.game_controller.display_moves()));
    });
    socket.on('scores_start', message => {
        socket.emit('scores_display', JSON.stringify(socket.game_controller.display_scores()));
        socket.emit('scores_start_done', 1);
    });
    socket.on('get_user_start', message => {
        socket.emit('get_user', JSON.stringify(socket.player_username));
    });
    socket.on('message_opponent', message => {
        socket.emit('opponent_move', JSON.stringify(socket.player_username));
    });
    socket.on('message_yours', message => {
        socket.emit('your_move', JSON.stringify(socket.player_username));
    });
    socket.on('move_click', message => {
        var array = JSON.parse(message);
        var x = parseInt(array[0]);
        var y = parseInt(array[1]);
        console.log('click c & y:', x, y)
        socket.game_controller.handle_move(x,y);
        socket.emit('pieces_display', JSON.stringify(socket.game_controller.current_game.game_board.board));
        socket.emit('moves_display', JSON.stringify(socket.game_controller.display_moves()));
        socket.emit('scores_display', JSON.stringify(socket.game_controller.display_scores()));
        if(socket.game_controller.check_win()) {
            //destroy board from database
            
            socket.emit('winner_display', JSON.stringify(socket.game_controller.check_win()));
        }
    });
    socket.on('ai_move_click', message => {
        var array = JSON.parse(message);
        var x = parseInt(array[0]);
        var y = parseInt(array[1]);
        console.log('click c & y:', x, y)

        socket.game_controller.handle_ai_player_move(x,y);
        socket.emit('pieces_display', JSON.stringify(socket.game_controller.current_game.game_board.board));
        socket.emit('scores_display', JSON.stringify(socket.game_controller.display_scores()));
        socket.game_controller.handle_ai_move();
        socket.emit('pieces_display', JSON.stringify(socket.game_controller.current_game.game_board.board));
        socket.emit('moves_display', JSON.stringify(socket.game_controller.display_moves()));
        socket.emit('scores_display', JSON.stringify(socket.game_controller.display_scores()));
        if(socket.game_controller.check_win()) {
            //database
            socket.emit('winner_display', JSON.stringify(socket.game_controller.check_win()));
        }
    });
    socket.on('link_click', message => {
        var object = {
            x: message.x,
            y: message.y
        }
        socket.username = message.username;
        if(socket.player_num == socket.game_controller.current_game.player.player) {
            io.to(socket.online_room_name).emit('linked', object);
        }
        
    });
    socket.on('online_move_click', (message) => {
        if(players_in_fourbyfour.length <= 1){
            socket.emit('invalid_move', 'Another player has not yet joined the game');
            console.log('User has not yet joined');
        }
        else {
            var x = parseInt(message.x);
            var y = parseInt(message.y);
            console.log('x & y:', x, y);
            socket.game_controller.handle_move(x,y);
            console.log('board', socket.game_controller.current_game.game_board.board);
            io.to(socket.online_room_name).emit('pieces_display', JSON.stringify(socket.game_controller.current_game.game_board.board));
            console.log('socket player_num:', socket.player_num, 'player', socket.game_controller.current_game.player.player);
            // In order to show valid moves for only active player, check the local username with the socket username
            // need to pass in local username in object
            if(socket.player_num != socket.game_controller.current_game.player.player){
                console.log('made it here lol')
                socket.emit('moves_display', JSON.stringify(socket.game_controller.display_moves()));
            }
            io.to(socket.online_room_name).emit('scores_display', JSON.stringify(socket.game_controller.display_scores()));
            io.to(socket.online_room_name).emit('switch_move', 1);
            if(socket.game_controller.check_win()) {
                //database
                var winningUser;
                var checkWinner = socket.game_controller.check_win();
                console.log(checkWinner);
                if(checkWinner == 1){
                    winningUser = players_in_fourbyfour[0];
                }
                else if (checkWinner == 2){
                    winningUser = players_in_fourbyfour[1];
                }
                else if (checkWinner == 3){
                    winningUser = 3;
                }
                
                console.log('Win screen reached!')
                io.to(socket.online_room_name).emit('winner_online_display', winningUser);
                players_in_fourbyfour.length = 0;
            }
        }
    });
    socket.on('destroy_game_arr', message => {
        console.log('game array destroyed');
        players_in_fourbyfour.length = 0;
    })
    socket.on('get_user_gamemode', message => {
        (async () => {
            console.log('finding board for', message);
            socket.obs = new board_observer(message);
            var board = await socket.obs.read_board_from_db();
        if(board != false) {
            console.log('Found an existing board of', board);
            socket.emit('existing_board', board);
        }
        })();
    });
    socket.on('delete_db_board', message => {
        (async () => {
            await socket.obs.delete_board();
        })();
    })
});

server.listen(port, () => {
    console.log('Listening on Server http://localhost:3000')
});