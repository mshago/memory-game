import { createRoot } from 'react-dom/client';
import './index.css';
import Game from './components/game/Game.tsx';
import { GameProvider } from './context/provider.tsx';

createRoot(document.getElementById('root')!).render(
  <GameProvider>
    <Game />
  </GameProvider>,
);
