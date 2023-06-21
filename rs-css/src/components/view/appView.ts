import './appView.scss';
import LevelListView from './level-list/level-list';
import { CssClasses, TextHTML, LinkHTML } from './types';
import ElementCreator from '../util/element-creator';
import CodeView from './code/code-view';
import TableView from './table/table-view';
import Level from '../controller/types';

export default class AppView {
  public levelListView: LevelListView;
  private codeView: CodeView;
  private tableView: TableView;

  constructor() {
    this.levelListView = new LevelListView();
    this.codeView = new CodeView();
    this.tableView = new TableView();
    document.body.append(this.createHeader().getElement());
    document.body.append(this.createMain().getElement());
    document.body.append(this.createAside().getElement());
    document.body.append(this.createFooter().getElement());
  }

  public addLevels(levels: Level[]): void {
    this.levelListView.createLevelsList(levels);
  }

  public setClickLevelCallback(callback: (levelId: string) => void) {
    this.levelListView.setClickCallback(callback);
  }

  public setHoverElementCallback(callback: (hash: string) => void) {
    this.codeView.setListeners(callback);
    this.tableView.setListeners(callback);
  }

  public showTargetElement(hash: string): void {
    this.codeView.showSelectedItem(hash);
    // this.tableView.
  }

  public setNewLevel(level: Level): void {
    this.levelListView.selectLevel(level.id);
    this.codeView.setNewCode(level.markup);
    this.tableView.setNewTable(level.markup);
  }

  private createHeader(): ElementCreator {
    const headerElementCreator: ElementCreator = new ElementCreator({
      tag: 'header',
      classNames: [CssClasses.HEADER],
      textContent: '',
    });
    const helpElementCreator: ElementCreator = new ElementCreator({
      tag: 'a',
      classNames: [CssClasses.HEADER_HELP],
      textContent: TextHTML.HEADER_HELP_BUTTON,
    });
    helpElementCreator.setAttribute('href', '#!');
    headerElementCreator.addInnerElement(helpElementCreator.getElement());
    return headerElementCreator;
  }

  private createMain(): ElementCreator {
    const mainElementCreator: ElementCreator = new ElementCreator({
      tag: 'main',
      classNames: [CssClasses.MAIN],
      textContent: '',
    });
    mainElementCreator.addInnerElement(this.tableView.getHtmlElement());
    mainElementCreator.addInnerElement(this.codeView.getHtmlElement());
    return mainElementCreator;
  }

  private createAside(): ElementCreator {
    const asideElementCreator: ElementCreator = new ElementCreator({
      tag: 'aside',
      classNames: [CssClasses.ASIDE],
      textContent: '',
    });
    const titleElementCreator: ElementCreator = new ElementCreator({
      tag: 'p',
      classNames: [CssClasses.ASIDE_TITLE],
      textContent: TextHTML.ASIDE_TITLE,
    });
    asideElementCreator.addInnerElement(titleElementCreator.getElement());
    asideElementCreator.addInnerElement(this.levelListView.getHtmlElement());
    return asideElementCreator;
  }

  private createFooter(): ElementCreator {
    const footerElementCreator: ElementCreator = new ElementCreator({
      tag: 'header',
      classNames: [CssClasses.HEADER],
      textContent: '',
    });
    const gitElementCreator: ElementCreator = new ElementCreator({
      tag: 'a',
      classNames: [CssClasses.FOOTER_GITHUB],
      textContent: TextHTML.FOOTER_GIT,
    });
    gitElementCreator.setAttribute('href', LinkHTML.FOOTER_GIT);
    const yearElementCreator: ElementCreator = new ElementCreator({
      tag: 'p',
      classNames: [CssClasses.FOOTER_YEAR],
      textContent: TextHTML.FOOTER_YEAR,
    });
    const schoolElementCreator: ElementCreator = new ElementCreator({
      tag: 'a',
      classNames: [CssClasses.FOOTER_SCHOOL],
      textContent: '',
    });
    schoolElementCreator.setAttribute('href', LinkHTML.FOOTER_SCHOOL);
    footerElementCreator.addInnerElement(gitElementCreator.getElement());
    footerElementCreator.addInnerElement(yearElementCreator.getElement());
    footerElementCreator.addInnerElement(schoolElementCreator.getElement());
    return footerElementCreator;
  }
}
