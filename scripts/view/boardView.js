
//create board background
const board = document.createElement('div');

board.style.backgroundColor = 'green';
board.style.display = 'grid';


document.body.appendChild(board);
//create board grid
for(let i = 0; i < size; i++) {
    for(let j = 0; j < size; j++) {
        const cell = document.createElement('div');
        cell.style.borderColor = black;
        cell.style.height = '40px';
        cell.style.width = '40px';
        cell.setAttribute('id', 'cell' + i + j);

        board.appendChild(cell);
    }
}