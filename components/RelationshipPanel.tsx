import React, { useState } from 'react';
import { type Relationships, RelationshipMood, RelationshipState } from '../types.ts';
import { CHARACTERS, RELATIONSHIP_CHARACTERS } from '../constants.ts';
import { HeartIcon, ChevronDownIcon } from './icons.tsx';

interface RelationshipPanelProps {
  relationships: Relationships;
}

const moodEmojis: Record<RelationshipMood, string> = {
    [RelationshipMood.NEUTRAL]: '😐',
    [RelationshipMood.HAPPY]: '😊',
    [RelationshipMood.ANGRY]: '😠',
    [RelationshipMood.SAD]: '😢',
    [RelationshipMood.DISAPPOINTED]: '😞',
};

const AffinityBar: React.FC<{ name: string, state: RelationshipState }> = ({ name, state }) => {
    return (
        <div className="flex items-center justify-between">
            <span className="text-white font-semibold text-sm mr-2 flex items-center gap-1.5">
                <span>{moodEmojis[state.mood]}</span>
                {name}
            </span>
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <HeartIcon 
                        key={i} 
                        className={`w-4 h-4 ${i < state.affinity ? 'text-pink-400' : 'text-gray-600'}`}
                        filled={i < state.affinity} 
                    />
                ))}
            </div>
        </div>
    );
};

const RelationshipPanel: React.FC<RelationshipPanelProps> = ({ relationships }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-purple-950/70 backdrop-blur-sm rounded-lg shadow-lg border border-purple-700 w-64 transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left p-3 focus:outline-none"
      >
        <div className="flex items-center gap-2">
            <HeartIcon className="w-5 h-5 text-purple-300" filled={false} />
            <h3 className="text-white font-title text-sm">Relacionamentos</h3>
        </div>
        <ChevronDownIcon className={`w-5 h-5 text-purple-300 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-3 pb-3 pt-2 border-t border-purple-700/50 space-y-2">
          {RELATIONSHIP_CHARACTERS.map((charId) => (
            <AffinityBar 
              key={charId} 
              name={CHARACTERS[charId].name}
              state={relationships[charId]} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelationshipPanel;