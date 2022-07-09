const area = document.getElementById('area');
let move = 0;
const ai_level_btn = document.getElementById('level');
let ai_level = parseInt(ai_level_btn.innerHTML);
symbolX = 'X';
symbol0 = 'O';
let empty_cells = [];
let cells = [];
const win_matrix = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
const message = document.getElementById('message');
const winMessage = document.getElementById('win-message');
const overlay = document.getElementById('overlay');
const btnNewGame = document.getElementById('btn-new-game');
const btnMoveAi = document.getElementById('move-ai');

area.addEventListener('click', e => {
    if (e.target.innerHTML === '') {
        move % 2 === 0 ? e.target.innerHTML = symbolX : e.target.innerHTML = symbol0;
        move++;
        let win_check = check();
        if (win_check) {
            displayWinMessage(win_check)
        } else ai_move()
    }
})

const checkCells = () => {
    cells = document.getElementsByClassName('box');
    empty_cells = [];
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerHTML === "") {
            empty_cells += i;
        }
    }
    console.log(`${move}: ${empty_cells}`);
}

const ai_move = () => {
    let ai_symb = symbol0;
    let user_symb = symbolX;
    if (move % 2 === 0) {
        ai_symb = symbolX;
        user_symb = symbol0
    }
    checkCells();
    let selectCell = empty_cells[Math.floor(Math.random() * empty_cells.length)];
    if (ai_level > 0) {
        for (let i = 0; i < empty_cells.length; i++) {
            index = empty_cells[i];
            cells[index].innerHTML = user_symb;
            if (check() === user_symb) {
                selectCell = index;
            }
            cells[index].innerHTML = '';
            checkCells()
        }
    }
    if (ai_level === 2) {
        for (let i = 0; i < empty_cells.length; i++) {
            index = empty_cells[i];
            cells[index].innerHTML = ai_symb;
            if (check() === ai_symb) {
                selectCell = index;
            }
            cells[index].innerHTML = '';
            checkCells()
        }
    }
    cells[selectCell].innerHTML = ai_symb;
    move++;
    let win_check = check();
    if (win_check) {
        displayWinMessage(win_check)
    }
}

const check = () => {
    checkCells();
    for (let i = 0; i < win_matrix.length; i++) {
        let symbol = cells[win_matrix[i][0]].innerHTML;
        if (symbol !== "") {
            if (
                cells[win_matrix[i][0]].innerHTML === symbol &&
                cells[win_matrix[i][1]].innerHTML === symbol &&
                cells[win_matrix[i][2]].innerHTML === symbol
            ) {
                return symbol;
            }
        }
    }
    if (empty_cells.length === 0) {
        return 'ничья'
    }
    return null;
}

const displayWinMessage = winner => {
    winner === symbolX ? winner = 'Победили крестики' : winner === symbol0 ?
        winner = 'Победили нолики' : winner = 'Ничья!';
    message.innerHTML = winner;
    winMessage.style.display = 'block';
}

const newGame = () => {
    location.reload()
}

overlay.addEventListener('click', newGame)
btnNewGame.addEventListener('click', newGame)
btnMoveAi.addEventListener('click', ai_move);

ai_level_btn.addEventListener('click', e => {
    ai_level++;
    if (ai_level > 2)
        ai_level = 0;
    ai_level_btn.innerHTML = ai_level
})