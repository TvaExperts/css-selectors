import { LevelConfigs, LevelData, GameHTMLTag } from '../../data/levels';
import { Level, SIGN_LENGTH } from './types';

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
}
