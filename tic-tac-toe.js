const area = document.getElementById('area');
let move = 0;
const win_matrix = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
const message = document.getElementById('message');
const winMessage = document.getElementById('win-message');
const overlay = document.getElementById('overlay');
const btnNewGame = document.getElementById('btn-new-game');

area.addEventListener('click', e => {
    move % 2 === 0 ? e.target.innerHTML = 'X' : e.target.innerHTML = 'O';
    move++;
    let win_check = check();
    if (win_check) {
        displayWinMessage(win_check)
    }
})

const check = () => {
    let boxes = document.getElementsByClassName('box');
    for (let i = 0; i < win_matrix.length; i++) {
        let symbol = boxes[win_matrix[i][0]].innerHTML;
        if (symbol !== "") {
            if (
                boxes[win_matrix[i][0]].innerHTML === symbol &&
                boxes[win_matrix[i][1]].innerHTML === symbol &&
                boxes[win_matrix[i][2]].innerHTML === symbol
            ){
                return symbol;
            }
        }
    };
    return null;
}

const displayWinMessage = winner => {
    winner === 'X' ? winner = 'крестики' : winner = 'нолики';
    message.innerHTML = `Победили ${winner}`;
    winMessage.style.display = 'block';
}

const newGame = () => {
    location.reload()
}

overlay.addEventListener('click', newGame)
btnNewGame.addEventListener('click', newGame)