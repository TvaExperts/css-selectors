import Controller from './controller/controller';
import AppView from './view/appView';

export default class App {
  private view: AppView;
  private controller: Controller;

  constructor() {
    this.view = new AppView();
    this.controller = new Controller(this.view);
  }
}
