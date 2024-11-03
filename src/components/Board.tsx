import React from 'react';
import { motion } from 'framer-motion';
import { Board as BoardType, JutsuSymbol } from '../types';
import Cell from './Cell';

interface BoardProps {
  board: BoardType;
  onCellClick: (row: number, col: number) => void;
  selectedSymbol: JutsuSymbol | null;
  hintCell: { row: number; col: number } | null;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick, selectedSymbol, hintCell }) => {
  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="grid grid-cols-9 gap-0.5 bg-orange-200 p-1 rounded-lg shadow-lg"
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            onClick={() => onCellClick(rowIndex, colIndex)}
            isHighlighted={selectedSymbol === cell.value}
            isHint={hintCell?.row === rowIndex && hintCell?.col === colIndex}
            position={{ row: rowIndex, col: colIndex }}
          />
        ))
      )}
    </motion.div>
  );
};

export default Board;