const express = require ('express');
var router = express.Router();
const GameController = require('./scripts/controller/game_controller');

// const credential = {
//     email: 'admin@gmail.com',
//     password: 'admin123'
// };

// // login user
// router.post('/login', (req, res) => {
//     if(req.body.email == credential.email && req.body.password == credential.password) {
//         req.session.user = req.body.email;
//         res.redirect('/route/dashboard');
//     }
//     else {
//         res.end('Invalid User Email');
//     }
// })

// // route for dashboard
// router.get('/dashboard', (req, res) => {
//     if(req.session.user) {
//         res.render('dashboard', {user: req.session.user});
//     }
//     else
//     {
//         res.send('Unauthorized User');
//     }
// });

// // route for local select
// router.get('/localSelect', (req, res) => {
//     res.sendFile(__dirname + '/public/localSelect.html');
// });

// router.post('/localSettings', (req, res) => {
//     this.size = req.body.size;
//     this.player = req.body.player;
//     // this.NewGameController = new GameController(parseInt(size), parseInt(player));
// });

// // route for local game
// router.get('/localGame', (req, res) => {
//     res.sendFile(__dirname + '/public/localGame.html');
//     // send_size(size);
// });

// // function send_size(size) {
// //     io.broadcast.emit('update_size', JSON.stringify(size));
// //     console.log("I just emitted IO Style >:) with size", size);
// // };

// router.post('/localMove', (req, res) => {
//     var x = req.body.x;
//     var y = req.body.y;
//     // NewGameController.handle_move(x,y);
// });

// // route for local select
// router.get('/logout', (req, res) =>{
//     req.session.destroy(function(err){
//         if(err){
//             console.log(err);
//             res.send('Error');
//         }
//         else{
//             res.render('index', {title: 'Express', logout: "Logout Successful"})
//         }
//     });
// });


module.exports = router;