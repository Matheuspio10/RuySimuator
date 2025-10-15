
import React from 'react';
import { type Ending } from '../types';

interface EndScreenProps {
  ending: Ending;
  onRestart: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ ending, onRestart }) => {
  return (
    <div className="w-full h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-8 bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/seed/endbg/1920/1080')"}}>
        <div className="bg-black/70 backdrop-blur-sm p-10 rounded-lg text-center shadow-2xl border border-gray-700 max-w-3xl">
            <h1 className="font-title text-4xl md:text-5xl text-red-500 drop-shadow-lg">{ending.title}</h1>
            <p className="mt-8 text-xl text-gray-200 leading-relaxed">
                {ending.description}
            </p>
            <button
                onClick={onRestart}
                className="mt-10 font-title text-2xl bg-yellow-500 text-black py-4 px-8 rounded-md hover:bg-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
                Recorrer da Sentença (Jogar Novamente)
            </button>
        </div>
    </div>
  );
};

export default EndScreen;
