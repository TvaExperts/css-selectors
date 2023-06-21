import { LevelConfigs } from '../../data/levels';

interface Level extends LevelConfigs {
  HTML?: HTMLElement;
  hashs?: string[];
}

export default Level;
