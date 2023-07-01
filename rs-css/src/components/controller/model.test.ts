import Model from './model';
import { LevelData } from '../../data/levels';
import { ResolveStatus } from './types';

describe('Model tests', () => {
  test('Should load all Levels from LevelsData', () => {
    const model = new Model();
    model.getLevelCount;
    expect(model.getLevelCount).toBe(LevelData.length);
  });

  test('Should change correct current Level', () => {
    const model = new Model();
    model.currentLevel.id;
    expect(model.currentLevel.id).toBe(1);
    model.setCurrentLevel(2);
    expect(model.currentLevel.id).toBe(2);
    model.setCurrentLevel(1);
    expect(model.currentLevel.id).toBe(1);
  });

  test('Should correct set resolve status', () => {
    const model = new Model();
    expect(model.currentLevel.id).toBe(1);
    expect(model.currentLevel.resolveStatus).toBe(ResolveStatus.NO);
    model.setWinStatusToCurrentLevel();
    expect(model.currentLevel.resolveStatus).toBe(ResolveStatus.DONE);

    model.setCurrentLevel(2);
    expect(model.currentLevel.resolveStatus).toBe(ResolveStatus.NO);
    model.usedHint = true;
    model.setWinStatusToCurrentLevel();
    expect(model.currentLevel.resolveStatus).toBe(ResolveStatus.DONE_WITH_HINT);
  });

  test('Should correct reset progress', () => {
    const model = new Model();
    model.setWinStatusToCurrentLevel();
    expect(model.currentLevel.resolveStatus).toBe(ResolveStatus.DONE);
    model.setCurrentLevel(2);
    model.usedHint = true;
    model.setWinStatusToCurrentLevel();
    expect(model.currentLevel.resolveStatus).toBe(ResolveStatus.DONE_WITH_HINT);
    model.resetProgress();
    expect(model.currentLevel.resolveStatus).toBe(ResolveStatus.NO);
    model.setCurrentLevel(1);
    expect(model.currentLevel.resolveStatus).toBe(ResolveStatus.NO);
  });
});
