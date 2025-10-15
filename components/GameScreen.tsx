import React from 'react';
import { type Scene, type Dialogue, type Choice, type Stats, type Relationships, ShopItem } from '../types';
import { CHARACTERS, SHOP_ITEMS } from '../constants';
import StatsDisplay from './StatsDisplay';
import DialogueBox from './DialogueBox';
import CharacterSprite from './CharacterSprite';
import RelationshipPanel from './RelationshipPanel';
import ShopModal from './ShopModal';
import { GiftIcon } from './icons';

interface GameScreenProps {
  scene: Scene;
  dialogue: Dialogue;
  stats: Stats;
  relationships: Relationships;
  onChoice: (choice: Choice) => void;
  onNext: () => void;
  isGenerating: boolean;
  isShopOpen: boolean;
  toggleShop: () => void;
  buyShopItem: (item: ShopItem) => void;
  notification: { message: string } | null;
}

const GameScreen: React.FC<GameScreenProps> = ({ 
    scene, dialogue, stats, relationships, onChoice, onNext, isGenerating,
    isShopOpen, toggleShop, buyShopItem, notification
}) => {
  const character = dialogue ? CHARACTERS[dialogue.characterId] : null;
  const spritePosition = dialogue?.spritePosition || 'right';

  return (
    <div className="relative w-screen h-screen bg-gray-900 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        key={scene.id}
        style={{ 
          backgroundImage: `url(${scene.background})`,
          animation: 'scene-fade-in 1s ease-in-out'
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <StatsDisplay stats={stats} />
      
      <div className="absolute top-4 right-4 z-20 flex items-start gap-2">
        <RelationshipPanel relationships={relationships} />
        <button onClick={toggleShop} className="p-3 bg-purple-950/70 backdrop-blur-sm rounded-full shadow-lg border border-purple-700 hover:bg-purple-800/80 transition-colors">
            <GiftIcon className="w-6 h-6 text-purple-300" />
        </button>
      </div>

      <ShopModal 
        isOpen={isShopOpen}
        onClose={toggleShop}
        onBuy={buyShopItem}
        playerMoney={stats.Dinheiro}
        items={SHOP_ITEMS}
        relationships={relationships}
      />
      
      <CharacterSprite 
        character={character}
        position={spritePosition}
      />

      {notification && (
          <div
              key={Date.now()}
              className="absolute bottom-[35%] left-4 z-30 bg-black/70 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-600 text-white text-lg italic animate-fade-in-out"
          >
              {notification.message}
          </div>
      )}

      {dialogue && (
        <DialogueBox
          dialogue={dialogue}
          onChoice={onChoice}
          onNext={onNext}
          isGenerating={isGenerating}
        />
      )}
    </div>
  );
};

// Add keyframes for the animation in a style tag or your global CSS
const style = document.createElement('style');
style.innerHTML = `
  @keyframes scene-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes fade-in-out {
    0% { opacity: 0; transform: translateY(10px); }
    20% { opacity: 1; transform: translateY(0); }
    80% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-10px); }
  }
  .animate-fade-in-out {
    animation: fade-in-out 3s ease-in-out forwards;
  }
`;
document.head.appendChild(style);


export default GameScreen;