import { LevelConfigs, LevelData, GameHTMLTag } from '../../data/levels';
import { Level, SIGN_LENGTH, ResolveStatus, StateOfGame, StateOfLevel, LOCAL_STORAGE_PARAM_NAME } from './types';

export default class Model {
  private currentLevelNumber: number = 1;
  public levels: Level[];

  constructor() {
    this.levels = [];
    this.initLevelsData();
    this.loadStateFromStorage();
    window.addEventListener('beforeunload', () => this.saveStateInStorage());
  }

  get getLevelCount(): number {
    return this.levels.length;
  }

  get currentLevel(): Level {
    return this.levels[this.currentLevelNumber - 1];
  }

  public setCurrentLevel(levelId: number): void {
    const newLevel: Level | undefined = this.levels.find((level) => level.id === levelId);
    if (newLevel) this.currentLevelNumber = newLevel.id;
  }

  private initLevelsData(): void {
    LevelData.forEach((levelConfigs: LevelConfigs) => {
      const level: Level = {
        ...levelConfigs,
        signs: [],
        winSigns: [],
        id: this.levels.length + 1,
        resolveStatus: ResolveStatus.NO,
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
      let sign: string = this.getRandomStr(SIGN_LENGTH);
      while (level.signs?.includes(sign)) {
        sign = this.getRandomStr(SIGN_LENGTH);
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

  private loadStateFromStorage(): void {
    const loadetData: string | null = localStorage.getItem(LOCAL_STORAGE_PARAM_NAME);
    if (!loadetData) {
      this.currentLevelNumber = 1;
      return;
    }

    const loadedState: StateOfGame = JSON.parse(loadetData);
    this.currentLevelNumber = loadedState.curLevel;
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
      curLevel: this.currentLevelNumber,
      levelsState,
    };
    localStorage.setItem(LOCAL_STORAGE_PARAM_NAME, JSON.stringify(dataToSave));
  }
}
