import './table.scss';
import { ViewParams } from '../types';
import View from '../view';
import { GameHTMLTag } from '../../../data/levels';
import ElementParams from '../../util/types';
import ElementCreator from '../../util/element-creator';
import CssClasses from './types';

export default class TableView extends View {
  elements: Map<string, HTMLElement>;

  constructor() {
    const params: ViewParams = {
      tag: 'div',
      classNames: [CssClasses.TABLE],
    };
    super(params);
    this.elements = new Map<string, HTMLElement>();
  }

  public setHoverListeners(callback: (sign: string) => void) {
    this.getHtmlElement().addEventListener('mouseover', (e) => {
      const { target }: { target: EventTarget | null } = e;
      if (!target || !(target instanceof Element)) return;
      const hoverDivSign: string | null = target.getAttribute('sign');
      if (hoverDivSign) {
        callback(hoverDivSign);
      } else {
        callback('');
      }
    });
    this.getHtmlElement().addEventListener('mouseleave', () => callback(''));
  }

  public showHoveredElement(signElement: string): void {
    this.removeSelection();
    const element: HTMLElement | undefined = this.elements.get(signElement);
    if (element) element.classList.add(CssClasses.SELECTED_ELEMENT);
  }

  public setNewTable(markup: GameHTMLTag[]) {
    this.viewElementCreator.removeInnerElements();
    markup.forEach((tag) => this.viewElementCreator.addInnerElement(this.buildTable(tag)));
  }

  private buildTable(markup: GameHTMLTag): HTMLElement {
    const params: ElementParams = {
      tag: markup.tagName,
      classNames: markup.className ? [markup.className] : [],
      textContent: '',
    };
    const result: ElementCreator = new ElementCreator(params);
    if (markup.signElement) {
      result.setAttribute('sign', markup.signElement);
      this.elements.set(markup.signElement, result.getElement());
    }
    if (markup.winCondition) result.addCssClasses([CssClasses.WIN_CONDITION_ANIMATION]);
    if (markup.children && markup.children.length) {
      markup.children.forEach((child: GameHTMLTag) => {
        const el: HTMLElement = this.buildTable(child);
        if (child.signElement) this.elements?.set(child.signElement, el);
        result.addInnerElement(el);
      });
    }
    return result.getElement();
  }

  private removeSelection(): void {
    this.elements.forEach((element: HTMLElement) => {
      element.classList.remove(CssClasses.SELECTED_ELEMENT);
    });
  }
}
