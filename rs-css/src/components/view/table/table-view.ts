import './table.scss';
import { ViewParams } from '../types';
import View from '../view';
import { TagsHTML } from '../../../data/levels';
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

  public setListeners(callback: (hash: string) => void) {
    this.getHtmlElement().addEventListener('mouseover', (e) => {
      const { target }: { target: EventTarget | null } = e;
      if (!target || !(target instanceof Element)) return;
      const hoverDivHash: string | null = target.getAttribute('hash');
      if (hoverDivHash) {
        callback(hoverDivHash);
      } else {
        callback('');
      }
    });
    this.getHtmlElement().addEventListener('mouseleave', () => callback(''));
  }

  public setNewTable(markup: TagsHTML[]) {
    this.viewElementCreator.removeInnerElements();
    markup.forEach((tag) => this.viewElementCreator.addInnerElement(this.buildHTMLTable(tag)));
  }

  private buildHTMLTable(markup: TagsHTML): HTMLElement {
    const params: ElementParams = {
      tag: markup.tagName,
      classNames: markup.className ? [markup.className] : [],
      textContent: '',
    };
    const result: ElementCreator = new ElementCreator(params);
    if (markup.hash) {
      result.setAttribute('hash', markup.hash);
      this.elements.set(markup.hash, result.getElement());
    }
    if (markup.children && markup.children.length) {
      markup.children.forEach((child: TagsHTML) => {
        const el: HTMLElement = this.buildHTMLTable(child);
        if (child.hash) this.elements?.set(child.hash, el);
        result.addInnerElement(el);
      });
    }
    return result.getElement();
  }
}
