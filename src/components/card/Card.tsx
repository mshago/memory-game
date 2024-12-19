import React from 'react';
import { animated, useSpring } from '@react-spring/web';
import styles from './styles.module.css';

interface CardProps {
  value: string | number;
  onClick: () => void;
  status?: 'active' | 'inactive';
  flipped?: boolean;
  matched?: boolean;
}

const Card: React.FC<CardProps> = ({ value, onClick, flipped }) => {
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <div className={styles.cardContainer} onClick={onClick}>
      <animated.div
        className={`${styles.back} ${styles.card}`}
        style={{ opacity: opacity.to((o) => 1 - o), transform }}
      />
      <animated.div
        className={`${styles.front} ${styles.card}`}
        style={{
          opacity,
          transform,
          rotateY: '180deg',
        }}
      >
        <span>{value}</span>
      </animated.div>
    </div>
  );
};

export default Card;
