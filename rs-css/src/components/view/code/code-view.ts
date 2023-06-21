/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/qtcreator-dark.css';

import './code.scss';

// import ElementCreator from '../../../util/element-creator';
import { ViewParams } from '../types';
import View from '../view';
import { TagsHTML } from '../../../data/levels';
import ElementParams from '../../util/types';
import ElementCreator from '../../util/element-creator';

hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));

const CssClasses = {
  CODE: 'game__code',
};

export default class CodeView extends View {
  elements: Map<string, HTMLElement>;

  constructor() {
    const params: ViewParams = {
      tag: 'div',
      classNames: [CssClasses.CODE],
    };
    super(params);
    this.elements = new Map<string, HTMLElement>();
  }

  public setListeners(callback: (hash: string) => void) {
    this.getHtmlElement().addEventListener('mouseover', (e) => {
      let { target }: { target: EventTarget | null } = e;

      while (target !== this.getHtmlElement()) {
        if (!target || !(target instanceof Element)) return;
        if (target.tagName === 'DIV') {
          const hoverDivHash: string | null = target.getAttribute('hash');
          if (hoverDivHash) {
            callback(hoverDivHash);
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

  public setNewCode(markup: TagsHTML[]) {
    this.viewElementCreator.removeInnerElements();
    this.viewElementCreator.addInnerElement(this.buildHTMLCode(markup));
  }

  private removeBold(): void {
    this.elements.forEach((element: HTMLElement) => {
      const nodes = element.children;
      for (let i = 0; i < nodes.length; i += 1) {
        if (nodes[i].tagName === 'SPAN') {
          nodes[i].classList.remove('select-line');
        }
      }
    });
  }

  public showSelectedItem(hash: string = ''): void {
    this.removeBold();
    if (!hash) return;
    const elemetn = this.elements.get(hash);
    if (!elemetn) return;
    const nodes = elemetn.children;
    for (let i = 0; i < nodes.length; i += 1) {
      if (nodes[i].tagName === 'SPAN') {
        nodes[i].classList.add('select-line');
      }
    }
  }

  private buildHTMLCode(markup: TagsHTML[]): HTMLElement {
    const params: ElementParams = {
      tag: 'div',
      classNames: [],
      textContent: '',
    };
    const table: ElementCreator = new ElementCreator(params);
    table.getElement().innerHTML = this.getHighlightedTags('<div class="table">');

    markup.forEach((tag: TagsHTML) => {
      const el: HTMLElement = this.createHTMLTags(tag);
      if (tag.hash) this.elements?.set(tag.hash, el);
      table.addInnerElement(el);
    });
    table.getElement().insertAdjacentHTML('beforeend', this.getHighlightedTags('</div>'));
    return table.getElement();
  }

  private createHTMLTags(markup: TagsHTML): HTMLElement {
    const params: ElementParams = {
      tag: 'div',
      classNames: [],
      textContent: '',
    };
    const result: ElementCreator = new ElementCreator(params);
    if (markup.hash) result.setAttribute('hash', markup.hash);
    if (markup.children && markup.children.length) {
      result.getElement().innerHTML = this.getHighlightedTags(`<${this.getTagForHighlight(markup)}>`);

      markup.children.forEach((child: TagsHTML) => {
        const el: HTMLElement = this.createHTMLTags(child);
        if (child.hash) this.elements?.set(child.hash, el);
        result.addInnerElement(el);
      });
      result.getElement().insertAdjacentHTML('beforeend', this.getHighlightedTags(`</${markup.tagName}>`));
    } else {
      result.getElement().innerHTML = this.getHighlightedTags(`<${this.getTagForHighlight(markup)} />`);
    }
    return result.getElement();
  }

  private getTagForHighlight(markup: TagsHTML): string {
    let result: string = markup.tagName;
    if (markup.className) result += ` class="${markup.className}"`;
    if (markup.idName) result += ` id="${markup.idName}"`;
    return result;
  }

  private getHighlightedTags(str: string): string {
    return hljs.highlight(str, { language: 'xml' }).value;
  }
}
