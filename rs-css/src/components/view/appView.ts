import ElementCreator from '../util/element-creator';
import AsideView from './aside/aside-view';
import TableView from './table/table-view';
import CodeViewerView from './code-viewer/code-viewer-view';
import CssSelectorView from './css-selector/css-selector-view';
import { Level } from '../controller/types';
import { CssClasses, TextHTML, LinkHTML } from './types';
import { AnimationCssClasses, AnimationConstants } from '../../sass/animation/types';
import GlobalCssClasses from '../../sass/types';

export default class AppView {
  private asideView: AsideView;
  private codeView: CodeViewerView;
  private tableView: TableView;
  private cssSelectorView: CssSelectorView;
  private editor: ElementCreator;
  private helpButton: ElementCreator;
  private mainTitle: ElementCreator;

  constructor() {
    this.asideView = new AsideView();
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
      classNames: [CssClasses.HEADER_HELP, GlobalCssClasses.BUTTON],
      textContent: TextHTML.HEADER_HELP,
    });

    this.mainTitle = new ElementCreator({
      tag: 'p',
      classNames: [CssClasses.MAIN_LEVEL_DESCRIPTION],
      textContent: '',
    });

    this.buildHeader();
    this.buildMain();
    document.body.append(this.asideView.getHtmlElement());
    this.buildFooter();
    this.buildGreetingModal();
  }

  public addLevelsInAside(levels: Level[]): void {
    this.asideView.createLevelsList(levels);
  }

  public setResetProgressCallback(callback: () => void): void {
    this.asideView.setResetProgressCallback(callback);
  }

  public resetProgress(): void {
    this.asideView.resetProgress();
  }

  public setClickListItemCallback(callback: (levelId: number) => void): void {
    this.asideView.setClickListItemCallback(callback);
  }

  public setHoverElementCallback(callback: (signElement: string) => void): void {
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
    return this.tableView.getSignsElementBySelector(selector);
  }

  public setNewLevel(level: Level): void {
    this.asideView.selectLevel(level.id);
    this.codeView.setNewCode(level.markup);
    this.tableView.setNewTable(level.markup);
    this.mainTitle.getElement().innerHTML = this.buildDescription(level.description);
    this.cssSelectorView.clearInput();
  }

  public shakeEditor(): void {
    this.editor.addCssClasses([AnimationCssClasses.WRONG]);
    setTimeout(() => this.editor.removeCssClass([AnimationCssClasses.WRONG]), AnimationConstants.WRONG_DURATION);
  }

  public shakeTableElements(signsElements: string[]): void {
    this.tableView.shakeTableElements(signsElements);
  }

  public showHint(hint: string): void {
    this.cssSelectorView.showHint(hint);
  }

  public showWinAnimation(): void {
    this.tableView.showWinAnimation();
  }

  public updateCheckmarkOfLevel(level: Level): void {
    this.asideView.updateCheckmarkStatus(level);
  }

  public showGreetingsModal(): void {
    document.body.classList.add(GlobalCssClasses.MODAL_OPENED);
  }

  private hideModal(e: MouseEvent): void {
    const { target }: { target: EventTarget | null } = e;
    if (!(target instanceof Element)) return;
    if (target.classList.contains(GlobalCssClasses.MODAL) || target.classList.contains(GlobalCssClasses.MODAL_CLOSE)) {
      document.body.classList.remove(GlobalCssClasses.MODAL_OPENED);
    }
  }

  private buildHeader(): void {
    const headerElementCreator: ElementCreator = new ElementCreator({
      tag: 'header',
      classNames: [CssClasses.HEADER],
      textContent: '',
    });

    const logeElementCreator: ElementCreator = new ElementCreator({
      tag: 'div',
      classNames: [CssClasses.HEADER_LOGO],
      textContent: TextHTML.HEADER_LOGO,
    });
    headerElementCreator.addInnerElement(logeElementCreator.getElement());
    headerElementCreator.addInnerElement(this.helpButton.getElement());
    document.body.append(headerElementCreator.getElement());
  }

  private buildMain(): void {
    const mainElementCreator: ElementCreator = new ElementCreator({
      tag: 'main',
      classNames: [CssClasses.MAIN],
      textContent: '',
    });
    mainElementCreator.addInnerElement(this.mainTitle.getElement());
    mainElementCreator.addInnerElement(this.tableView.getHtmlElement());
    this.editor.addInnerElement(this.cssSelectorView.getHtmlElement());
    this.editor.addInnerElement(this.codeView.getHtmlElement());
    mainElementCreator.addInnerElement(this.editor.getElement());
    document.body.append(mainElementCreator.getElement());
  }

  private buildFooter(): void {
    const footerElementCreator: ElementCreator = new ElementCreator({
      tag: 'footer',
      classNames: [CssClasses.FOOTER],
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

  private buildGreetingModal(): void {
    const modalElementCreator = new ElementCreator({
      tag: 'div',
      classNames: [GlobalCssClasses.MODAL],
      textContent: '',
    });
    modalElementCreator.getElement().addEventListener('click', (e: MouseEvent) => this.hideModal(e));
    const modalContentElementCreator = new ElementCreator({
      tag: 'div',
      classNames: [GlobalCssClasses.MODAL_CONTENT],
      textContent: '',
    });

    const modalTextCongratsMessageElementCreator = new ElementCreator({
      tag: 'p',
      classNames: [GlobalCssClasses.MODAL_TEXT_MESSAGE],
      textContent: TextHTML.MODAL_CONGRATS,
    });
    const modalTextGoodLuckMessageElementCreator = new ElementCreator({
      tag: 'p',
      classNames: [GlobalCssClasses.MODAL_TEXT_MESSAGE],
      textContent: TextHTML.MODAL_GOOD_LUCK,
    });
    const modalCloseButtonElementCreator = new ElementCreator({
      tag: 'div',
      classNames: [GlobalCssClasses.MODAL_CLOSE, GlobalCssClasses.BUTTON],
      textContent: TextHTML.MODAL_CLOSE,
    });
    modalCloseButtonElementCreator.getElement().addEventListener('click', (e: MouseEvent) => this.hideModal(e));
    modalContentElementCreator.addInnerElement(modalTextCongratsMessageElementCreator);
    modalContentElementCreator.addInnerElement(modalTextGoodLuckMessageElementCreator);
    modalContentElementCreator.addInnerElement(modalCloseButtonElementCreator);
    modalElementCreator.addInnerElement(modalContentElementCreator);
    document.body.append(modalElementCreator.getElement());
  }

  private buildDescription(text: string): string {
    const partsOfDescription = text.split('$');
    return partsOfDescription.reduce((sum: string, part: string, i: number) => {
      const partWithBold = i % 2 ? `<span>${part}</span>` : part;
      return sum + partWithBold;
    }, '');
  }
}
