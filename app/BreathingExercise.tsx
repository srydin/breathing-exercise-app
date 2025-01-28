'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure Bootstrap Icons CSS is imported

export default function BreathingExercise() {
  // Breathing stages configuration
  const breathingStages = {
    prepare: { text: 'Get Ready', duration: 5, nextStage: 'inhale' },
    inhale: { text: 'Inhale', duration: 4, nextStage: 'hold' },
    hold: { text: 'Hold', duration: 7, nextStage: 'exhale' },    // Adjusted to 7 for 4-7-8 method
    exhale: { text: 'Exhale', duration: 8, nextStage: 'prepare' } // Adjusted to 8 for 4-7-8 method
  };

  // State declarations
  const [stage, setStage] = useState<'prepare' | 'inhale' | 'hold' | 'exhale'>('prepare');
  const [countdown, setCountdown] = useState(breathingStages['prepare'].duration);
  const [isPaused, setIsPaused] = useState(false); // State for pause functionality

  const controls = useAnimation(); // Controls for animating the breathing circle

  // Animation variants for the breathing circle
  const circleVariants = {
    prepare: {
      scale: [0.95, 1.05, 0.95], // Gentle pulsing
      transition: {
        duration: 4, // Slower pulsing
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut'
      }
    },
    inhale: {
      scale: 1.2,
      transition: {
        duration: breathingStages['inhale'].duration,
        ease: 'easeInOut'
      }
    },
    hold: {
      scale: 1,
      transition: {
        duration: 0.5, // Quick transition to hold
        ease: 'easeInOut'
      }
    },
    exhale: {
      scale: 0.8,
      transition: {
        duration: breathingStages['exhale'].duration,
        ease: 'easeInOut'
      }
    }
  };

  // Update breathing circle animation based on stage and pause state
  useEffect(() => {
    if (!isPaused) {
      controls.start(circleVariants[stage]);
    } else {
      controls.stop(); // Stop any ongoing animation when paused
    }

    // Cleanup function to stop animations when component unmounts or stage changes
    return () => {
      controls.stop();
    };
  }, [stage, isPaused, controls]);

  // Handle countdown timer
  useEffect(() => {
    if (isPaused) {
      return; // Do not set a timer if paused
    }

    const timer = setTimeout(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1);
      } else {
        const nextStage = breathingStages[stage].nextStage as 'prepare' | 'inhale' | 'hold' | 'exhale';
        setStage(nextStage);
        setCountdown(breathingStages[nextStage].duration);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [stage, countdown, isPaused, breathingStages]);

  // Handle reset functionality
  const resetBreathing = () => {
    setStage('prepare');
    setCountdown(breathingStages['prepare'].duration);
    setIsPaused(false);
    controls.start(circleVariants['prepare']);
  };

  const stageColors = {
    prepare: 'bg-blue-50',
    inhale: 'bg-green-50',
    hold: 'bg-yellow-50',
    exhale: 'bg-purple-50'
  };

  const currentYear = new Date().getFullYear(); // Get current year

  return (
    <motion.div 
      className={`w-screen h-screen flex items-center justify-center ${stageColors[stage]} transition-colors duration-500`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Breathing Circle Animation */}
      <motion.div
        variants={circleVariants}
        animate={controls}
        className="w-4/5 h-4/5 max-w-4xl max-h-4xl rounded-full bg-white bg-opacity-20 flex items-center justify-center shadow-lg"
      >
        {/* Optional: Add a subtle inner circle or gradient */}
      </motion.div>

      {/* Main Content */}
      <div className="absolute flex flex-col items-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">4-7-8 Breathing Method</h1>
        {/* Conditionally Render the <p> Tag Only During 'prepare' Stage */}
        {stage === 'prepare' && (
          <p className='text-lg mb-8 text-gray-600'>Just follow the prompts, try to clear your mind.</p>
        )}
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold mb-4 text-gray-800"
        >
          {breathingStages[stage].text}
        </motion.div>
        <div className="text-5xl font-bold mb-8 text-gray-900">{countdown}</div>
        <div className="flex justify-center space-x-6">
          {/* Pause/Resume Button with Bootstrap Icons and Tooltip */}
          <button
            onClick={() => setIsPaused(prev => !prev)}
            className="p-3 text-indigo-500 hover:text-indigo-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 relative group"
            aria-label={isPaused ? 'Resume Countdown' : 'Pause Countdown'}
          >
            {isPaused ? (
              // Play Icon
              <i className="bi bi-play-fill h-6 w-6"></i>
            ) : (
              // Pause Icon
              <i className="bi bi-pause-fill h-6 w-6"></i>
            )}
            {/* Tooltip */}
            <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {isPaused ? 'Resume' : 'Pause'}
            </span>
          </button>

          {/* Reset Button with Bootstrap Icon and Tooltip */}
          <button
            onClick={resetBreathing}
            className="p-3 text-red-500 hover:text-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 relative group"
            aria-label="Reset Countdown"
          >
            {/* Reset Icon */}
            <i className="bi bi-arrow-clockwise h-6 w-6"></i>
            {/* Tooltip */}
            <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Reset
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
