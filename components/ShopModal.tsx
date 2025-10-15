import React from 'react';
import { type ShopItem, type Relationships } from '../types';
import { CHARACTERS } from '../constants';
import { CloseIcon, HeartIcon, MoneyIcon } from './icons';

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuy: (item: ShopItem) => void;
  playerMoney: number;
  items: ShopItem[];
  relationships: Relationships;
}

const ShopModal: React.FC<ShopModalProps> = ({ isOpen, onClose, onBuy, playerMoney, items, relationships }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 flex justify-center items-center p-4 animate-fade-in-fast">
      <div className="bg-gray-900 border border-purple-700 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <header className="flex justify-between items-center p-4 border-b border-purple-700/50">
          <h2 className="font-title text-2xl text-purple-300">Loja de Presentes Duvidosos</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <CloseIcon className="w-7 h-7" />
          </button>
        </header>
        
        <div className="p-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map(item => {
                    const targetCharacter = CHARACTERS[item.targetCharacterId];
                    const canAfford = playerMoney >= item.price;
                    const hasRequiredAffinity = relationships[item.targetCharacterId].affinity > 0;
                    const canBuy = canAfford && hasRequiredAffinity;
                    
                    let disabledTooltip = '';
                    if (!canAfford) disabledTooltip = "Dinheiro insuficiente.";
                    else if (!hasRequiredAffinity) disabledTooltip = `Você precisa conhecer ${targetCharacter.name} melhor antes de dar um presente.`;

                    return (
                        <div key={item.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex flex-col justify-between relative group">
                            <div>
                                <h3 className="text-xl font-bold text-yellow-300">{item.name}</h3>
                                <p className="text-sm text-gray-400 mt-2">{item.description}</p>
                                <div className="mt-3 text-sm text-gray-300 space-y-1">
                                    <p><strong>Para:</strong> {targetCharacter.name}</p>
                                    <div className="flex items-center gap-1">
                                        <strong>Efeito:</strong>
                                        <HeartIcon className="w-4 h-4 text-pink-400" filled />
                                        <span className="text-green-400">+{item.affinityValue}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <button
                                    onClick={() => onBuy(item)}
                                    disabled={!canBuy}
                                    className={`w-full font-bold py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center gap-2 ${
                                        canBuy
                                        ? 'bg-green-600 hover:bg-green-500 text-white'
                                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    }`}
                                >
                                    <MoneyIcon className="w-5 h-5" />
                                    <span>Comprar (R$ {item.price})</span>
                                </button>
                                {!canBuy && disabledTooltip && (
                                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-black text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                        {disabledTooltip}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        <footer className="p-3 bg-gray-900/80 border-t border-purple-700/50 text-right">
            <span className="text-white font-semibold">Seu Dinheiro: <span className="text-green-400">R$ {playerMoney}</span></span>
        </footer>

      </div>
    </div>
  );
};

const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeInFast {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in-fast {
    animation: fadeInFast 0.3s ease-in-out;
  }
`;
document.head.appendChild(style);

export default ShopModal;