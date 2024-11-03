import React from 'react';
import { motion } from 'framer-motion';
import { Cell as CellType } from '../types';
import { jutsuSymbols } from '../utils/symbols';

interface CellProps {
  cell: CellType;
  onClick: () => void;
  isHighlighted: boolean;
  isHint: boolean;
  position: { row: number; col: number };
}

const Cell: React.FC<CellProps> = ({ cell, onClick, isHighlighted, isHint, position }) => {
  const borderClasses = [
    position.col % 3 === 0 ? 'border-l-2' : '',
    position.col === 8 ? 'border-r-2' : '',
    position.row % 3 === 0 ? 'border-t-2' : '',
    position.row === 8 ? 'border-b-2' : '',
  ].join(' ');

  return (
    <motion.div
      whileHover={{ scale: 0.95 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`
        w-12 h-12 flex items-center justify-center
        border border-orange-300 ${borderClasses}
        ${cell.isInitial ? 'bg-orange-50' : 'bg-white'}
        ${cell.isSelected ? 'bg-orange-100' : ''}
        ${isHighlighted ? 'bg-orange-200' : ''}
        ${isHint ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
        ${!cell.isValid ? 'text-red-500' : ''}
        cursor-pointer transition-colors duration-200
        relative
      `}
    >
      {cell.value !== 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-2xl font-bold text-gray-700"
        >
          {jutsuSymbols[cell.value]}
        </motion.div>
      )}
      {isHint && (
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="absolute inset-0 bg-blue-200 rounded-sm opacity-50"
        />
      )}
    </motion.div>
  );
};

export default Cell;