import './code.scss';

import { ViewParams } from '../types';
import View from '../view';
import { GameHTMLTag } from '../../../data/levels';
import ElementParams from '../../util/types';
import ElementCreator from '../../util/element-creator';
import { CssClasses, ATTRIBUTE_SIGN_NAME, LINES_COUNT } from './types';
import { getHighlightedTags } from '../../util/utils';

export default class CodeViewerView extends View {
  elements: Map<string, HTMLElement>;
  codeBlock: ElementCreator;

  constructor() {
    const params: ViewParams = {
      tag: 'div',
      classNames: [CssClasses.CODE_VIEWER],
    };
    super(params);

    this.elements = new Map<string, HTMLElement>();

    const lineNumbers = new ElementCreator({
      tag: 'div',
      classNames: [CssClasses.LINE_NUMBERS],
      textContent: '',
    });
    lineNumbers.getElement().innerHTML = this.generateLineNumbersText();

    this.codeBlock = new ElementCreator({
      tag: 'div',
      classNames: [CssClasses.CODE],
      textContent: '',
    });
    this.viewElementCreator.addInnerElement(lineNumbers);
    this.viewElementCreator.addInnerElement(this.codeBlock);
  }

  private generateLineNumbersText(): string {
    const numbers: string[] = [];
    for (let i = 1; i <= LINES_COUNT; i += 1) {
      numbers.push(i.toString());
    }
    return numbers.join('<br>');
  }

  public setHoverListeners(callback: (signElement: string) => void) {
    this.getHtmlElement().addEventListener('mouseover', (e) => {
      let { target }: { target: EventTarget | null } = e;
      while (target !== this.getHtmlElement()) {
        if (!target || !(target instanceof Element)) return;
        if (target.tagName !== 'SPAN') {
          const hoverSign: string | null = target.getAttribute(ATTRIBUTE_SIGN_NAME);
          if (hoverSign) {
            callback(hoverSign);
          } else {
            callback('');
          }
          return;
        }
        target = target.parentNode;
      }
    });
    this.getHtmlElement().addEventListener('mouseleave', () => callback(''));
  }

  public setNewCode(markup: GameHTMLTag[]) {
    this.codeBlock.removeInnerElements();
    this.buildHTMLCode(markup);
  }

  public getSignsElementBySelector(selector: string): string[] {
    const nodeList: NodeListOf<Element> = this.codeBlock.getElement().querySelectorAll(selector);
    const signsArr: string[] = [];
    nodeList.forEach((node: Element) => {
      const signElement: string | null = node.getAttribute(ATTRIBUTE_SIGN_NAME);
      if (signElement) signsArr.push(signElement);
    });
    return signsArr;
  }

  private removeSelection(): void {
    this.elements.forEach((element: HTMLElement) => {
      const nodes = element.children;
      for (let i = 0; i < nodes.length; i += 1) {
        if (nodes[i].tagName === 'SPAN') {
          nodes[i].classList.remove(CssClasses.SELECTED_LINE);
        }
      }
    });
  }

  public showSelectedItem(signElement: string = ''): void {
    this.removeSelection();
    if (!signElement) return;
    const element = this.elements.get(signElement);
    if (!element) return;
    const nodes = element.children;
    for (let i = 0; i < nodes.length; i += 1) {
      if (nodes[i].tagName === 'SPAN') {
        nodes[i].classList.add(CssClasses.SELECTED_LINE);
      }
    }
  }

  private buildHTMLCode(markup: GameHTMLTag[]): void {
    this.codeBlock.getElement().innerHTML = getHighlightedTags('<div class="table">');
    markup.forEach((tag: GameHTMLTag) => {
      const element: HTMLElement = this.createHTMLTags(tag);
      if (tag.signElement) this.elements?.set(tag.signElement, element);
      this.codeBlock.addInnerElement(element);
    });
    this.codeBlock.getElement().insertAdjacentHTML('beforeend', getHighlightedTags('</div>'));
  }

  private createHTMLTags(markup: GameHTMLTag): HTMLElement {
    const params: ElementParams = {
      tag: markup.tagName,
      classNames: markup.className ? [markup.className] : [],
      textContent: '',
    };
    const result: ElementCreator = new ElementCreator(params);
    if (markup.signElement) result.setAttribute(ATTRIBUTE_SIGN_NAME, markup.signElement);
    if (markup.children && markup.children.length) {
      result.getElement().innerHTML = getHighlightedTags(`<${this.getTagForHighlight(markup)}>`);

      markup.children.forEach((child: GameHTMLTag) => {
        const element: HTMLElement = this.createHTMLTags(child);
        if (child.signElement) this.elements?.set(child.signElement, element);
        result.addInnerElement(element);
      });
      result.getElement().insertAdjacentHTML('beforeend', getHighlightedTags(`</${markup.tagName}>`));
    } else {
      result.getElement().innerHTML = getHighlightedTags(`<${this.getTagForHighlight(markup)} />`);
    }
    return result.getElement();
  }

  private getTagForHighlight(markup: GameHTMLTag): string {
    let result: string = markup.tagName;
    if (markup.className) result += ` class="${markup.className}"`;
    if (markup.idName) result += ` id="${markup.idName}"`;
    return result;
  }
}
