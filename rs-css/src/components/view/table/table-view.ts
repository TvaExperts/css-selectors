import './table.scss';
import { ViewParams } from '../types';
import View from '../view';
import { GameHTMLTag } from '../../../data/levels';
import ElementCreator from '../../util/element-creator';
import { CssClasses, ATTRIBUTE_SIGN_NAME } from './types';

export default class TableView extends View {
  tooltip: ElementCreator;
  tableSurface: ElementCreator;
  elements: Map<string, HTMLElement>;

  constructor() {
    const params: ViewParams = {
      tag: 'div',
      classNames: [CssClasses.TABLE],
    };
    super(params);
    this.elements = new Map<string, HTMLElement>();

    this.tooltip = new ElementCreator({
      tag: 'div',
      classNames: [CssClasses.TABLE_TOOLTIP],
      textContent: '',
    });
    this.viewElementCreator.addInnerElement(this.tooltip);

    this.tableSurface = new ElementCreator({
      tag: 'div',
      classNames: [CssClasses.TABLE_SURFACE],
      textContent: '',
    });
    this.viewElementCreator.addInnerElement(this.tableSurface);
  }

  public setHoverListeners(callback: (sign: string) => void) {
    this.getHtmlElement().addEventListener('mouseover', (e) => {
      const { target }: { target: EventTarget | null } = e;
      if (!target || !(target instanceof Element)) return;
      const hoverDivSign: string | null = target.getAttribute(ATTRIBUTE_SIGN_NAME);
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
    if (element) {
      element.classList.add(CssClasses.SELECTED_ELEMENT);
      this.tooltip.setTextContent(this.getTooltipTextFromElement(element));
      this.tooltip.getElement().style.left = `${element.getBoundingClientRect().x}px`;
      this.tooltip.getElement().style.top = `${element.getBoundingClientRect().y - 40}px`;
    }
  }

  public setNewTable(markup: GameHTMLTag[]) {
    this.tableSurface.removeInnerElements();
    markup.forEach((tag) => this.tableSurface.addInnerElement(this.buildTable(tag)));
  }

  public shakeTableElements(signsElements: string[]): void {
    signsElements.forEach((sign: string) => {
      const element: HTMLElement | undefined = this.elements.get(sign);
      element?.classList.add(CssClasses.ANIMATION_SHAKE);
      setTimeout(() => {
        element?.classList.remove(CssClasses.ANIMATION_SHAKE);
      }, 500);
    });
  }

  private buildTable(markup: GameHTMLTag): HTMLElement {
    const result: ElementCreator = new ElementCreator({
      tag: markup.tagName,
      classNames: markup.className ? [markup.className] : [],
      textContent: '',
    });
    if (markup.signElement) {
      result.setAttribute(ATTRIBUTE_SIGN_NAME, markup.signElement);
      this.elements.set(markup.signElement, result.getElement());
    }
    if (markup.idName) {
      result.setAttribute('id', markup.idName);
    }
    if (markup.winCondition) result.addCssClasses([CssClasses.ANIMATION_WIN_CONDITION]);
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
    this.tooltip.removeInnerElements();
  }

  private getTooltipTextFromElement(element: HTMLElement): string {
    let result: string = '';
    const tagName = element.tagName.toLowerCase();
    const { id } = element;
    const visualClasses: string[] = [
      CssClasses.ANIMATION_SHAKE,
      CssClasses.ANIMATION_WIN_CONDITION,
      CssClasses.SELECTED_ELEMENT,
    ];
    let className = '';
    element.classList.forEach((elementClass) => {
      if (!visualClasses.includes(elementClass)) {
        className = elementClass;
      }
    });
    result = `<${tagName}`;
    result += className ? ` class="${className}"` : '';
    result += id ? ` id="${id}"` : '';
    result += `> </${tagName}>`;
    return result;
  }
}
