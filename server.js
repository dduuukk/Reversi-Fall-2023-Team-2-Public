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
var obs;

// Home page route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

//
function database_board_player_subscribe(game_controller) {
    game_controller.current_game.game_board.subscribe(obs);
    game_controller.current_game.player.subscribe(obs);
}

// Socket connection
io.on('connection', socket => {
    console.log(`Connected to socket ${socket.id}`);

    socket.game_controller = new GameController();
    socket.player_username = 'Null';

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
    socket.on('send_settings', message => {
        console.log(`The input size is ${message.size} and player is ${message.player}`);
        socket.game_controller.setup(parseInt(message.size), parseInt(message.player));
        obs = new board_observer(socket.username);
        database_board_player_subscribe(socket.game_controller);
        socket.emit('settings_process', 1);
    });
    socket.on('send_ai_settings', message => {
        console.log(`The input size is ${message.size} and difficulty is ${message.diff}`);
        socket.game_controller.setup(parseInt(message.size), 1, parseInt(message.diff));
        // place the database stuff here
        socket.emit('settings_process', 1);
    });
    socket.on('send_online_settings', message => {
        if(message.size == 4) {
            console.log(`Connected to room 4x4`);
            socket.join('4x4');
        }
        else if(message.size == 8) {
            console.log(`Connected to room 8x8`);
            socket.join('8x8');
        }
        else {
            console.log(`Connected to room 10x10`);
            socket.join('10x10');
        }
        console.log(`The input size is ${message.size}`);
        socket.game_controller.setup(parseInt(message.size), 1);
        // place the database stuff here
        console.log(`Player ${message.username} joined the game`);
        socket.to('4x4').emit('found_player', message.username);
        socket.to('4x4').emit('join_log', 'A player has joined the game!!');
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
    socket.on('move_click', message => {
        var array = JSON.parse(message);
        var x = array[0];
        var y = array[1];
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
        var x = array[0];
        var y = array[1];
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

    // Change this message name tbh idk
    socket.on('create_room', message => {
        // if(message.size == 4) {
        //     socket.join('4x4');
        // }
        // else if(message.size == 8) {
        //     socket.join('8x8');
        // }
        // else {
        //     socket.join('10x10');
        // }
    });

    socket.on('online_move_click', message => {
        var array = JSON.parse(message);
        var x = array[0];
        var y = array[1];
        socket.game_controller.handle_move(x,y);
        socket.emit('pieces_display', JSON.stringify(socket.game_controller.current_game.game_board.board));
        socket.emit('scores_display', JSON.stringify(socket.game_controller.display_scores()));
        if(socket.game_controller.check_win()) {
            //database
            socket.emit('winner_display', JSON.stringify(socket.game_controller.check_win()));
        }
        socket.emit('opponent_move', 1);
        //get move from opponent and switch active player in controller
        socket.emit('pieces_display', JSON.stringify(socket.game_controller.current_game.game_board.board));
        socket.emit('moves_display', JSON.stringify(socket.game_controller.display_moves()));
        socket.emit('scores_display', JSON.stringify(socket.game_controller.display_scores()));
        socket.emit('your_move', 1);
        if(socket.game_controller.check_win()) {
            //database
            socket.emit('winner_display', JSON.stringify(socket.game_controller.check_win()));
        }
    });
});

server.listen(port, () => {
    console.log('Listening on Server http://localhost:3000')
});