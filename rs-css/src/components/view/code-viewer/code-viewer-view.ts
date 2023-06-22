import './code.scss';

import { ViewParams } from '../types';
import View from '../view';
import { GameHTMLTag } from '../../../data/levels';
import ElementParams from '../../util/types';
import ElementCreator from '../../util/element-creator';
import { CssClasses, ATTRIBUTE_SIGN_NAME } from './types';
import { getHighlightedTags } from '../../util/utils';

export default class CodeViewerView extends View {
  elements: Map<string, HTMLElement>;

  constructor() {
    const params: ViewParams = {
      tag: 'div',
      classNames: [CssClasses.CODE_VIEWER],
    };
    super(params);
    this.elements = new Map<string, HTMLElement>();
  }

  public setHoverListeners(callback: (signElement: string) => void) {
    this.getHtmlElement().addEventListener('mouseover', (e) => {
      let { target }: { target: EventTarget | null } = e;

      while (target !== this.getHtmlElement()) {
        if (!target || !(target instanceof Element)) return;
        if (target.tagName === 'DIV') {
          const hoverDivSign: string | null = target.getAttribute(ATTRIBUTE_SIGN_NAME);
          if (hoverDivSign) {
            callback(hoverDivSign);
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
    this.viewElementCreator.removeInnerElements();
    this.viewElementCreator.addInnerElement(this.buildHTMLCode(markup));
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

  private buildHTMLCode(markup: GameHTMLTag[]): HTMLElement {
    const params: ElementParams = {
      tag: 'div',
      classNames: [],
      textContent: '',
    };
    const table: ElementCreator = new ElementCreator(params);
    table.getElement().innerHTML = getHighlightedTags('<div class="table">');
    markup.forEach((tag: GameHTMLTag) => {
      const element: HTMLElement = this.createHTMLTags(tag);
      if (tag.signElement) this.elements?.set(tag.signElement, element);
      table.addInnerElement(element);
    });
    table.getElement().insertAdjacentHTML('beforeend', getHighlightedTags('</div>'));
    return table.getElement();
  }

  private createHTMLTags(markup: GameHTMLTag): HTMLElement {
    const params: ElementParams = {
      tag: 'div',
      classNames: [],
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
