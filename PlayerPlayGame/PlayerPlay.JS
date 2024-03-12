const info = document.getElementById('info');
const scoreDisplay = document.getElementById('score');
const board = document.getElementById('board');
const restartBtn = document.getElementById('restartBtn');
const cells = [];
let currentPlayer = 'X';
let score = { X: 0, O: 0 };

// Create the game board
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = i;
        cell.dataset.col = j;
        cell.addEventListener('click', () => makeMove(i, j));
        board.appendChild(cell);
        cells.push(cell);
    }
}

// Restart Game button
restartBtn.addEventListener('click', restartGame);

// Make a move on the board
function makeMove(row, col) {
    if (cells[row * 3 + col].textContent === '') {
        cells[row * 3 + col].textContent = currentPlayer;
        if (checkWin(row, col, currentPlayer)) {
            alert(`${currentPlayer} wins!`);
            score[currentPlayer]++;
            updateScoreDisplay();
            restartGame();
        } else if (checkDraw()) {
            alert('It\'s a draw!');
            restartGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateInfoDisplay();
        }
    }
}

// Check for a win
function checkWin(row, col, player) {
    // Check row
    if (
        cells[row * 3].textContent === player &&
        cells[row * 3 + 1].textContent === player &&
        cells[row * 3 + 2].textContent === player
    ) {
        return true;
    }
    // Check column
    if (
        cells[col].textContent === player &&
        cells[col + 3].textContent === player &&
        cells[col + 6].textContent === player
    ) {
        return true;
    }
    // Check diagonals
    if (
        (row === col || row + col === 2) &&
        (
            (cells[0].textContent === player && cells[4].textContent === player && cells[8].textContent === player) ||
            (cells[2].textContent === player && cells[4].textContent === player && cells[6].textContent === player)
        )
    ) {
        return true;
    }
    return false;
}

// Check for a draw
function checkDraw() {
    return cells.every(cell => cell.textContent !== '');
}

// Restart the game
function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
    updateInfoDisplay();
}

// Update info display
function updateInfoDisplay() {
    info.textContent = `It's ${currentPlayer}'s turn`;
}

// Update score display
function updateScoreDisplay() {
    scoreDisplay.textContent = `Score: X - ${score.X}, O - ${score.O}`;
}