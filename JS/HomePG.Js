const loadingPage = document.getElementById('loading');
        const playWithComputerBtn = document.getElementById('playWithComputer');
        const playWithPlayerBtn = document.getElementById('playWithPlayer');
        const board = document.getElementById('board');
        const restartBtn = document.getElementById('restartBtn');
        const cells = [];
        const info = document.getElementById('info');
        const scoreDisplay = document.getElementById('score');
        let currentPlayer = 'X';
        let score = { X: 0, O: 0 };
        let gameOver = false;


        playWithComputerBtn.addEventListener('click', startGameWithComputer);
        playWithPlayerBtn.addEventListener('click', startGameWithPlayer);
        restartBtn.addEventListener('click', restartGame);

 
        function showGame() {
            loadingPage.style.display = 'none';
            board.style.display = 'grid';
            info.style.display = 'block';
            scoreDisplay.style.display = 'block';
            restartBtn.style.display = 'block';
        }


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


        function makeMove(row, col) {
            if (!gameOver && cells[row * 3 + col].textContent === '') {
                cells[row * 3 + col].textContent = currentPlayer;
                if (checkWin(row, col, currentPlayer)) {
                    if (currentPlayer === 'O') {
                        alert('AI wins!');
                    } else {
                        alert(`${currentPlayer} wins!`);
                    }
                    gameOver = true;
                    updateScoreDisplay();
                    restartGame();
                } else if (checkDraw()) {
                    alert('It\'s a draw!');
                    gameOver = true;
                    restartGame();
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    updateInfoDisplay();
                    if (currentPlayer === 'O' && playWithComputerBtn.classList.contains('active')) {
         
                        makeAIMove();
                    }
                }
            }
        }


        function checkWin(row, col, player) {
        
            if (
                cells[row * 3].textContent === player &&
                cells[row * 3 + 1].textContent === player &&
                cells[row * 3 + 2].textContent === player
            ) {
                return true;
            }
        
            if (
                cells[col].textContent === player &&
                cells[col + 3].textContent === player &&
                cells[col + 6].textContent === player
            ) {
                return true;
            }
       
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

       
        function checkDraw() {
            return cells.every(cell => cell.textContent !== '');
        }

  
        function makeAIMove() {
            const bestMove = getBestMove();
            cells[bestMove].textContent = 'O';
            currentPlayer = 'X';
            if (checkWin(Math.floor(bestMove / 3), bestMove % 3, 'O')) {
                alert('AI wins!');
                gameOver = true;
                updateScoreDisplay();
                restartGame();
            }
        }


        function getBestMove() {
            let bestScore = -Infinity;
            let bestMove;

            for (let i = 0; i < cells.length; i++) {
                if (cells[i].textContent === '') {
                    cells[i].textContent = 'O';
                    let score = minimax(cells, 0, false);
                    cells[i].textContent = '';

                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = i;
                    }
                }
            }

            return bestMove;
        }

    
        function minimax(board, depth, isMaximizing) {
            let result = checkResult(board);

            if (result !== null) {
                return result.score - depth;
            }

            if (isMaximizing) {
                let bestScore = -Infinity;
                for (let i = 0; i < board.length; i++) {
                    if (board[i].textContent === '') {
                        board[i].textContent = 'O';
                        let score = minimax(board, depth + 1, false);
                        board[i].textContent = '';
                        bestScore = Math.max(score, bestScore);
                    }
                }
                return bestScore;
            } else {
                let bestScore = Infinity;
                for (let i = 0; i < board.length; i++) {
                    if (board[i].textContent === '') {
                        board[i].textContent = 'X';
                        let score = minimax(board, depth + 1, true);
                        board[i].textContent = '';
                        bestScore = Math.min(score, bestScore);
                    }
                }
                return bestScore;
            }
        }


        function checkResult(board) {
      
            for (let i = 0; i < 3; i++) {
                if (board[i * 3].textContent !== '' &&
                    board[i * 3].textContent === board[i * 3 + 1].textContent &&
                    board[i * 3].textContent === board[i * 3 + 2].textContent) {
                    return { score: 1 };
                }

      
                if (board[i].textContent !== '' &&
                    board[i].textContent === board[i + 3].textContent &&
                    board[i].textContent === board[i + 6].textContent) {
                    return { score: 1 };
                }
            }

  
            if (board[0].textContent !== '' &&
                board[0].textContent === board[4].textContent &&
                board[0].textContent === board[8].textContent) {
                return { score: 1 };
            }
            if (board[2].textContent !== '' &&
                board[2].textContent === board[4].textContent &&
                board[2].textContent === board[6].textContent) {
                return { score: 1 };
            }

          
            if (board.every(cell => cell.textContent !== '')) {
                return { score: 0 };
            }

            return null;
        }

    
        function updateInfoDisplay() {
            info.textContent = `It's ${currentPlayer}'s turn`;
        }

    
        function updateScoreDisplay() {
            scoreDisplay.textContent = `Score: X - ${score.X}, O - ${score.O}`;
        }

      
        function restartGame() {
            cells.forEach(cell => {
                cell.textContent = '';
            });
            currentPlayer = 'X';
            gameOver = false;
            updateInfoDisplay();
        }

        
        function startGameWithComputer() {
            showGame();
            currentPlayer = 'X'; 
            playWithComputerBtn.classList.add('active');
            playWithPlayerBtn.classList.remove('active');
        }

      
        function startGameWithPlayer() {
            showGame();
            currentPlayer = 'X'; 
            playWithPlayerBtn.classList.add('active');
            playWithComputerBtn.classList.remove('active');
        }