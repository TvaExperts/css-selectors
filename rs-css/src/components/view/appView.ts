import './appView.scss';
import LevelListView from './level-list/level-list';
import { CssClasses, TextHTML, LinkHTML } from './types';
import ElementCreator from '../util/element-creator';
import TableView from './table/table-view';
import { Level } from '../controller/types';
import CodeViewerView from './code-viewer/code-viewer-view';
import CssSelectorView from './css-selector/css-selector-view';

export default class AppView {
  private levelListView: LevelListView;
  private codeView: CodeViewerView;
  private tableView: TableView;
  private cssSelectorView: CssSelectorView;
  private editor: ElementCreator;
  private helpButton: ElementCreator;
  private mainTitle: ElementCreator;

  constructor() {
    this.levelListView = new LevelListView();
    this.codeView = new CodeViewerView();
    this.tableView = new TableView();
    this.cssSelectorView = new CssSelectorView();

    this.editor = new ElementCreator({
      tag: 'div',
      classNames: [CssClasses.MAIN_EDITOR],
      textContent: '',
    });

    this.helpButton = new ElementCreator({
      tag: 'div',
      classNames: [CssClasses.MAIN_HELP],
      textContent: TextHTML.MAIN_HELP,
    });

    this.mainTitle = new ElementCreator({
      tag: 'p',
      classNames: [CssClasses.MAIN_TITLE],
      textContent: '',
    });

    this.buildHeader();
    this.buildMain();
    this.buildAside();
    this.buildFooter();
  }

  public addLevels(levels: Level[]): void {
    this.levelListView.createLevelsList(levels);
  }

  public setClickLevelCallback(callback: (levelId: number) => void) {
    this.levelListView.setClickCallback(callback);
  }

  public setHoverElementCallback(callback: (signElement: string) => void) {
    this.codeView.setHoverListeners(callback);
    this.tableView.setHoverListeners(callback);
  }

  public setCheckCssCallback(callback: (selector: string) => void): void {
    this.cssSelectorView.setCheckCssCallback(callback);
  }

  public setHintCallback(callback: () => void): void {
    this.helpButton.getElement().addEventListener('click', callback);
  }

  public showTargetElement(signElement: string): void {
    this.codeView.showSelectedItem(signElement);
    this.tableView.showHoveredElement(signElement);
  }

  public getSignsElementBySelector(selector: string): string[] {
    return this.codeView.getSignsElementBySelector(selector);
  }

  public setNewLevel(level: Level): void {
    this.levelListView.selectLevel(level.id);
    this.codeView.setNewCode(level.markup);
    this.tableView.setNewTable(level.markup);
    this.mainTitle.setTextContent(level.title);
    this.cssSelectorView.clearInput();
  }

  public shakeEditor(): void {
    this.editor.addCssClasses([CssClasses.ANIMATION_SHAKE]);
    setTimeout(() => this.editor.removeCssClass([CssClasses.ANIMATION_SHAKE]), 500);
  }

  public shakeTableElements(signsElements: string[]): void {
    this.tableView.shakeTableElements(signsElements);
  }

  public showHint(hint: string): void {
    this.cssSelectorView.showHint(hint);
  }

  private buildHeader(): void {
    const headerElementCreator: ElementCreator = new ElementCreator({
      tag: 'header',
      classNames: [CssClasses.HEADER],
      textContent: '',
    });
    document.body.append(headerElementCreator.getElement());
  }

  private buildMain(): void {
    const mainElementCreator: ElementCreator = new ElementCreator({
      tag: 'main',
      classNames: [CssClasses.MAIN],
      textContent: '',
    });
    mainElementCreator.addInnerElement(this.mainTitle.getElement());
    mainElementCreator.addInnerElement(this.helpButton.getElement());
    mainElementCreator.addInnerElement(this.tableView.getHtmlElement());
    this.editor.addInnerElement(this.cssSelectorView.getHtmlElement());
    this.editor.addInnerElement(this.codeView.getHtmlElement());
    mainElementCreator.addInnerElement(this.editor.getElement());
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
