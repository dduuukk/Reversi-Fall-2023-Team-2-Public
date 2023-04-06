class BoardView {
    constructor() {
    }

    //makes the green cells in the dimensions provided
    make_board(size) {
        for (var i = 2; i < size -2; ++i) {
            var row = document.createElement('div'); // create column
            row.className = 'row';
            row.id = 'row-' + i;
            for (var j = 2; j < size -2; ++j) {
                var cell = document.createElement('div'); // create row
                cell.className = 'cell';
                cell.id = 'cell-'+ i +'-'+ j;
                row.appendChild(cell); // append row in column
            }
            boardContainer.appendChild(row); // append column inside grid
        }
        document.body.appendChild(boardContainer);
    }
}

module.exports = BoardView;

