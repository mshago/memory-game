import { Dispatch, ReactNode, SetStateAction } from 'react';

export enum GAME_STATUS {
  FINISH = 'FINISH',
  NO_STATUS = 'NO_STATUS',
  START = 'START',
  PAUSE = 'PAUSE',
}

export type GameContextType = {
  attempts: number;
  cards: CardType[];
  pairs: number;
  selectedCards: CardType[];
  score: number;
  status: GAME_STATUS;
  timer: number;
  handleOnClickCard: (cardId: number) => void;
  matchCards: () => void;
  resetGame: () => void;
  finishGame: () => void;
  pauseGame: () => void;
  setTimer: Dispatch<SetStateAction<number>>;
  startGame: () => void;
};

export type GameProviderProps = {
  children: ReactNode;
};

export type CardType = {
  id: number;
  value: string;
  flipped: boolean;
  matched: boolean;
};
