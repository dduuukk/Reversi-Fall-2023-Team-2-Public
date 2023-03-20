import { GameController } from './controller/game_controller.js';

//Running Game Calls ---------------------------------------------------

//running the local game if we are on game page
if(window.location.href.indexOf('localGame.html') != -1){
    //get stored values from settings select page
    var chosenSize = localStorage.getItem('boardSize');
    var chosenStart = localStorage.getItem('startingPlayer');
    var newGameController = new GameController(chosenSize, chosenStart);
    //show board and pieces
    newGameController.startLocalGame();
}

//running the ai game if we are on game page
if(window.location.href.indexOf('aiGame.html') != -1){
    //get stored values from settings select page
    var chosenSize = localStorage.getItem('boardSize');
    var newGameController = new GameController(chosenSize, 1);
    //show board and pieces
    newGameController.startAIGame();
}



//Handle Login
if(window.location.href.indexOf('index.html') != -1){
    //if the buttons are clicked then save the settings
    localStorage.setItem('Name', 'Guest');
    var loginButton = document.getElementById('loginButton');
    var usernameBox = document.getElementById('usernameBox');
    var passwordBox = document.getElementById('passwordBox');
    loginButton.addEventListener('click', e => {
            //var button = e.currentTarget;
            //send json response to database and pass in
            //usernameBox.textContent
            //passwordBox.textContent

            /* Reference for this type of communication
            https://www.geeksforgeeks.org/how-to-connect-sql-server-database-from-javascript-in-the-browser/
            */
    });

    /*if(valid_response){
        localStorage.setItem('Name', Document.getElementById('usernameBox'));
        window.location.href = './dist/gamemode.html';
    }
    */
}

if(window.location.href.indexOf('gamemode.html') != -1){
    var welcomeMessage = document.getElementById('welcomeMessage');
    var username = localStorage.getItem('Name');
    welcomeMessage.textContent = 'Welcome ' + username + '!';
    var existingGame = true;
    //function call to deteremine if existing game
    console.log(existingGame);
    if(existingGame){
        var modal = document.getElementById("gameModal");
        var resumeBtn = document.getElementById("resumeGame");
        var removeBtn = document.getElementById("removeGame");
        modal.style.display = "block";
    }
    resumeBtn.onclick = function() {
        //start old game
        modal.style.visibility = "hidden";
        //take board size (and maybe ai difficulty) from database and store locally
        //get if ai or local or online game
        var gamemode = "local";
        if(gamemode == "local"){
            window.location.href = "../dist/localGame.html"
        }
        else if(gamemode == "ai"){
            window.location.href = "../dist/aiGame.html"
        }

    }
    removeBtn.onclick = function() {
        modal.style.visibility = "hidden";
        //drop board from database
    }
}

if(window.location.href.indexOf('registerNew.html') != -1){
    var newAccountButton = document.getElementById('newAccountBtn');
    var usernameBox = document.getElementById('usernameBox');
    var passwordBox = document.getElementById('passwordBox');
    newAccountButton.addEventListener('click', e => {
        //var button = e.currentTarget;
        //send json response to database and pass in
        //usernameBox.textContent
        //passwordBox.textContent

        /* Reference for this type of communication
        https://www.geeksforgeeks.org/how-to-connect-sql-server-database-from-javascript-in-the-browser/
        */
    });
}





//Handle Settings Clicked ---------------------------------------------------

//handle settings getting clicked
if(window.location.href.indexOf('localSelect.html') != -1){
    //sets default values for settings
    localStorage.setItem('boardSize', 8);
    localStorage.setItem('startingPlayer', 1);
    var sizeButtons = document.querySelectorAll('button.sizeBtn');
    var playerButtons = document.querySelectorAll('button.playerBtn');
    //if the buttons are clicked then save the settings
        sizeButtons.forEach(sizeButton => {
            sizeButton.addEventListener('click', e => {
                var button = e.currentTarget;
                if(!button.classList.contains("selected")){
                    sizeButtons.forEach(btn => btn !== button && btn.classList.remove('selected'));
                    button.classList.toggle('selected');
                    if (button.textContent == "8x8"){
                        localStorage.setItem('boardSize', 8);
                    }
                    else if (button.textContent == "10x10"){
                        localStorage.setItem('boardSize', 10);
                    }
                    else if (button.textContent == "4x4"){
                        localStorage.setItem('boardSize', 4);
                    }
                } 
            });
        });
        playerButtons.forEach(playerButton => {
            playerButton.addEventListener('click', e => {
                var button = e.currentTarget;
                if(!button.classList.contains("selected")){
                    playerButtons.forEach(btn => btn !== button && btn.classList.remove('selected'));
                    button.classList.toggle('selected');
                    if (button.textContent == "BLACK"){
                        localStorage.setItem('startingPlayer', 1);
                    }
                    else if (button.textContent == "WHITE"){
                        localStorage.setItem('startingPlayer', 2);
                    }
                    
                } 
            });
        });
}

if(window.location.href.indexOf('aiSelect.html') != -1){
    //sets default values for settings
    localStorage.setItem('boardSize', 8);
    localStorage.setItem('boardDiff', 1);
    var sizeButtons = document.querySelectorAll('button.sizeBtn');
    var diffButtons = document.querySelectorAll('button.diffBtn');
    //if the buttons are clicked then save the settings
        sizeButtons.forEach(sizeButton => {
            sizeButton.addEventListener('click', e => {
                var button = e.currentTarget;
                if(!button.classList.contains("selected")){
                    sizeButtons.forEach(btn => btn !== button && btn.classList.remove('selected'));
                    button.classList.toggle('selected');
                    if (button.textContent == "8x8"){
                        localStorage.setItem('boardSize', 8);
                    }
                    else if (button.textContent == "10x10"){
                        localStorage.setItem('boardSize', 10);
                    }
                    else if (button.textContent == "4x4"){
                        localStorage.setItem('boardSize', 4);
                    }
                } 
            });
        });
        diffButtons.forEach(diffButton => {
            diffButton.addEventListener('click', e => {
                var button = e.currentTarget;
                if(!button.classList.contains("selected")){
                    diffButtons.forEach(btn => btn !== button && btn.classList.remove('selected'));
                    button.classList.toggle('selected');
                    if (button.textContent == "EASY"){
                        localStorage.setItem('boardDiff', 1);
                    }
                    else if (button.textContent == "MEDIUM"){
                        localStorage.setItem('boardDiff', 3);
                    }
                    else if (button.textContent == "HARD"){
                        localStorage.setItem('boardDiff', 5);
                    }
                    
                } 
            });
        });
}




