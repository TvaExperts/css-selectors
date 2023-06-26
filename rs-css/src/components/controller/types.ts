import { LevelConfigs } from '../../data/levels';

enum ResolveStatus {
  NO = 'No',
  DONE_WITH_HINT = 'WithHint',
  DONE = 'Done',
}

interface Level extends LevelConfigs {
  id: number;
  signs: string[];
  winSigns: string[];
  resolveStatus: ResolveStatus;
}

type StateOfLevel = {
  id: number;
  resolveStatus: ResolveStatus;
};

type StateOfGame = {
  curLevel: number;
  levelsState: StateOfLevel[];
};

const SIGN_LENGTH: number = 8;
const LOCAL_STORAGE_PARAM_NAME = 'tva-rs-css';

export { Level, ResolveStatus, SIGN_LENGTH, StateOfGame, StateOfLevel, LOCAL_STORAGE_PARAM_NAME };
