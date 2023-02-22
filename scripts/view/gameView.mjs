import { BoardView } from "./boardView.mjs"

class GameView {
    constructor() {

    }

    //places a single tile
    static placePiece(x, y, current_player){
        var cell = document.getElementById('cell-' + y + '-' + x);
            var piece = document.createElement('div');
            piece.className = 'piece';
            if (current_player == 1){
                piece.classList.add('blackPiece');
            }
            else {
                piece.classList.add('whitePiece');
            }
            cell.appendChild(piece);
    }

    //places all pieces in the array
    static placePieces(boardArray){
        //remove all pieces before replacing them
        var existingPieces = document.getElementsByClassName('piece');
        while(existingPieces[0]){
            existingPieces[0].parentNode.removeChild(existingPieces[0]);
        }
        //place pieces down from array
        for (var i = 0; i < boardArray.length; i++){
            for (var j = 0; j < boardArray.length; j++){
                if (!boardArray[j][i] == 0){
                    this.placePiece(i, j, boardArray[j][i]);
                }
            }
        }
    }

    //changes score element to reflect scores
    static displayScores(blackScore, whiteScore){
        var blackPoints = document.querySelector('#blackScore h3');
        blackPoints.textContent = blackScore;
        var whitePoints = document.querySelector('#whiteScore h3');
        whitePoints.textContent = whiteScore;
    }

    //remove board and display winner
    static gameEndMessage(winning_player){
        var board = document.getElementById('boardContainer');
        board.parentNode.removeChild(board);
        var message = document.createElement('h2');
        message.className = 'winMessage';
        if(winning_player == 1){
            message.textContent = "Black Wins!";
        }
        else if (winning_player == 2){
            message.textContent = "White Wins!";
        }
        else {
            message.textContent = "Tie!";
        }
        document.body.appendChild(message);
    }

}

export {GameView};