'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';

export default function BreathingExercise() {
  const [stage, setStage] = useState<'prepare' | 'inhale' | 'hold' | 'exhale'>('prepare');
  const [countdown, setCountdown] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const breathingStages = {
    prepare: { text: 'Get Ready', duration: 5, nextStage: 'inhale' },
    inhale: { text: 'Inhale', duration: 4, nextStage: 'hold' },
    hold: { text: 'Hold', duration: 7, nextStage: 'exhale' },
    exhale: { text: 'Exhale', duration: 8, nextStage: 'prepare' }
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1);
      } else {
        const nextStage = breathingStages[stage].nextStage as 'prepare' | 'inhale' | 'hold' | 'exhale';
        setStage(nextStage);
        setCountdown(breathingStages[nextStage].duration);
      }
    }, 1000);

    if (countdown === 0) {
      setCountdown(breathingStages[stage].duration);
    }

    return () => clearTimeout(timer);
  }, [stage, countdown, isPaused]);

  const stageColors = {
    prepare: 'bg-gray-100',
    inhale: 'bg-green-100',
    hold: 'bg-yellow-100',
    exhale: 'bg-blue-100'
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <motion.div 
      className={`min-h-screen flex flex-col items-center justify-between ${stageColors[stage]} transition-colors duration-500`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="h-16" /> {/* Spacer */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">4-7-8 Breathing Method</h1>
        <p className='text m-4'>Just follow the prompts, try to clear your mind.</p>
        <motion.div
          key={stage}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-3xl font-semibold mb-4"
        >
          {breathingStages[stage].text}
        </motion.div>
        <div className="text-2xl mb-8">{countdown}</div>
        <button
          onClick={togglePause}
          className="bg-white p-4 rounded-full shadow-md hover:shadow-lg transition-shadow"
          aria-label={isPaused ? "Resume exercise" : "Pause exercise"}
        >
          {isPaused ? <Play size={24} /> : <Pause size={24} />}
        </button>
      </div>
      <footer className="w-full py-4 text-center text-gray-600 bg-white/50">
        <p>© {new Date().getFullYear()} Breathing Exercise App. All rights reserved.</p>
      </footer>
    </motion.div>
  );
}