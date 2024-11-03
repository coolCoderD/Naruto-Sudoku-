import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scroll, AlertCircle, Wand2 } from 'lucide-react';
import Board from './components/Board';
import SymbolSelector from './components/SymbolSelector';
import VictoryAnimation from './components/VictoryAnimation';
import RulesCard from './components/RulesCard';
import { Board as BoardType, JutsuSymbol } from './types';
import { isValidMove, isBoardComplete, findHint, solveSudoku } from './utils/gameLogic';

function App() {
  const [board, setBoard] = useState<BoardType>(() => {
    const initialBoard: BoardType = Array(9).fill(null).map(() =>
      Array(9).fill(null).map(() => ({
        value: 0,
        isInitial: false,
        isSelected: false,
        isValid: true
      }))
    );
    
    // This is a valid solvable board
    const initialValues = [
      [1, 4, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 6, 0, 0, 0, 0, 0, 3],
      [0, 0, 0, 0, 8, 0, 4, 0, 0],
      [4, 0, 0, 0, 0, 2, 0, 0, 0],
      [0, 0, 0, 3, 0, 0, 0, 0, 7],
      [0, 0, 5, 0, 0, 9, 0, 0, 0],
      [0, 0, 0, 0, 3, 0, 0, 0, 8],
      [8, 0, 0, 0, 0, 0, 0, 7, 0],
      [0, 0, 0, 8, 0, 0, 0, 4, 1]
    ];

    initialValues.forEach((row, i) => {
      row.forEach((value, j) => {
        if (value !== 0) {
          initialBoard[i][j] = {
            value: value as JutsuSymbol,
            isInitial: true,
            isSelected: false,
            isValid: true
          };
        }
      });
    });

    return initialBoard;
  });

  const [selectedSymbol, setSelectedSymbol] = useState<JutsuSymbol | null>(null);
  const [isVictory, setIsVictory] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hintCell, setHintCell] = useState<{ row: number; col: number } | null>(null);
  const [isSolving, setIsSolving] = useState(false);

  const handleCellClick = (row: number, col: number) => {
    if (board[row][col].isInitial || selectedSymbol === null || isSolving) return;

    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    const newValue = selectedSymbol;
    
    if (!isValidMove(newBoard, row, col, newValue)) {
      setErrorMessage("This jutsu conflicts with another in the same row, column, or box!");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    newBoard[row][col].value = newValue;
    newBoard[row][col].isValid = true;
    setHintCell(null);
    setBoard(newBoard);
  };

  const getHint = () => {
    if (isSolving) return;
    const hint = findHint(board);
    if (hint) {
      setHintCell({ row: hint.row, col: hint.col });
      setSelectedSymbol(hint.value);
    }
  };

  const autoSolve = async () => {
    setIsSolving(true);
    const solution = solveSudoku(board);
    
    if (solution) {
      // Animate the solution cell by cell
      const currentBoard = board.map(row => row.map(cell => ({ ...cell })));
      
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (!currentBoard[row][col].isInitial && solution[row][col].value !== currentBoard[row][col].value) {
            currentBoard[row][col] = solution[row][col];
            setBoard([...currentBoard]);
            await new Promise(resolve => setTimeout(resolve, 100)); // Delay between moves
          }
        }
      }
    } else {
      setErrorMessage("No solution exists for this puzzle!");
      setTimeout(() => setErrorMessage(null), 3000);
    }
    setIsSolving(false);
  };

  useEffect(() => {
    if (isBoardComplete(board)) {
      setIsVictory(true);
    }
  }, [board]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-100 flex flex-col items-center justify-center p-8">
      <RulesCard />
      
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Scroll className="w-8 h-8 text-orange-500" />
          <h1 className="text-4xl font-bold text-gray-800">Ninja Sudoku</h1>
        </div>
        <p className="text-gray-600">Master the art of Jutsu placement!</p>
      </motion.div>

      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <Board
        board={board}
        onCellClick={handleCellClick}
        selectedSymbol={selectedSymbol}
        hintCell={hintCell}
      />

      <div className="flex flex-col items-center gap-4 mt-6">
        <SymbolSelector
          selectedSymbol={selectedSymbol}
          onSymbolSelect={setSelectedSymbol}
        />

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={getHint}
            disabled={isSolving}
            className={`bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition-colors ${
              isSolving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Need a Hint?
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={autoSolve}
            disabled={isSolving}
            className={`bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-600 transition-colors flex items-center gap-2 ${
              isSolving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Wand2 className="w-5 h-5" />
            {isSolving ? 'Solving...' : 'Auto-Solve'}
          </motion.button>
        </div>
      </div>

      {isVictory && <VictoryAnimation />}
    </div>
  );
}
export default App;