import React, { useState } from 'react';
import { GameStatus } from './types';
import { useGameLogic } from './hooks/useGameLogic';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';
import IntroAnimation from './components/IntroAnimation';

const App: React.FC = () => {
  const { 
    gameState, 
    startGame, 
    advanceDialogue, 
    handleChoice,
    toggleShop,
    buyShopItem,
  } = useGameLogic();

  const [showIntro, setShowIntro] = useState(true);

  const handleIntroFinish = () => {
    setShowIntro(false);
  };
  
  const currentScene = gameState.currentScene;
  const currentDialogue = currentScene?.dialogues[gameState.dialogueIndex];

  const renderContent = () => {
    if (showIntro) {
      return <IntroAnimation onAnimationEnd={handleIntroFinish} onSkip={handleIntroFinish} />;
    }

    switch (gameState.gameStatus) {
      case GameStatus.PLAYING:
        if (currentScene && currentDialogue) {
          return (
            <GameScreen
              scene={currentScene}
              dialogue={currentDialogue}
              stats={gameState.stats}
              relationships={gameState.relationships}
              onChoice={handleChoice}
              onNext={advanceDialogue}
              isGenerating={gameState.isGenerating}
              isShopOpen={gameState.isShopOpen}
              toggleShop={toggleShop}
              buyShopItem={buyShopItem}
              notification={gameState.notification}
            />
          );
        }
        return <div>Carregando...</div>;
      
      case GameStatus.ENDED:
        if (gameState.ending) {
          return <EndScreen ending={gameState.ending} onRestart={startGame} />;
        }
        return <div>Fim de Jogo.</div>;
        
      case GameStatus.START_SCREEN:
      default:
        return <StartScreen onStart={startGame} />;
    }
  };

  return (
    <main className="w-screen h-screen bg-black">
      {renderContent()}
    </main>
  );
};

export default App;