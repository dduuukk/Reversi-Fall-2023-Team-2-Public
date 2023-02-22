class BoardView {
    constructor() {

    }

    //makes the green cells in the dimensions provided
    static makeBoard(size) {
        for (var i = 0; i < size; ++i) {
            var row = document.createElement('div'); // create column
            row.className = 'row';
            row.id = 'row-' + i;
            for (var j = 0; j < size; ++j) {
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

export {BoardView};

