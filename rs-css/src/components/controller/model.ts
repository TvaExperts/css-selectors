import { LevelConfigs, LevelData, GameHTMLTag } from '../../data/levels';
import { Level, ResolveStatus, StateOfGame, StateOfLevel, Constants } from './types';

export default class Model {
  private state: StateOfGame;
  public levels: Level[];
  private currentLevelNumber: number;
  private wasUsedHint: boolean;

  constructor() {
    this.state = this.loadStateFromStorage();
    this.levels = [];
    this.initLevelsData();
    this.currentLevelNumber = this.state.curLevelNumber;
    this.wasUsedHint = false;
    window.addEventListener('beforeunload', () => this.saveStateInStorage());
  }

  get getLevelCount(): number {
    return this.levels.length;
  }

  get currentLevel(): Level {
    return this.levels[this.currentLevelNumber - 1];
  }

  set usedHint(value: boolean) {
    this.wasUsedHint = value;
  }

  public setCurrentLevel(levelId: number): void {
    if (levelId === this.currentLevelNumber) return;

    const newLevel: Level | undefined = this.levels.find((level) => level.id === levelId);
    if (newLevel) {
      this.currentLevelNumber = newLevel.id;
      this.wasUsedHint = false;
    }
  }

  public resetProgress(): void {
    for (let i = 0; i < this.levels.length; i += 1) {
      this.levels[i].resolveStatus = ResolveStatus.NO;
    }
  }

  public setWinStatusToCurrentLevel(): void {
    if (this.currentLevel.resolveStatus === ResolveStatus.DONE) return;
    this.currentLevel.resolveStatus = this.wasUsedHint ? ResolveStatus.DONE_WITH_HINT : ResolveStatus.DONE;
  }

  private loadStateFromStorage(): StateOfGame {
    const loadetData: string | null = localStorage.getItem(Constants.LOCAL_STORAGE_PARAM_NAME);

    if (!loadetData) {
      const newState: StateOfGame = {
        curLevelNumber: 1,
        levelsState: [],
      };
      return newState;
    }
    const loadedState: StateOfGame = JSON.parse(loadetData);
    return loadedState;
  }

  private initLevelsData(): void {
    LevelData.forEach((levelConfigs: LevelConfigs) => {
      const newId: number = this.levels.length + 1;
      const level: Level = {
        ...levelConfigs,
        signs: [],
        winSigns: [],
        id: newId,
        resolveStatus: this.getStatusLevelFromLoadedState(newId),
      };
      level.markup = this.getMarkupWithSigns(level.markup, level);
      this.levels.push(level);
    });
  }

  private getMarkupWithSigns(markup: GameHTMLTag[], level: Level): GameHTMLTag[] {
    const result: GameHTMLTag[] = [];

    markup.forEach((tag: GameHTMLTag) => {
      const newTag = tag;

      if (newTag.children && newTag.children.length) {
        newTag.children = this.getMarkupWithSigns(newTag.children, level);
      }

      let sign: string = this.getRandomStr(Constants.SIGN_LENGTH);
      while (level.signs?.includes(sign)) {
        sign = this.getRandomStr(Constants.SIGN_LENGTH);
      }

      level.signs?.push(sign);
      newTag.signElement = sign;

      if (newTag.winCondition) {
        level.winSigns?.push(sign);
      }

      result.push(newTag);
    });
    return result;
  }

  private getRandomStr(length: number): string {
    const chrs: string = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result: string = '';

    for (let i = 0; i < length; i += 1) {
      const pos = Math.floor(Math.random() * chrs.length);
      result += chrs[pos];
    }

    return result;
  }

  private getStatusLevelFromLoadedState(levelId: number): ResolveStatus {
    if (!this.state.levelsState.length) return ResolveStatus.NO;
    const status: StateOfLevel | undefined = this.state.levelsState.find((level: StateOfLevel) => level.id === levelId);
    return status?.resolveStatus || ResolveStatus.NO;
  }

  private saveStateInStorage(): void {
    const levelsState: StateOfLevel[] = [];

    this.levels.forEach((level: Level) => {
      const state: StateOfLevel = {
        id: level.id,
        resolveStatus: level.resolveStatus,
      };
      levelsState.push(state);
    });

    const dataToSave: StateOfGame = {
      curLevelNumber: this.currentLevelNumber,
      levelsState,
    };
    localStorage.setItem(Constants.LOCAL_STORAGE_PARAM_NAME, JSON.stringify(dataToSave));
  }
}
