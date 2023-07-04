import Model from './model';
import { LevelData } from '../../data/levels';
import { ResolveStatus } from './types';

describe('Model tests', () => {
  let model: Model;

  beforeEach(() => {
    model = new Model();
  });

  test('Should load all Levels from LevelsData', () => {
    expect(model.getLevelCount).toBe(LevelData.length);
  });

  test('Should change correct current Level', () => {
    expect(model.currentLevel.id).toBe(1);
    model.setCurrentLevel(2);
    expect(model.currentLevel.id).toBe(2);
    model.setCurrentLevel(1);
    expect(model.currentLevel.id).toBe(1);
  });

  test('Should correct set resolve status', () => {
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
