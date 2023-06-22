import { LevelConfigs } from '../../data/levels';

interface Level extends LevelConfigs {
  signs?: string[];
  winSigns?: string[];
}

export default Level;
