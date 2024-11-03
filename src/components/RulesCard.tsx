import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X } from 'lucide-react';
import { jutsuSymbols } from '../utils/symbols';

const RulesCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 bg-orange-500 text-white p-2 rounded-full shadow-lg"
      >
        <HelpCircle className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Play Ninja Sudoku</h2>

              <div className="space-y-4 text-gray-600">
                <p>
                  Master the art of Jutsu placement by following these sacred ninja rules:
                </p>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-2">Basic Rules:</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Fill each empty cell with a Jutsu symbol</li>
                    <li>Each row must contain each Jutsu exactly once</li>
                    <li>Each column must contain each Jutsu exactly once</li>
                    <li>Each 3x3 box must contain each Jutsu exactly once</li>
                  </ul>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-2">Available Jutsus:</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(jutsuSymbols).slice(1).map(([value, symbol]) => (
                      <div key={value} className="flex items-center gap-2">
                        <span className="text-2xl">{symbol}</span>
                        <span className="text-sm">- {getJutsuName(Number(value))}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="italic">
                  Complete the puzzle to prove yourself worthy of becoming Hokage!
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

function getJutsuName(value: number): string {
  switch (value) {
    case 1: return 'Rasengan';
    case 2: return 'Shadow Clone';
    case 3: return 'Fireball';
    case 4: return 'Chidori';
    case 5: return 'Sharingan';
    case 6: return 'Wind Style';
    case 7: return 'Water Style';
    case 8: return 'Kunai';
    case 9: return 'Sage Mode';
    default: return '';
  }
}

export default RulesCard;