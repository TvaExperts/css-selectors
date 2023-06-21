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
  }

  private initData() {
    this.view.aside.createLevelsList(this.model.levels, this.loadLevel.bind(this));
  }

  private loadLevel(levelId: string) {
    const level: Level | undefined = this.model.levels.find((item: Level) => item.id === levelId);
    if (!level) throw new Error('Err!');
    this.view.aside.selectLevel(level.id);
    this.view.main.setNewLevel(level);
  }
}
