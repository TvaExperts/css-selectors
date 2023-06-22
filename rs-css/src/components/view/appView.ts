import './appView.scss';
import LevelListView from './level-list/level-list';
import { CssClasses, TextHTML, LinkHTML } from './types';
import ElementCreator from '../util/element-creator';
import TableView from './table/table-view';
import Level from '../controller/types';
import CodeViewerView from './code-viewer/code-viewer-view';
import CssInputView from './css-input/css-input-view';

export default class AppView {
  private levelListView: LevelListView;
  private codeView: CodeViewerView;
  private tableView: TableView;
  private cssInput: CssInputView;

  constructor() {
    this.levelListView = new LevelListView();
    this.codeView = new CodeViewerView();
    this.tableView = new TableView();
    this.cssInput = new CssInputView();
    this.buildHeader();
    this.buildMain();
    this.buildAside();
    this.buildFooter();
  }

  public addLevels(levels: Level[]): void {
    this.levelListView.createLevelsList(levels);
  }

  public setClickLevelCallback(callback: (levelId: string) => void) {
    this.levelListView.setClickCallback(callback);
  }

  public setHoverElementCallback(callback: (signElement: string) => void) {
    this.codeView.setHoverListeners(callback);
    this.tableView.setHoverListeners(callback);
  }

  public showTargetElement(signElement: string): void {
    this.codeView.showSelectedItem(signElement);
    this.tableView.showHoveredElement(signElement);
  }

  public setNewLevel(level: Level): void {
    this.levelListView.selectLevel(level.id);
    this.codeView.setNewCode(level.markup);
    this.tableView.setNewTable(level.markup);
  }

  private buildHeader(): void {
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
    document.body.append(headerElementCreator.getElement());
  }

  private buildMain(): void {
    const mainElementCreator: ElementCreator = new ElementCreator({
      tag: 'main',
      classNames: [CssClasses.MAIN],
      textContent: '',
    });
    mainElementCreator.addInnerElement(this.tableView.getHtmlElement());
    const codeBlockElementCreator: ElementCreator = new ElementCreator({
      tag: 'div',
      classNames: [CssClasses.MAIN_CODE],
      textContent: '',
    });
    codeBlockElementCreator.addInnerElement(this.cssInput.getHtmlElement());
    codeBlockElementCreator.addInnerElement(this.codeView.getHtmlElement());
    mainElementCreator.addInnerElement(codeBlockElementCreator.getElement());
    document.body.append(mainElementCreator.getElement());
  }

  private buildAside(): void {
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
    document.body.append(asideElementCreator.getElement());
  }

  private buildFooter(): void {
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
    document.body.append(footerElementCreator.getElement());
  }
}
