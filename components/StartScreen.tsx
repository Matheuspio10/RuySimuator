
import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="w-full h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-8 bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/seed/startbg/1920/1080')"}}>
        <div className="bg-black/70 backdrop-blur-sm p-10 rounded-lg text-center shadow-2xl border border-gray-700">
            <h1 className="font-title text-4xl md:text-6xl text-yellow-300 drop-shadow-lg">Ruy Simulator</h1>
            <h2 className="font-title text-xl md:text-2xl mt-2 text-red-400">Amor, Lei e Micose</h2>
            <p className="mt-8 max-w-2xl text-lg text-gray-300">
                Uma visual novel satírica sobre um advogado de meia-tigela, sua vida amorosa desastrosa e uma coceira existencial que simplesmente não vai embora.
            </p>
            <button
                onClick={onStart}
                className="mt-10 font-title text-2xl bg-yellow-500 text-black py-4 px-8 rounded-md hover:bg-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
                Começar o Processo
            </button>
        </div>
    </div>
  );
};

export default StartScreen;
