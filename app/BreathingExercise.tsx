'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function BreathingExercise() {
  const [stage, setStage] = useState<'prepare' | 'inhale' | 'hold' | 'exhale'>('prepare');
  const [countdown, setCountdown] = useState(0);

  const breathingStages = {
    prepare: { text: 'Get Ready', duration: 3, nextStage: 'inhale' },
    inhale: { text: 'Inhale', duration: 4, nextStage: 'hold' },
    hold: { text: 'Hold', duration: 7, nextStage: 'exhale' },
    exhale: { text: 'Exhale', duration: 8, nextStage: 'prepare' }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1);
      } else {
        setStage(breathingStages[stage].nextStage as 'prepare' | 'inhale' | 'hold' | 'exhale');
        setCountdown(breathingStages[stage].duration);
      }
    }, 1000);

    if (countdown === 0) {
      setCountdown(breathingStages[stage].duration);
    }

    return () => clearTimeout(timer);
  }, [stage, countdown]);

  const stageColors = {
    prepare: 'bg-gray-100',
    inhale: 'bg-green-100',
    hold: 'bg-yellow-100',
    exhale: 'bg-blue-100'
  };

  return (
    <motion.div 
      className={`min-h-screen flex flex-col items-center justify-center ${stageColors[stage]} transition-colors duration-500`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">4-7-8 Breathing Exercise</h1>
        <motion.div
          key={stage}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-3xl font-semibold mb-4"
        >
          {breathingStages[stage].text}
        </motion.div>
        <div className="text-2xl">{countdown}</div>
      </div>
    </motion.div>
  );
}
