import './main.scss';
import ElementCreator from '../../util/element-creator';
import ViewParams from '../types';
import View from '../view';
import CodeView from './code/code-view';
import TableView from './table/table-view';

const CssClasses = {
  MAIN: 'main',
  TASK_TITLE: 'game__title',
  TABLE: 'game__table',
  CODE: 'game__code',
};

export default class MainView extends View {
  constructor() {
    const params: ViewParams = {
      tag: 'main',
      classNames: [CssClasses.MAIN],
    };
    super(params);
    this.configureView();
  }

  configureView() {
    const titleElementCreator: ElementCreator = new ElementCreator({
      tag: 'p',
      classNames: [CssClasses.TASK_TITLE],
      textContent: 'TASK_TITLE',
    });
    this.viewElementCreator.addInnerElement(titleElementCreator.getElement());
    this.viewElementCreator.addInnerElement(new CodeView().getHtmlElement());
    this.viewElementCreator.addInnerElement(new TableView().getHtmlElement());
  }
}
