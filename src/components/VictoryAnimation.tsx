import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const VictoryAnimation: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-gradient-to-r from-orange-400 to-yellow-400 p-8 rounded-2xl shadow-2xl text-center"
      >
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity
          }}
        >
          <Sparkles className="w-16 h-16 text-white mb-4 mx-auto" />
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Dattebayo! You've Mastered the Jutsu!
        </h2>
        <p className="text-white text-lg">
          You've proven yourself worthy of becoming Hokage!
        </p>
      </motion.div>
    </motion.div>
  );
};

export default VictoryAnimation;