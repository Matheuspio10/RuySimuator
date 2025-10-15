
import React from 'react';
import { type Character } from '../types.ts';

interface CharacterSpriteProps {
  character: Character | null;
  position: 'left' | 'right';
}

const CharacterSprite: React.FC<CharacterSpriteProps> = ({ character, position }) => {
  if (!character || !character.image) {
    return null;
  }

  const positionClasses = position === 'left' ? 'left-10' : 'right-10';

  return (
    <div
      key={character.id}
      className={`absolute bottom-0 ${positionClasses} h-5/6 z-10 animate-fade-in`}
      style={{ animation: 'fadeIn 0.5s ease-in-out' }}
    >
      <img
        src={character.image}
        alt={character.name}
        className="h-full object-contain"
        style={{
          filter: 'drop-shadow(5px 5px 15px rgba(0,0,0,0.7))',
          WebkitFilter: 'drop-shadow(5px 5px 15px rgba(0,0,0,0.7))'
        }}
      />
    </div>
  );
};

// Add keyframes for the animation in a style tag or your global CSS
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }
`;
document.head.appendChild(style);


export default CharacterSprite;