import { useEffect, useRef } from 'react';
import { useGameContext } from '../../context/context';
import Card from '../card/Card';
import { GAME_STATUS } from '../../types';

function Game() {
  const {
    attempts,
    cards,
    pairs,
    score,
    selectedCards,
    status,
    timer,
    finishGame,
    handleOnClickCard,
    matchCards,
    resetGame,
    setTimer,
    startGame,
  } = useGameContext();

  const timeRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (selectedCards.length === 2) {
      matchCards();
    }
  }, [matchCards, selectedCards]);

  useEffect(() => {
    if (status === GAME_STATUS.START) {
      timeRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    if (status === GAME_STATUS.FINISH) {
      clearInterval(timeRef.current);
    }

    return () => {
      clearInterval(timeRef.current);
    };
  }, [setTimer, status]);

  useEffect(() => {
    if (
      status === GAME_STATUS.START &&
      cards.every((card) => card.matched === true)
    ) {
      finishGame();
    }
  }, [cards, status, finishGame]);

  return (
    <div className="container">
      <h1>Memory Game</h1>
      {status === GAME_STATUS.NO_STATUS ? (
        <button onClick={startGame}>Start Game</button>
      ) : (
        <>
          <section className="buttonsContainer">
            <button onClick={resetGame}>Reset</button>
            {status !== GAME_STATUS.FINISH && (
              <button onClick={finishGame}>Stop</button>
            )}
          </section>
          <section className="infoContainer">
            <h2>Score: {score}</h2>
            <h2>Pairs: {pairs}</h2>
            <h2>Attempts: {attempts}</h2>
            <h2>Time: {timer}</h2>
          </section>
          <div className="cardsContainer">
            {cards.map(({ value, id, flipped, matched }) => (
              <Card
                key={id}
                value={value}
                onClick={() => handleOnClickCard(id)}
                flipped={flipped}
                matched={matched}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Game;
