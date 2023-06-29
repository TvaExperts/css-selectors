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
  curLevelNumber: number;
  levelsState: StateOfLevel[];
};

const Constants = {
  LOCAL_STORAGE_PARAM_NAME: 'tva-rs-css',
  SIGN_LENGTH: 8,
};

export { Level, ResolveStatus, StateOfGame, StateOfLevel, Constants };
