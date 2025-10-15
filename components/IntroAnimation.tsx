import React, { useState, useEffect } from 'react';

interface IntroAnimationProps {
  onAnimationEnd: () => void;
  onSkip: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onAnimationEnd, onSkip }) => {
  const [phase, setPhase] = useState<'start' | 'title' | 'subtitle' | 'end'>('start');

  useEffect(() => {
    const titleTimer = setTimeout(() => setPhase('title'), 500);
    const subtitleTimer = setTimeout(() => setPhase('subtitle'), 2000);
    const endTimer = setTimeout(() => setPhase('end'), 4000);
    const finishTimer = setTimeout(onAnimationEnd, 5000);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(subtitleTimer);
      clearTimeout(endTimer);
      clearTimeout(finishTimer);
    };
  }, [onAnimationEnd]);

  const getOpacity = (p: 'title' | 'subtitle') => {
      if (phase === 'end') return 'opacity-0';
      if (p === 'title' && (phase === 'title' || phase === 'subtitle')) return 'opacity-100';
      if (p === 'subtitle' && phase === 'subtitle') return 'opacity-100';
      return 'opacity-0';
  }

  return (
    <div className="w-full h-screen bg-black text-white flex flex-col justify-center items-center p-8 relative transition-opacity duration-1000"
         style={{ opacity: phase === 'end' ? 0 : 1 }}
    >
      <div className="text-center">
        <h1 className={`font-title text-4xl md:text-6xl text-yellow-300 drop-shadow-lg transition-opacity duration-1000 ${getOpacity('title')}`}>
            Ruy Simulator
        </h1>
        <h2 className={`font-title text-xl md:text-2xl mt-4 text-red-400 transition-opacity duration-1000 delay-500 ${getOpacity('subtitle')}`}>
            Amor, Lei e Micose
        </h2>
      </div>
      <button
        onClick={onSkip}
        className="absolute bottom-10 right-10 font-title text-sm bg-gray-800/50 text-white py-2 px-4 rounded-md hover:bg-gray-700/70 transition-all duration-300"
      >
        Pular Intro &gt;&gt;
      </button>
    </div>
  );
};

export default IntroAnimation;
