import { ViewParams } from '../types';
import View from '../view';
import ElementCreator from '../../util/element-creator';
import { GameHTMLTag } from '../../../data/levels';
import { getHighlightedTags } from '../../util/highlight-js';
import { CssClasses, Constants } from './types';

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

  public setHoverListeners(callback: (signElement: string) => void): void {
    this.getHtmlElement().addEventListener('mouseover', (e) => {
      let { target }: { target: EventTarget | null } = e;

      while (target !== this.getHtmlElement()) {
        if (!target || !(target instanceof Element)) return;
        if (target.tagName !== 'SPAN') {
          const hoverSign: string | null = target.getAttribute(Constants.ATTRIBUTE_SIGN_NAME);
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

  public setNewCode(markup: GameHTMLTag[]): void {
    this.codeBlock.removeInnerElements();
    this.buildHTMLCode(markup);
  }

  public showSelectedItem(signElement: string): void {
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

  private generateLineNumbersText(): string {
    const numbers: string[] = [];
    for (let i = 1; i <= Constants.LINES_COUNT; i += 1) {
      numbers.push(i.toString());
    }
    return numbers.join('<br>');
  }

  private buildHTMLCode(markup: GameHTMLTag[]): void {
    this.codeBlock.getElement().innerHTML = getHighlightedTags('<div class="table">');

    markup.forEach((tag: GameHTMLTag) => {
      const element: HTMLElement = this.createHTMLTags(tag);
      this.codeBlock.addInnerElement(element);
    });

    this.codeBlock.getElement().insertAdjacentHTML('beforeend', getHighlightedTags('</div>'));
  }

  private createHTMLTags(markup: GameHTMLTag): HTMLElement {
    const result: ElementCreator = new ElementCreator({
      tag: markup.tagName,
      classNames: markup.className ? [markup.className] : [],
      textContent: '',
    });

    if (markup.signElement) {
      result.setAttribute(Constants.ATTRIBUTE_SIGN_NAME, markup.signElement);
      this.elements?.set(markup.signElement, result.getElement());
    }

    if (markup.children && markup.children.length) {
      result.getElement().innerHTML = getHighlightedTags(`<${this.getTagForHighlight(markup)}>`);
      markup.children.forEach((child: GameHTMLTag) => {
        const element: HTMLElement = this.createHTMLTags(child);
        result.addInnerElement(element);
      });
      result.getElement().insertAdjacentHTML('beforeend', getHighlightedTags(`</${markup.tagName}>`));
    } else {
      result.getElement().innerHTML = getHighlightedTags(`<${this.getTagForHighlight(markup)} />`);
    }

    return result.getElement();
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

  private getTagForHighlight(markup: GameHTMLTag): string {
    let result: string = markup.tagName;
    if (markup.className) result += ` class="${markup.className}"`;
    return result;
  }
}
