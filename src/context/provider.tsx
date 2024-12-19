import React, { useCallback, useState } from 'react';
import { CARDS } from '../data';
import { GameContext } from './context';
import { CardType, GAME_STATUS, GameProviderProps } from '../types';
import { calculateScore } from '../helpers/helpers';

const initialState = {
  attempts: 0,
  cards: CARDS,
  pairs: 0,
  selectedCards: [],
  score: 0,
  status: GAME_STATUS.NO_STATUS,
  timer: 0,
  isValidating: false,
};

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [attempts, setAttempts] = useState(initialState.attempts);
  const [cards, setCards] = useState(initialState.cards);
  const [pairs, setPairs] = useState(initialState.pairs);
  const [selectedCards, setSelectedCards] = useState<Array<CardType>>(
    initialState.selectedCards,
  );
  const [score, setScore] = useState(initialState.score);
  const [status, setStatus] = useState(initialState.status);
  const [timer, setTimer] = useState(initialState.timer);

  const handleOnClickCard = (cardId: number) => {
    if (cards.find((_card) => _card.id === cardId)?.flipped) {
      return;
    }

    const flippedCard = cards.find((card) => card.id === cardId) as CardType;
    if (!flippedCard) return;

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, flipped: !card.flipped } : card,
      ),
    );

    setSelectedCards((prevSelectedCards) => [
      ...prevSelectedCards,
      flippedCard,
    ]);
  };

  const matchCards = () => {
    const [firstCard, secondCard] = selectedCards;

    if (!firstCard || !secondCard) {
      console.error('Cards not found', firstCard, secondCard);
      return;
    }
    if (firstCard.value === secondCard.value) {
      setPairs((prevPairs) => prevPairs + 1);
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === firstCard.id || card.id === secondCard.id
            ? { ...card, matched: true }
            : card,
        ),
      );
      setScore(calculateScore(pairs, attempts, timer));
    } else {
      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, flipped: false }
              : card,
          ),
        );
      }, 1200);
    }
    setAttempts((prevAttempts) => prevAttempts + 1);
    setSelectedCards([]);
  };

  const resetGame = () => {
    setCards(initialState.cards);
    setSelectedCards(initialState.selectedCards);
    setScore(initialState.score);
    setTimer(initialState.timer);
    setAttempts(initialState.attempts);
    setPairs(initialState.pairs);
    setStatus(GAME_STATUS.START);
  };

  const finishGame = useCallback(() => {
    setTimeout(() => {
      setStatus(GAME_STATUS.FINISH);
      alert('winner');
    }, 1000);
  }, []);

  const pauseGame = () => {};

  const startGame = () => {
    shuffleCards();
    setStatus(GAME_STATUS.START);
  };

  const shuffleCards = () => {
    const deckSize = cards.length - 1;
    const shuffledCards = [...cards];

    for (let i = deckSize; i > 0; i--) {
      const index = Math.floor(Math.random() * (i + 1));

      [shuffledCards[i], shuffledCards[index]] = [
        shuffledCards[index],
        shuffledCards[i],
      ];
    }

    setCards(shuffledCards);
  };

  return (
    <GameContext.Provider
      value={{
        attempts,
        cards,
        pairs,
        selectedCards,
        score,
        status,
        timer,
        finishGame,
        handleOnClickCard,
        matchCards,
        pauseGame,
        resetGame,
        setTimer,
        startGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
