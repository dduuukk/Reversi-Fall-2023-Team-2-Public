import { GameController } from './controller/game_controller2.js';
import { AI } from './model/ai.js';

//running the local game if we are on game page
if(window.location.href.indexOf('localGame.html') != -1){
    //get stored values from settings select page
    var chosenSize = localStorage.getItem('boardSize');
    var chosenStart = localStorage.getItem('startingPlayer');
    var newGameController = new GameController(chosenSize, chosenStart);
    //show board and pieces
    newGameController.show_board();
    newGameController.display_pieces();
    newGameController.display_moves();
    //when a cell is clicked a piece is placed
    window.onclick = e => {
        if(e.target.classList.contains('piece')){
            console.log("Already a piece there!");
        }
        else{
            var x = e.target.id.charAt(7);
            var y = e.target.id.charAt(5);
            //update board array if move is valid
            newGameController.handle_move(x, y);
            //shows piece layout on board after flip
            newGameController.display_pieces();
            //shows new valid moves
            newGameController.display_moves();
            //show new scores
            newGameController.display_scores();
            //checks if a player has won
            newGameController.check_win();
        } 
    } 
}

//running the ai game if we are on game page
if(window.location.href.indexOf('aiGame.html') != -1){
    //get stored values from settings select page
    var chosenSize = localStorage.getItem('boardSize');
    var chosenDiff = localStorage.getItem('boardDiff');
    var newGameController = new GameController(chosenSize, 1);
    var ai = new AI(chosenDiff, chosenSize, 1);
    //show board and pieces
    newGameController.show_board();
    newGameController.display_pieces();
    newGameController.display_moves();
    //when a cell is clicked a piece is placed
    window.onclick = e => {
        if(e.target.classList.contains('piece')){
            console.log("Already a piece there!");
        }
        else{
            var x = e.target.id.charAt(7);
            var y = e.target.id.charAt(5);
            //update board array if move is valid
            ai.handle_ai_move(x, y);
            //shows piece layout on board after flip
            newGameController.display_pieces();
            //shows new valid moves
            newGameController.display_moves();
            //show new scores
            newGameController.display_scores();
            //checks if a player has won
            newGameController.check_win();
        } 
    } 
}



//handle settings getting clicked
if(window.location.href.indexOf('localSelect.html') != -1){
    //sets default values for settings
    localStorage.setItem('boardSize', 8);
    localStorage.setItem('startingPlayer', 1);
    let sizeButtons = document.querySelectorAll('button.sizeBtn');
    let playerButtons = document.querySelectorAll('button.playerBtn');
    //if the buttons are clicked then save the settings
        sizeButtons.forEach(sizeButton => {
            sizeButton.addEventListener('click', e => {
                let button = e.currentTarget;
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
                let button = e.currentTarget;
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
    localStorage.setItem('boardDiff', 3);
    let sizeButtons = document.querySelectorAll('button.sizeBtn');
    let diffButtons = document.querySelectorAll('button.diffBtn');
    //if the buttons are clicked then save the settings
        sizeButtons.forEach(sizeButton => {
            sizeButton.addEventListener('click', e => {
                let button = e.currentTarget;
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
                let button = e.currentTarget;
                if(!button.classList.contains("selected")){
                    diffButtons.forEach(btn => btn !== button && btn.classList.remove('selected'));
                    button.classList.toggle('selected');
                    if (button.textContent == "EASY"){
                        localStorage.setItem('boardDiff', 3);
                    }
                    else if (button.textContent == "MEDIUM"){
                        localStorage.setItem('boardDiff', 6);
                    }
                    else if (button.textContent == "HARD"){
                        localStorage.setItem('boardDiff', 9);
                    }
                    
                } 
            });
        });
}




