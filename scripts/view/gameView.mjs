import { BoardView } from "./boardView.mjs"

class GameView {
    constructor(size) {
        this.size = size;
        this.board_view = new BoardView();
    }

    show_board() {
        this.board_view.make_board(this.size);
    }

    //places a single tile
    place_piece(x, y, current_player){
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
    place_pieces(boardArray){
        //remove all pieces before replacing them
        var existingPieces = document.getElementsByClassName('piece');
        while(existingPieces[0]){
            existingPieces[0].parentNode.removeChild(existingPieces[0]);
        }
        //place pieces down from array
        for (var i = 2; i < boardArray.length - 2; i++){
            for (var j = 2; j < boardArray.length - 2; j++){
                if (!boardArray[j][i] == 0){
                    this.place_piece(i, j, boardArray[j][i]);
                }
            }
        }
    }

    //places all pieces in the array
    place_moves(moves_array){
        //remove all pieces before replacing them
        var existingMoves = document.getElementsByClassName('move');
        while(existingMoves[0]){
            existingMoves[0].parentNode.removeChild(existingMoves[0]);
        }
        //place pieces down from array
        for (var i = 0; i < moves_array.length; i++){
            var point = moves_array[i];
            var x = point[0];
            var y = point[1];
            var cell = document.getElementById('cell-' + y + '-' + x);
            var piece = document.createElement('div');
            piece.className = 'move';
            piece.classList.add('movePiece');
            cell.appendChild(piece);
        }
    }

    //changes score element to reflect scores
    display_scores(blackScore, whiteScore){
        var blackPoints = document.querySelector('#blackScore h3');
        blackPoints.textContent = blackScore;
        var whitePoints = document.querySelector('#whiteScore h3');
        whitePoints.textContent = whiteScore;
    }

    //remove board and display winner
    game_end_message(winning_player){
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