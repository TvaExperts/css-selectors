import { LevelConfigs } from '../../data/levels';

interface Level extends LevelConfigs {
  id: number;
  signs: string[];
  winSigns: string[];
}

const SIGN_LENGTH: number = 8;

export { Level, SIGN_LENGTH };
