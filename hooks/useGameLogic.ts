import { useState, useCallback } from 'react';
import {
  type GameState,
  type Stats,
  type Choice,
  type Effect,
  GameStatus,
  StatId,
  RelationshipEffect,
  ShopItem,
  RelationshipCharacterId,
  RelationshipMood,
} from '../types';
import { INITIAL_STATS, STORY, ENDINGS, INITIAL_RELATIONSHIPS, CHARACTERS } from '../constants';
import { generateNextScene } from '../services/aiService';

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentScene: STORY[0],
    dialogueIndex: 0,
    stats: { ...INITIAL_STATS },
    relationships: { ...INITIAL_RELATIONSHIPS },
    gameStatus: GameStatus.START_SCREEN,
    ending: null,
    isGenerating: false,
    storyHistory: [],
    isShopOpen: false,
    notification: null,
  });

  const startGame = () => {
    setGameState({
      currentScene: STORY[0],
      dialogueIndex: 0,
      stats: { ...INITIAL_STATS },
      relationships: { ...INITIAL_RELATIONSHIPS },
      gameStatus: GameStatus.PLAYING,
      ending: null,
      isGenerating: false,
      storyHistory: [],
      isShopOpen: false,
      notification: null,
    });
  };

  const setNotification = (message: string | null) => {
    if (message) {
        setGameState(prev => ({ ...prev, notification: { message } }));
        setTimeout(() => {
            setGameState(prev => ({ ...prev, notification: null }));
        }, 3000); // Notification disappears after 3 seconds
    }
  };

  const checkEndings = useCallback((currentStats: Stats) => {
    for (const ending of ENDINGS) {
      if (ending.condition(currentStats)) {
        setGameState((prev) => ({
          ...prev,
          gameStatus: GameStatus.ENDED,
          ending: ending,
        }));
        return true;
      }
    }
    return false;
  }, []);

  const handleChoice = useCallback(async (choice: Choice) => {
    setGameState(prev => ({ ...prev, isGenerating: true }));

    let newStats = { ...gameState.stats };
    choice.effects.forEach((effect: Effect) => {
      const currentVal = newStats[effect.stat];
      newStats[effect.stat] = Math.max(0, Math.min(100, currentVal + effect.value));
    });
    
    let newRelationships = JSON.parse(JSON.stringify(gameState.relationships));
    if (choice.relationshipEffects) {
        choice.relationshipEffects.forEach((effect: RelationshipEffect) => {
            const charId = effect.characterId;
            const currentAffinity = newRelationships[charId].affinity;
            newRelationships[charId].affinity = Math.max(0, Math.min(5, currentAffinity + effect.value));
            if (effect.mood) {
                newRelationships[charId].mood = effect.mood;
            }
            setNotification(`${CHARACTERS[charId].name} se lembrará disso.`);
        });
    }

    if (newStats[StatId.SANIDADE] <= 0 || newStats[StatId.PRESTIGIO] <= 0 || newStats[StatId.DINHEIRO] <= 0 || newStats[StatId.FUNGOS] >= 100) {
        if (checkEndings(newStats)) {
            setGameState(prev => ({...prev, isGenerating: false}));
            return;
        }
    }

    const currentDialogueText = gameState.currentScene.dialogues[gameState.dialogueIndex].text;
    const newHistory = [...gameState.storyHistory, { 
      sceneId: gameState.currentScene.id, 
      playerChoiceText: choice.text,
      sceneText: currentDialogueText
    }];

    const tempGameState = {
        ...gameState,
        stats: newStats,
        relationships: newRelationships,
        storyHistory: newHistory
    };

    try {
        const nextScene = await generateNextScene(tempGameState, choice.text);

        setGameState(prev => ({
            ...prev,
            stats: newStats,
            relationships: newRelationships,
            storyHistory: newHistory,
            currentScene: nextScene,
            dialogueIndex: 0,
            isGenerating: false,
        }));

    } catch (error) {
        console.error("Failed to generate next scene:", error);
        setGameState(prev => ({ ...prev, isGenerating: false }));
    }
  }, [gameState, checkEndings]);

  const advanceDialogue = () => {
    const currentScene = gameState.currentScene;
    if (!currentScene) return;

    if (gameState.dialogueIndex < currentScene.dialogues.length - 1) {
      setGameState(prev => ({ ...prev, dialogueIndex: prev.dialogueIndex + 1 }));
    } else {
        if (currentScene.id === 'FINAL_SCENE') {
            checkEndings(gameState.stats);
        }
    }
  };

  const toggleShop = () => {
    setGameState(prev => ({ ...prev, isShopOpen: !prev.isShopOpen }));
  };

  const buyShopItem = (item: ShopItem) => {
    if (gameState.stats.Dinheiro < item.price) return;
    if (gameState.relationships[item.targetCharacterId].affinity <= 0) return;


    const newStats = { ...gameState.stats };
    newStats.Dinheiro -= item.price;

    const newRelationships = JSON.parse(JSON.stringify(gameState.relationships));
    const charId = item.targetCharacterId;
    const currentAffinity = newRelationships[charId].affinity;
    newRelationships[charId].affinity = Math.min(5, currentAffinity + item.affinityValue);
    newRelationships[charId].mood = RelationshipMood.HAPPY;
    
    const targetCharacterName = CHARACTERS[charId].name;
    const historyEntry = `Ruy comprou "${item.name}" para ${targetCharacterName}.`;

    const newHistory = [...gameState.storyHistory, {
        sceneId: 'LOJA',
        playerChoiceText: historyEntry,
        sceneText: 'Ruy visitou a loja de presentes duvidosos.'
    }];

    setGameState(prev => ({
      ...prev,
      stats: newStats,
      relationships: newRelationships,
      storyHistory: newHistory,
    }));
    setNotification(`${targetCharacterName} adorou o presente!`);
  };

  return {
    gameState,
    startGame,
    advanceDialogue,
    handleChoice,
    toggleShop,
    buyShopItem,
  };
};