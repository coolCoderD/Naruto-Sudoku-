import React from 'react';
import { motion } from 'framer-motion';
import { JutsuSymbol } from '../types';
import { jutsuSymbols } from '../utils/symbols';

interface SymbolSelectorProps {
  selectedSymbol: JutsuSymbol | null;
  onSymbolSelect: (symbol: JutsuSymbol) => void;
}

const SymbolSelector: React.FC<SymbolSelectorProps> = ({ selectedSymbol, onSymbolSelect }) => {
  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex gap-2 mt-6 bg-orange-100 p-4 rounded-lg shadow-md"
    >
      {Object.entries(jutsuSymbols).map(([value, symbol]) => (
        <motion.button
          key={value}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onSymbolSelect(Number(value) as JutsuSymbol)}
          className={`
            w-12 h-12 flex items-center justify-center
            rounded-lg text-2xl
            ${selectedSymbol === Number(value) 
              ? 'bg-orange-500 text-white' 
              : 'bg-white text-gray-700 hover:bg-orange-200'}
            transition-colors duration-200 shadow-sm
          `}
        >
          {symbol}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default SymbolSelector;