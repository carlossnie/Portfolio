// Add to your JavaScript
class TicTacToe {
    constructor() {
        this.board = Array(3).fill().map(() => Array(3).fill(" "));
        this.currentPlayer = "X";
        this.gameActive = true;
        
        this.cells = document.querySelectorAll('.cell');
        this.statusDisplay = document.querySelector('.game-status');
        this.resetButton = document.querySelector('.reset-button');
        
        this.initGame();
    }

    initGame() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', () => this.handleCellClick(cell));
            cell.textContent = '';
        });
        
        this.resetButton.addEventListener('click', () => this.resetGame());
        this.updateStatus();
    }

    handleCellClick(cell) {
        const [row, col] = cell.dataset.index.split(',').map(Number);
        
        if (this.board[row][col] === " " && this.gameActive) {
            this.board[row][col] = this.currentPlayer;
            cell.textContent = this.currentPlayer;
            
            if (this.checkWinner(this.currentPlayer)) {
                this.gameActive = false;
                this.updateStatus(`Player ${this.currentPlayer} wins!`);
                return;
            }
            
            if (this.isFull()) {
                this.gameActive = false;
                this.updateStatus("Game is a draw!");
                return;
            }
            
            this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
            this.updateStatus();
        }
    }

    checkWinner(player) {
        // Row check
        for (let row of this.board) {
            if (row.every(cell => cell === player)) return true;
        }
        
        // Column check
        for (let col = 0; col < 3; col++) {
            if (this.board.every(row => row[col] === player)) return true;
        }
        
        // Diagonal checks
        if (this.board.every((row, i) => row[i] === player)) return true;
        if (this.board.every((row, i) => row[2 - i] === player)) return true;
        
        return false;
    }

    isFull() {
        return this.board.every(row => row.every(cell => cell !== " "));
    }

    updateStatus(message) {
        this.statusDisplay.textContent = message || `Player ${this.currentPlayer}'s turn`;
    }

    resetGame() {
        this.board = Array(3).fill().map(() => Array(3).fill(" "));
        this.currentPlayer = "X";
        this.gameActive = true;
        this.cells.forEach(cell => cell.textContent = '');
        this.updateStatus();
    }
}

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});