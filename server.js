// Import dependencies for the server communication
const express = require ('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const favicon = require('serve-favicon');


const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');
const {v4: uuidv4 } = require ('uuid');
const GameController = require('./scripts/controller/game_controller');
const AI = require('./scripts/model/ai');
const DBCheckLogin = require('./scripts/model/Database/db_checklogin');
const DBBoard = require('./scripts/model/Database/db_board');

const board_observer = require('./scripts/model/Database/db_board');

var db_login = new DBCheckLogin();
var db_board;



var router = require('./router');

const port = 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

// Load static assets
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/socket', express.static(path.join(__dirname, 'node_modules/socket.io/client-dist')));
app.use(favicon(__dirname + '/public/assets/favicon.png'));

var NewGameController;
var size;
var obs;
var username;

app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}));

// app.use('/route', router);

// Home page route
app.get('/', (req, res) => {
    res.render('index');

});

// Login route
app.post('/login', (req, res) => {
    console.log(req.body.username, req.body.password);
    (async () => {
        if (await db_login.match_password(req.body.username, req.body.password)) {
            console.log('Passwords match!');
            req.session.user = req.body.username;
            res.redirect('/gameMode');
        }
        else {
            res.render('index', { username: req.body.username, password: req.body.username, passwordfail: 'Incorrect Username or Password!'});
        }
    })();
})

// New account route
app.get('/registerNew', (req, res) => {
    res.render('registerNew');
});

app.post('/newAccount', (req, res) => {
    console.log(req.body.username, req.body.password);
    (async() => {
        if(req.body.confirmpassword != req.body.password) {
            res.render('registerNew', { username: req.body.username, password: req.body.username, passwordfail: 'Passwords do not match!'});
        }
        else if(db_login.insert_new_player(req.body.username, req.body.password)) {
            req.session.user = req.body.username;
            // console.log(req.session.user);
            res.redirect('/gameMode');
        }
        else {
            res.render('registerNew', { username: req.body.username, password: req.body.username, passwordfail: 'Username already taken!'});
        }
    })();
    
})

// Game mode selection route
app.get('/gameMode', (req, res) => {
    res.sendFile(__dirname + '/public/gamemode.html');
    //check username with req.session.user and send over
    username = req.session.user;
    //check for board in database and if not null then send over

});

// Dashboard route
app.get('/dashboard', (req, res) => {
    if(req.session.user) {
        res.render('dashboard', {user: req.session.user});
    }
    else
    {
        res.send('Unauthorized User');
    }
});

// Local select route
app.get('/localSelect', (req, res) => {
    res.sendFile(__dirname + '/public/localSelect.html');
});

// Local select route
app.get('/aiSelect', (req, res) => {
    res.sendFile(__dirname + '/public/aiSelect.html');
});



app.post('/localSettings', (req, res) => {
    size = req.body.size;
    var player = req.body.player;
    console.log('Starting player from HTML', player);
    NewGameController = new GameController(parseInt(size), player);
    console.log('Game controller created');
});

app.post('/aiSettings', (req, res) => {
    size = req.body.size;
    var difficulty = req.body.difficulty;
    NewGameController = new GameController(parseInt(size), 1, parseInt(difficulty));
    console.log('Game controller created');
});

// route for local game
app.get('/localGame', (req, res) => {
    res.sendFile(__dirname + '/public/localGame.html');
    obs = new board_observer(req.session.user);
    subscribe();
    // send_size(size);
});

app.get('/aiGame', (req, res) => {
    res.sendFile(__dirname + '/public/aiGame.html');
    obs = new board_observer(req.session.user);
    subscribe();
    // send_size(size);
});

function subscribe() {
    NewGameController.current_game.game_board.subscribe(obs);
    NewGameController.current_game.player.subscribe(obs);
}

// route for local select
app.get('/logout', (req, res) =>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send('Error');
        }
        else{
            res.render('index', {title: 'Express', logout: "Logout Successful"})
        }
    });
});

io.on('connection', socket => {
    console.log('Connected to socket');
    socket.on('update_start', message => {
        io.emit('update_size', JSON.stringify(size));
    })
    socket.on('pieces_start', message => {
        io.emit('pieces_display', JSON.stringify(NewGameController.current_game.game_board.board));
    })
    socket.on('moves_start', message => {
        io.emit('moves_display', JSON.stringify(NewGameController.display_moves()));
    })
    socket.on('scores_start', message => {
        io.emit('scores_display', JSON.stringify(NewGameController.display_scores()));
    })
    socket.on('get_user_start', message => {
        io.emit('get_user', JSON.stringify(username));
    })
    socket.on('move_click', message => {
        var array = JSON.parse(message);
        var x = array[0];
        var y = array[1];
        NewGameController.handle_move(x,y);
        io.emit('pieces_display', JSON.stringify(NewGameController.current_game.game_board.board));
        io.emit('moves_display', JSON.stringify(NewGameController.display_moves()));
        io.emit('scores_display', JSON.stringify(NewGameController.display_scores()));
        if(NewGameController.check_win()) {
            //destroy board from database

            io.emit('winner_display', JSON.stringify(NewGameController.check_win()));
        }
    })
    socket.on('ai_move_click', message => {
        var array = JSON.parse(message);
        var x = array[0];
        var y = array[1];
        NewGameController.handle_ai_player_move(x,y);
        io.emit('pieces_display', JSON.stringify(NewGameController.current_game.game_board.board));
        io.emit('scores_display', JSON.stringify(NewGameController.display_scores()));
        NewGameController.handle_ai_move();
        io.emit('pieces_display', JSON.stringify(NewGameController.current_game.game_board.board));
        io.emit('moves_display', JSON.stringify(NewGameController.display_moves()));
        io.emit('scores_display', JSON.stringify(NewGameController.display_scores()));
        if(NewGameController.check_win()) {
            //database
            io.emit('winner_display', JSON.stringify(NewGameController.check_win()));
        }
    })
})


server.listen(port, () => {
    console.log('Listening to Server http://localhost:3000')
});