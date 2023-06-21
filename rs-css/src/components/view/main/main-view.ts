import './main.scss';
import ElementCreator from '../../util/element-creator';
import ViewParams from '../types';
import View from '../view';
import CodeView from './code/code-view';
import TableView from './table/table-view';
import Level from '../../controller/types';

const CssClasses = {
  MAIN: 'main',
  TASK_TITLE: 'game__title',
};

export default class MainView extends View {
  public codeView: CodeView;
  public tableView: TableView;
  private title: ElementCreator;

  constructor() {
    const params: ViewParams = {
      tag: 'main',
      classNames: [CssClasses.MAIN],
    };
    super(params);

    this.codeView = new CodeView();
    this.tableView = new TableView();
    this.title = new ElementCreator({
      tag: 'p',
      classNames: [CssClasses.TASK_TITLE],
      textContent: 'TASK_TITLE',
    });
    this.configureView();
  }

  public setNewLevel(level: Level): void {
    this.title.setTextContent(level.title);
    if (level.HTML) this.codeView.setCode(level.HTML);
    this.tableView.viewElementCreator.setTextContent(level.title);
  }

  private configureView() {
    this.viewElementCreator.addInnerElement(this.title.getElement());
    this.viewElementCreator.addInnerElement(this.tableView.getHtmlElement());
    this.viewElementCreator.addInnerElement(this.codeView.getHtmlElement());
  }
}
