import { LevelConfigs, LevelData, GameHTMLTag } from '../../data/levels';
import { Level, SIGN_LENGTH } from './types';
import { getRandomStr } from '../util/utils';

export default class Model {
  private curLevel: Level;
  public levels: Level[];

  constructor() {
    this.levels = [];
    this.initLevelsData();
    [this.curLevel] = this.levels;
  }

  get getLevelCount(): number {
    return this.levels.length;
  }

  get currentLevel(): Level {
    return this.curLevel;
  }

  public setCurrentLevel(levelId: number): void {
    const newLevel: Level | undefined = this.levels.find((level) => level.id === levelId);
    if (newLevel && newLevel !== this.curLevel) this.curLevel = newLevel;
  }

  private initLevelsData(): void {
    LevelData.forEach((levelConfigs: LevelConfigs) => {
      const level: Level = {
        ...levelConfigs,
        signs: [],
        winSigns: [],
        id: this.levels.length + 1,
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
