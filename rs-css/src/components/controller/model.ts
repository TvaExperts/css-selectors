import { LevelConfigs, LevelData, TagsHTML } from '../../data/levels';
import Level from './types';
import getRandomStr from '../util/utils';

const HASH_LENGTH: number = 12;

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
    const newLevel = this.levels.find((level) => level.id === levelId);
    if (newLevel && newLevel !== this.currentLevel) this.currentLevel = newLevel;
  }

  private initLevelsData(): void {
    LevelData.forEach((levelConfigs: LevelConfigs) => {
      const level: Level = levelConfigs;
      level.hashs = [];
      level.markup = this.getMarkupWithHashes(level.markup, level);
      this.levels.push(level);
    });
  }

  private getMarkupWithHashes(markup: TagsHTML[], level: Level): TagsHTML[] {
    const result: TagsHTML[] = [];
    markup.forEach((tag: TagsHTML) => {
      const newTag = tag;
      if (newTag.children && newTag.children.length) {
        newTag.children = this.getMarkupWithHashes(newTag.children, level);
      }
      const hash: string = getRandomStr(HASH_LENGTH);
      level.hashs?.push(hash);
      newTag.hash = hash;
      result.push(newTag);
    });
    return result;
  }
}
