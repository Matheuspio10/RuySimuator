import React, { useState, useEffect, useCallback } from 'react';
import { type Dialogue, type Choice } from '../types.ts';
import { CHARACTERS } from '../constants.ts';

interface DialogueBoxProps {
  dialogue: Dialogue;
  onChoice: (choice: Choice) => void;
  onNext: () => void;
  isGenerating: boolean;
}

const AnimatedText: React.FC<{ text: string; onFinished: () => void }> = ({ text, onFinished }) => {
    const [displayedText, setDisplayedText] = useState('');
    
    useEffect(() => {
        setDisplayedText('');
        let i = 0;
        const intervalId = setInterval(() => {
            if (i >= text.length) {
                clearInterval(intervalId);
                onFinished();
            } else {
                setDisplayedText(text.substring(0, i + 1));
                i++;
            }
        }, 20); // typing speed
        
        return () => clearInterval(intervalId);
    }, [text, onFinished]);

    return <p className="text-xl leading-relaxed">{displayedText}</p>;
};

const DialogueBox: React.FC<DialogueBoxProps> = ({ dialogue, onChoice, onNext, isGenerating }) => {
  const [isTextAnimationFinished, setIsTextAnimationFinished] = useState(false);
  const character = CHARACTERS[dialogue.characterId];
  const isNarration = character.id === 'NARRATOR';
  const isRuyThought = dialogue.isRuyThought;

  const handleAnimationFinished = useCallback(() => {
    setIsTextAnimationFinished(true);
  }, []);

  useEffect(() => {
    setIsTextAnimationFinished(false);
  }, [dialogue]);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-1/3 z-20 p-8 flex flex-col justify-end">
      <div className="relative bg-black/70 backdrop-blur-md p-6 rounded-lg border border-gray-700 shadow-2xl w-full max-w-4xl mx-auto">
        {isGenerating && (
            <div className="absolute inset-0 bg-black/80 flex justify-center items-center z-50 rounded-lg">
                <p className="text-white text-xl animate-pulse font-title">O destino de Ruy está sendo escrito...</p>
            </div>
        )}
        {!isNarration && !isRuyThought && (
          <h3 className="text-2xl font-bold text-yellow-300 mb-2">{character.name}</h3>
        )}
        {isRuyThought && (
          <h3 className="text-2xl font-bold text-cyan-300 mb-2 italic">Ruy (Pensamento)</h3>
        )}
        <div className={`text-white min-h-[56px] ${isNarration || isRuyThought ? 'italic' : ''}`}>
           <AnimatedText text={dialogue.text} onFinished={handleAnimationFinished} />
        </div>
        
        {isTextAnimationFinished && (
            <div className="mt-4 flex flex-col items-end gap-3">
            {dialogue.choices ? (
                dialogue.choices.map((choice, index) => (
                <button
                    key={index}
                    onClick={() => onChoice(choice)}
                    className="w-full md:w-auto md:min-w-[300px] text-left p-3 bg-gray-800 hover:bg-yellow-500 hover:text-black border border-gray-600 rounded-md transition-colors duration-200"
                >
                    <p className="text-lg font-semibold">{choice.text}</p>
                </button>
                ))
            ) : (
                <button 
                    onClick={onNext}
                    className="px-4 py-2 bg-gray-800 hover:bg-yellow-500 hover:text-black border border-gray-600 rounded-md transition-colors duration-200"
                >
                    Próximo ➤
                </button>
            )}
            </div>
        )}
      </div>
    </div>
  );
};

export default DialogueBox;