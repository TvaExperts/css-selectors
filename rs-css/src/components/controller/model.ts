import { LevelConfigs, LevelData, GameHTMLTag } from '../../data/levels';
import Level from './types';
import { getRandomStr } from '../util/utils';

const SIGN_LENGTH: number = 8;

export default class Model {
  public levels: Level[];
  public currentLevel: Level | null;

  constructor() {
    this.levels = [];
    this.currentLevel = null;

    this.initLevelsData();
  }

  public getCurrentLevel(): Level | null {
    return this.currentLevel;
  }

  public setCurrentLevel(levelId: string): void {
    const newLevel: Level | undefined = this.levels.find((level) => level.id === levelId);
    if (newLevel && newLevel !== this.currentLevel) this.currentLevel = newLevel;
  }

  private initLevelsData(): void {
    LevelData.forEach((levelConfigs: LevelConfigs) => {
      const level: Level = levelConfigs;
      level.signs = [];
      level.winSigns = [];
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
      let sign: string = getRandomStr(SIGN_LENGTH);
      while (level.signs?.includes(sign)) {
        sign = getRandomStr(SIGN_LENGTH);
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
}
