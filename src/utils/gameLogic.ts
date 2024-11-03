import { Board, JutsuSymbol, Cell } from '../types';

export const isValidMove = (board: Board, row: number, col: number, value: JutsuSymbol): boolean => {
  // Check row
  for (let i = 0; i < 9; i++) {
    if (i !== col && board[row][i].value === value) return false;
  }

  // Check column
  for (let i = 0; i < 9; i++) {
    if (i !== row && board[i][col].value === value) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = boxRow; i < boxRow + 3; i++) {
    for (let j = boxCol; j < boxCol + 3; j++) {
      if (i !== row && j !== col && board[i][j].value === value) return false;
    }
  }

  return true;
};

export const isBoardComplete = (board: Board): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col].value === 0 || !board[row][col].isValid) {
        return false;
      }
    }
  }
  return true;
};

export const findHint = (board: Board): { row: number; col: number; value: JutsuSymbol } | null => {
  // Find an empty cell
  let emptyCell: { row: number; col: number } | null = null;
  for (let row = 0; row < 9 && !emptyCell; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col].value === 0) {
        emptyCell = { row, col };
        break;
      }
    }
  }

  if (!emptyCell) return null;

  // Find possible values for this cell
  const possibleValues: JutsuSymbol[] = [];
  for (let value = 1; value <= 9; value++) {
    if (isValidMove(board, emptyCell.row, emptyCell.col, value as JutsuSymbol)) {
      possibleValues.push(value as JutsuSymbol);
    }
  }

  if (possibleValues.length === 0) return null;

  // Return a random valid value as a hint
  const randomValue = possibleValues[Math.floor(Math.random() * possibleValues.length)];
  return {
    row: emptyCell.row,
    col: emptyCell.col,
    value: randomValue
  };
};

export const solveSudoku = (board: Board): Board | null => {
  const newBoard = board.map(row => row.map(cell => ({ ...cell })));
  
  const findEmpty = (): [number, number] | null => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (newBoard[row][col].value === 0) {
          return [row, col];
        }
      }
    }
    return null;
  };

  const solve = (): boolean => {
    const empty = findEmpty();
    if (!empty) return true;

    const [row, col] = empty;
    for (let num = 1; num <= 9; num++) {
      if (isValidMove(newBoard, row, col, num as JutsuSymbol)) {
        newBoard[row][col].value = num as JutsuSymbol;
        if (solve()) return true;
        newBoard[row][col].value = 0;
      }
    }
    return false;
  };

  return solve() ? newBoard : null;
};