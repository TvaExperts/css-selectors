import Model from './model';
import AppView from '../view/appView';
import Level from './types';

export default class Controller {
  model: Model;
  view: AppView;

  constructor(view: AppView) {
    this.view = view;
    this.model = new Model();
    this.initData();
    this.initCallbacks();
  }

  private initData(): void {
    this.view.addLevels(this.model.levels);
  }

  private initCallbacks(): void {
    this.view.setClickLevelCallback(this.loadLevel.bind(this));
    this.view.setHoverElementCallback(this.showTargetElement.bind(this));
  }

  private showTargetElement(signElement: string): void {
    this.view.showTargetElement(signElement);
  }

  private loadLevel(levelId: string): void {
    this.model.setCurrentLevel(levelId);
    const level: Level | null = this.model.getCurrentLevel();
    if (!level) throw new Error('Err!');
    this.view.setNewLevel(level);
  }
}
