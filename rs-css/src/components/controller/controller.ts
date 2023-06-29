import Model from './model';
import AppView from '../view/appView';

export default class Controller {
  private model: Model;
  private view: AppView;

  constructor(view: AppView) {
    this.view = view;
    this.model = new Model();
    this.initData();
    this.initCallbacks();
    this.loadLevel(this.model.currentLevel.id);
  }

  private initData(): void {
    this.view.addLevels(this.model.levels);
  }

  private initCallbacks(): void {
    this.view.setClickListItemCallback(this.loadLevel.bind(this));
    this.view.setHoverElementCallback(this.showTargetElement.bind(this));
    this.view.setCheckCssCallback(this.checkSelector.bind(this));
    this.view.setHintCallback(this.showHint.bind(this));
    this.view.setResetProgressCallback(this.resetProgress.bind(this));
  }

  private resetProgress(): void {
    this.model.resetProgress();
    this.view.resetProgress();
  }

  private showHint(): void {
    this.model.usedHint = true;
    this.view.showHint(this.model.currentLevel.hint);
  }

  private loadLevel(levelId: number): void {
    this.model.setCurrentLevel(levelId);
    this.view.setNewLevel(this.model.currentLevel);
  }

  private showTargetElement(signElement: string): void {
    this.view.showTargetElement(signElement);
  }

  private checkSelector(selector: string): void {
    if (!selector) {
      this.view.shakeEditor();
      return;
    }

    if (selector.match(/^\d/gm)) {
      this.handleDigitSelector(selector);
      return;
    }

    const selectedSignsElements: string[] = this.view.getSignsElementBySelector(selector);
    if (!selectedSignsElements.length) {
      this.view.shakeEditor();
      return;
    }

    const winConditionArraySigns: string[] = this.model.currentLevel.winSigns;

    if (this.isSameArrays(winConditionArraySigns, selectedSignsElements)) {
      this.model.setWinStatusToCurrentLevel();
      this.view.showWin(this.model.currentLevel);

      this.setNextLevel();
    } else {
      this.view.shakeTableElements(selectedSignsElements);
    }
  }

  private setNextLevel() {
    const nextLevel: number = this.model.currentLevel.id + 1;
    if (nextLevel <= this.model.getLevelCount) {
      this.model.setCurrentLevel(nextLevel);
      this.view.setNewLevel(this.model.currentLevel);
    } else {
      console.log('last level'); // TODO
    }
  }

  private isSameArrays(array1: string[], array2: string[]): boolean {
    if (array1.length !== array2.length) return false;
    return array1.every((item: string) => array2.includes(item));
  }

  private handleDigitSelector(selector: string): void {
    if (selector.match(/\D/gm)) {
      this.view.shakeEditor();
      return;
    }
    const levelNumber: number | undefined = parseInt(selector, 10);
    if (!levelNumber || levelNumber <= 0 || levelNumber > this.model.getLevelCount) {
      this.view.shakeEditor();
    } else {
      this.loadLevel(levelNumber);
    }
  }
}
