import React from 'react';
import { motion } from 'framer-motion';
import { CrossIcon, Sparkles } from 'lucide-react';
import { useState } from 'react';

const VictoryAnimation: React.FC = ({handleClose}) => {
  return (<>
  
      <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
      className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
        className="bg-gradient-to-r relative from-orange-400 to-yellow-400 p-8 rounded-2xl shadow-2xl text-center"
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
        <CrossIcon className="w-10 h-10 text-red-500  cursor-pointer -rotate-45 absolute top-3 right-4" onClick={handleClose} />
        <h2 className="text-3xl font-bold text-white mb-4">
          Dattebayo! You've Mastered the Jutsu!
        </h2>
        <p className="text-white text-lg">
          You've proven yourself worthy of becoming Hokage!
        </p>
      </motion.div>
    </motion.div>
    
  </>
  );
};

export default VictoryAnimation;