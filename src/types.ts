export type JutsuSymbol = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface Cell {
  value: JutsuSymbol;
  isInitial: boolean;
  isSelected: boolean;
  isValid: boolean;
}

export type Board = Cell[][];