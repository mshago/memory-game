import { createContext, useContext } from 'react';
import { GameContextType } from '../types';

export const GameContext = createContext<GameContextType | undefined>(
  undefined,
);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};
