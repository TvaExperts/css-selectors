import View from '../view';
import { ViewParams } from '../types';
import ElementCreator from '../../util/element-creator';
import { GameHTMLTag } from '../../../data/levels';
import { AnimationCssClasses, AnimationConstants } from '../../../sass/animation/types';
import { getHighlightedTags } from '../../util/highlight-js';
import { CssClasses, Constants } from './types';

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
      const hoverDivSign: string | null = target.getAttribute(Constants.ATTRIBUTE_SIGN_NAME);
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
      this.tooltip.getElement().innerHTML = getHighlightedTags(this.getTooltipTextFromElement(element));
      this.tooltip.getElement().style.display = 'block';
      this.tooltip.getElement().style.left = `${element.getBoundingClientRect().x}px`;
      this.tooltip.getElement().style.top = `${this.tableSurface.getElement().getBoundingClientRect().y - 30}px`;
    }
  }

  public setNewTable(markup: GameHTMLTag[]): void {
    this.tableSurface.removeInnerElements();
    markup.forEach((tag) => {
      this.tableSurface.addInnerElement(this.buildTable(tag));
    });
  }

  public shakeTableElements(signsElements: string[]): void {
    signsElements.forEach((sign: string) => {
      const element: HTMLElement | undefined = this.elements.get(sign);
      const isWinCondition = element?.classList.contains(AnimationCssClasses.WIN_CONDITION);
      if (isWinCondition) element?.classList.remove(AnimationCssClasses.WIN_CONDITION);
      element?.classList.add(AnimationCssClasses.SHAKE);

      setTimeout(() => {
        element?.classList.remove(AnimationCssClasses.SHAKE);
        if (isWinCondition) element?.classList.add(AnimationCssClasses.WIN_CONDITION);
      }, AnimationConstants.WRONG_DURATION);
    });
  }

  public showWinAnimation(): void {
    this.elements.forEach((element: HTMLElement) => {
      if (element.classList.contains(AnimationCssClasses.WIN_CONDITION)) {
        element.classList.replace(AnimationCssClasses.WIN_CONDITION, AnimationCssClasses.IS_WIN);
      }
    });
  }

  public getSignsElementBySelector(selector: string): string[] {
    let nodeList: NodeListOf<Element> | undefined;
    try {
      nodeList = this.tableSurface.getElement().querySelectorAll(`${selector}`);
    } catch {
      return [];
    }
    const signsArr: string[] = [];
    nodeList.forEach((node: Element) => {
      const signElement: string | null = node.getAttribute(Constants.ATTRIBUTE_SIGN_NAME);
      if (signElement) signsArr.push(signElement);
    });

    return signsArr;
  }

  private buildTable(markup: GameHTMLTag): HTMLElement {
    const result: ElementCreator = new ElementCreator({
      tag: markup.tagName,
      classNames: markup.className ? [markup.className] : [],
      textContent: '',
    });
    if (markup.signElement) {
      result.setAttribute(Constants.ATTRIBUTE_SIGN_NAME, markup.signElement);
      this.elements.set(markup.signElement, result.getElement());
    }
    if (markup.winCondition) result.addCssClasses([AnimationCssClasses.WIN_CONDITION]);
    if (markup.children && markup.children.length) {
      markup.children.forEach((child: GameHTMLTag) => {
        const element: HTMLElement = this.buildTable(child);
        if (child.signElement) this.elements?.set(child.signElement, element);
        result.addInnerElement(element);
      });
    }
    return result.getElement();
  }

  private removeSelection(): void {
    this.elements.forEach((element: HTMLElement) => {
      element.classList.remove(CssClasses.SELECTED_ELEMENT);
    });
    this.tooltip.getElement().style.display = 'none';
    this.tooltip.removeInnerElements();
  }

  private getTooltipTextFromElement(element: HTMLElement): string {
    let result: string = '';
    const tagName = element.tagName.toLowerCase();
    const { id } = element;
    const visualClasses: string[] = [
      AnimationCssClasses.WIN_CONDITION,
      AnimationCssClasses.SHAKE,
      AnimationCssClasses.IS_WIN,
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
    result += element.children.length ? `> </${tagName}>` : ' />';
    return result;
  }
}
