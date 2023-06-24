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
    this.loadLevel(1);
  }

  private initData(): void {
    this.view.addLevels(this.model.levels);
  }

  private initCallbacks(): void {
    this.view.setClickLevelCallback(this.loadLevel.bind(this));
    this.view.setHoverElementCallback(this.showTargetElement.bind(this));
    this.view.setCheckCssCallback(this.checkSelector.bind(this));
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
    if (!selectedSignsElements || !selectedSignsElements.length) {
      this.view.shakeEditor();
      return;
    }
    const winCondition: string[] = this.model.currentLevel.winSigns;
    if (selectedSignsElements.length !== winCondition.length) {
      this.view.shakeTableElements(selectedSignsElements);
      return;
    }
    if (winCondition.every((sign: string) => selectedSignsElements.includes(sign))) {
      console.log('Winner!');
    } else {
      this.view.shakeTableElements(selectedSignsElements);
    }
  }

  private handleDigitSelector(selector: string): void {
    const levelNumber: number | undefined = parseInt(selector, 10);
    if (!levelNumber || levelNumber <= 0 || levelNumber > this.model.getLevelCount) {
      this.view.shakeEditor();
    } else {
      this.loadLevel(levelNumber);
    }
  }
}
