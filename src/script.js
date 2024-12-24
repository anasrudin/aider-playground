document.addEventListener('DOMContentLoaded', function() {
    const gameBoard = document.getElementById('game-board');
    const gridSize = 10;
    const mineCount = 15;
    let board = [];
    let gameOver = false;
    const resetButton = document.getElementById('reset-button');

    function resetGame() {
        gameOver = false;
        board = [];
        createBoard();
        renderBoard();
    }

    function createBoard() {
        board = Array(gridSize).fill(null).map(() => Array(gridSize).fill(0));
        let minesPlaced = 0;
        while (minesPlaced < mineCount) {
            const row = Math.floor(Math.random() * gridSize);
            const col = Math.floor(Math.random() * gridSize);
            if (board[row][col] !== 'mine') {
                board[row][col] = 'mine';
                minesPlaced++;
            }
        }
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                if (board[row][col] !== 'mine') {
                    let adjacentMines = 0;
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            if (i === 0 && j === 0) continue;
                            const newRow = row + i;
                            const newCol = col + j;
                            if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize && board[newRow][newCol] === 'mine') {
                                adjacentMines++;
                            }
                        }
                    }
                    board[row][col] = adjacentMines;
                }
            }
        }
    }

    function renderBoard() {
        gameBoard.innerHTML = '';
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener('click', handleCellClick);
                gameBoard.appendChild(cell);
            }
        }
    }

    function handleCellClick(event) {
        if (gameOver) return;
        const cell = event.target;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        revealCell(row, col);
    }

    function revealCell(row, col) {
        if (row < 0 || row >= gridSize || col < 0 || col >= gridSize) return;
        const cell = gameBoard.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (!cell || cell.classList.contains('revealed')) return;

        cell.classList.add('revealed');
        if (board[row][col] === 'mine') {
            cell.classList.add('mine');
            cell.textContent = '💣';
            gameOver = true;
            alert('Game Over! You hit a mine.');
            revealAllMines();
            return;
        } else if (board[row][col] > 0) {
            cell.textContent = board[row][col];
        } else {
             for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (i === 0 && j === 0) continue;
                    const newRow = row + i;
                    const newCol = col + j;
                    revealCell(newRow, newCol);
                }
            }
        }
    }

    function revealAllMines() {
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                 if (board[row][col] === 'mine') {
                    const cell = gameBoard.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                    cell.classList.add('mine');
                    cell.textContent = '💣';
                }
            }
        }
    }

    resetButton.addEventListener('click', resetGame);

    createBoard();
    renderBoard();
});
