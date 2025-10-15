import { GoogleGenAI, Type } from "@google/genai";
import { type Scene, type GameState, CharacterId, StatId, RelationshipCharacterId, RelationshipMood } from '../types.ts';
import { CHARACTERS, RELATIONSHIP_CHARACTERS } from "../constants.ts";

const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

const sceneSchema = {
    type: Type.OBJECT,
    properties: {
        id: { type: Type.STRING, description: "A unique identifier for the scene, e.g., 'DIA_2_BAR_CONFUSAO'. If this is the final scene of the story, the ID must be 'FINAL_SCENE'." },
        background: { type: Type.STRING, description: "A plausible image URL from 'https://picsum.photos/seed/some-name/1280/720'" },
        dialogues: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    characterId: { type: Type.STRING, enum: Object.values(CharacterId) },
                    text: { type: Type.STRING },
                    isRuyThought: { type: Type.BOOLEAN, nullable: true },
                    spritePosition: { type: Type.STRING, enum: ['left', 'right'], nullable: true },
                    choices: {
                        type: Type.ARRAY,
                        nullable: true,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                text: { type: Type.STRING },
                                effects: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            stat: { type: Type.STRING, enum: Object.values(StatId) },
                                            value: { type: Type.INTEGER }
                                        },
                                        required: ['stat', 'value']
                                    }
                                },
                                relationshipEffects: {
                                    type: Type.ARRAY,
                                    nullable: true,
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            characterId: { type: Type.STRING, enum: Object.values(RelationshipCharacterId) },
                                            value: { type: Type.INTEGER, description: "Affinity change. Can be positive or negative. Usually 1 or -1." },
                                            mood: { type: Type.STRING, enum: Object.values(RelationshipMood), nullable: true, description: "The new mood of the character after this choice."}
                                        },
                                        required: ['characterId', 'value']
                                    }
                                }
                            },
                            required: ['text', 'effects']
                        }
                    }
                },
                required: ['characterId', 'text']
            }
        }
    },
    required: ['id', 'background', 'dialogues']
};

export async function generateNextScene(gameState: GameState, playerChoiceText: string): Promise<Scene> {
    const characterBios = Object.values(CHARACTERS).map(c => `${c.name}: ${c.biography}`).join('\n');
    const storySummary = gameState.storyHistory.map(h => `[In scene ${h.sceneId}] Ruy saw: "${h.sceneText}". Then Ruy chose: "${h.playerChoiceText}"`).join('\n');
    const relationshipStatus = RELATIONSHIP_CHARACTERS.map(id => `${CHARACTERS[id].name}: Affinity ${gameState.relationships[id].affinity}/5, Mood: ${gameState.relationships[id].mood}`).join('\n');

    const prompt = `
    You are the Dungeon Master for "Ruy Simulator: Amor, Lei e Micose", a satirical visual novel set in Brazil.
    Your tone is cynical, darkly humorous, and slightly pathetic, matching the game's theme. All dialogues must be in Brazilian Portuguese.
    The main character, Ruy, is a down-on-his-luck lawyer plagued by a fungal infection that metaphorically represents his bad life choices.

    Character Biographies:
    ${characterBios}

    Story So Far:
    ${storySummary || "This is the first scene."}

    Player's Current Status:
    - Sanidade: ${gameState.stats.Sanidade}
    - Prestígio: ${gameState.stats.Prestígio}
    - Fungos: ${gameState.stats.Fungos} (Lower is better for this stat)
    - Dinheiro: ${gameState.stats.Dinheiro}

    Current Relationship Status (Affinity out of 5 and current mood):
    ${relationshipStatus}

    Player's Last Action: "${playerChoiceText}"

    Your Task: Generate the VERY NEXT scene.
    - The scene must be a direct, logical, and entertaining consequence of the player's last action (which could be a dialogue choice or buying a gift), their current stats, and their relationships.
    - Keep dialogues short, punchy, and in-character (in Brazilian Portuguese).
    - The final dialogue of the scene MUST present the player with 2 or 3 new, interesting choices.
    - Each choice must have stat-altering effects ('value' can be positive or negative).
    - Choices can also have 'relationshipEffects' to change Ruy's affinity with a character. You can also set a new 'mood' for the character in the effect. Be thoughtful: being nice to Lindinha should increase her affinity and make her HAPPY, being sarcastic to Jaque might increase hers.
    - If the story has gone on for 5 or more scenes (current scene count: ${gameState.storyHistory.length}), you should aim to conclude the story. To do this, generate a final wrap-up scene and set its 'id' to 'FINAL_SCENE'. This final scene should have a concluding dialogue from the NARRATOR and should NOT have any choices.

    Generate the scene as a JSON object that strictly follows the provided schema.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: sceneSchema,
        }
    });

    const jsonText = response.text.trim();
    const newScene = JSON.parse(jsonText);
    return newScene as Scene;
}