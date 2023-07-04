import Model from './model';
import Controller from './controller';
import AppView from '../view/appView';

describe('Controller tests', () => {
  let controller: Controller;
  let appView: AppView;

  beforeEach(() => {
    appView = new AppView();
    controller = new Controller(appView);
  });

  test('Should change to next level in model and rebuild view', () => {
    expect(controller['model'].currentLevel.id).toBe(1);
    const spyChangeLevelInModel = jest.spyOn(controller['model'], 'setCurrentLevel');
    const spySetNewLevelInView = jest.spyOn(appView, 'setNewLevel');
    controller['setNextLevel']();
    expect(spyChangeLevelInModel).toHaveBeenCalled();
    expect(spySetNewLevelInView).toHaveBeenCalled();
  });

  test('Should show a modal window on the last level when switching', () => {
    const levelCount = controller['model'].getLevelCount;
    controller['model'].setCurrentLevel(levelCount);
    expect(controller['model'].currentLevel.id).toBe(levelCount);
    const spyChangeLevelInModel = jest.spyOn(controller['model'], 'setCurrentLevel');
    const spyShowModal = jest.spyOn(appView, 'showGreetingsModal');
    controller['setNextLevel']();
    expect(spyChangeLevelInModel).not.toHaveBeenCalled();
    expect(spyShowModal).toHaveBeenCalled();
  });

  test('Should check for the identity of the arrays', () => {
    expect(controller['isSameArrays'](['1', '2', '3'], ['1', '2'])).toBe(false);
    expect(controller['isSameArrays'](['1'], ['1', '2'])).toBe(false);
    expect(controller['isSameArrays'](['1', '2', '3'], ['1', '2', '4'])).toBe(false);
    expect(controller['isSameArrays'](['1', '2', '3'], [])).toBe(false);
    expect(controller['isSameArrays'](['1', '2', '3'], ['1', '2', '3'])).toBe(true);
    expect(controller['isSameArrays'](['1', '2', '3'], ['2', '1', '3'])).toBe(true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
