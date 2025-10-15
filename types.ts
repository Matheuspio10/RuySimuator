export enum GameStatus {
  START_SCREEN = 'START_SCREEN',
  PLAYING = 'PLAYING',
  ENDED = 'ENDED',
}

export enum CharacterId {
  RUY = 'RUY',
  LINDINHA = 'LINDINHA',
  LARA = 'LARA',
  JAQUE = 'JAQUE',
  GI = 'GI',
  NETTO = 'NETTO',
  NARRATOR = 'NARRATOR',
  DOCTOR = 'DOCTOR',
  KESLLEY = 'KESLLEY',
}

export enum RelationshipCharacterId {
    LINDINHA = 'LINDINHA',
    LARA = 'LARA',
    JAQUE = 'JAQUE',
    GI = 'GI',
    NETTO = 'NETTO',
    KESLLEY = 'KESLLEY',
}

export enum StatId {
  SANIDADE = 'Sanidade',
  PRESTIGIO = 'Prestígio',
  FUNGOS = 'Fungos',
  DINHEIRO = 'Dinheiro',
}

export enum RelationshipMood {
    NEUTRAL = 'NEUTRAL',
    HAPPY = 'HAPPY',
    ANGRY = 'ANGRY',
    SAD = 'SAD',
    DISAPPOINTED = 'DISAPPOINTED',
}

export interface RelationshipState {
    affinity: number;
    mood: RelationshipMood;
}

export interface Character {
  id: CharacterId;
  name: string;
  image: string;
  biography: string;
}

export type Stats = Record<StatId, number>;
export type Relationships = Record<RelationshipCharacterId, RelationshipState>;

export interface Effect {
  stat: StatId;
  value: number;
}

export interface RelationshipEffect {
    characterId: RelationshipCharacterId;
    value: number;
    mood?: RelationshipMood;
}

export interface ShopItem {
    id: string;
    name: string;
    description: string;
    price: number;
    targetCharacterId: RelationshipCharacterId;
    affinityValue: number;
}

export interface Choice {
  text: string;
  effects: Effect[];
  relationshipEffects?: RelationshipEffect[];
}

export interface Dialogue {
  characterId: CharacterId;
  text: string;
  isRuyThought?: boolean;
  spritePosition?: 'left' | 'right';
  choices?: Choice[];
}

export interface Scene {
  id: string;
  background: string;
  dialogues: Dialogue[];
}

export interface Ending {
  id:string;
  title: string;
  description: string;
  condition: (stats: Stats) => boolean;
}

export interface GameState {
  currentScene: Scene;
  dialogueIndex: number;
  stats: Stats;
  relationships: Relationships;
  gameStatus: GameStatus;
  ending: Ending | null;
  isGenerating: boolean;
  storyHistory: { sceneId: string; playerChoiceText?: string, sceneText: string }[];
  isShopOpen: boolean;
  notification: { message: string } | null;
}