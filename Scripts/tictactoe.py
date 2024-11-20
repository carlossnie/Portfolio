import tkinter as tk
from tkinter import messagebox

def print_board(board):
    for row in board:
        print(" | ".join(row))
        print("-" * 5)

def check_winner(board, player):
    for row in board:
        if all(s == player for s in row):
            return True
    for col in range(3):
        if all(row[col] == player for row in board):
            return True
    if all(board[i][i] == player for i in range(3)) or all(board[i][2 - i] == player for i in range(3)):
        return True
    return False

def is_full(board):
    return all(all(cell != " " for cell in row) for row in board)

def on_click(row, col):
    if board[row][col] == " ":
        board[row][col] = current_player.get()
        buttons[row][col].config(text=current_player.get())
        if check_winner(board, current_player.get()):
            messagebox.showinfo("Tic Tac Toe", f"Player {current_player.get()} wins!")
            reset_board()
        elif is_full(board):
            messagebox.showinfo("Tic Tac Toe", "It's a tie!")
            reset_board()
        else:
            current_player.set("O" if current_player.get() == "X" else "X")
    else:
        messagebox.showwarning("Tic Tac Toe", "Cell already taken, try again.")

def reset_board():
    global board
    board = [[" " for _ in range(3)] for _ in range(3)]
    for row in range(3):
        for col in range(3):
            buttons[row][col].config(text="")

if __name__ == "__main__":
    root = tk.Tk()
    root.title("Tic Tac Toe")

    current_player = tk.StringVar(value="X")
    board = [[" " for _ in range(3)] for _ in range(3)]
    buttons = [[None for _ in range(3)] for _ in range(3)]

    for row in range(3):
        for col in range(3):
            button = tk.Button(root, text="", width=10, height=3, command=lambda r=row, c=col: on_click(r, c))
            button.grid(row=row, column=col)
            buttons[row][col] = button

    root.mainloop()