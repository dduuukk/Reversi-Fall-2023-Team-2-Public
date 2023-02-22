import { GameController } from './controller/gameController.js';

//running the local game if we are on game page
if(window.location.href.indexOf('localGame.html') != -1){
    //get stored values from settings select page
    var chosenSize = localStorage.getItem('boardSize');
    var chosenStart = localStorage.getItem('startingPlayer');
    var newGameController = new GameController(chosenSize, chosenStart);
    //show board and pieces
    GameController.show_board(newGameController);
    GameController.display_pieces(newGameController);
    //when a cell is clicked a piece is placed
    window.onclick = e => {
        if(e.target.classList.contains('piece')){
            console.log("Already a piece there!");
        }
        else{
            let x = e.target.id.charAt(7);
            let y = e.target.id.charAt(5);
            console.log(x, y);
            //update board array if move is valid
            GameController.handle_move(newGameController, x, y);
            //shows piece layout on board after flip
            GameController.display_pieces(newGameController);
            //show new scores
            GameController.displayScores(newGameController);
            //checks if a player has won
            let winner = GameController.checkWinner(newGameController);
            if(winner != 0){
                if(winner == 1){
                    GameController.endGame(1);
                }
                else {
                    GameController.endGame(2);
                }
                
            }
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
                    else if (button.textContent == "12x12"){
                        localStorage.setItem('boardSize', 12);
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




