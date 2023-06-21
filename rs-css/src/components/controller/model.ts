/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/qtcreator-dark.css';

import { LevelConfigs, LevelData, TagsHTML } from '../../data/levels';
import ElementParams from '../util/types';
import ElementCreator from '../util/element-creator';
import Level from './types';

export default class Model {
  public levels: Level[];

  constructor() {
    this.levels = [];
    hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
    this.initLevelsData();
  }

  initLevelsData() {
    LevelData.forEach((levelConfigs: LevelConfigs) => {
      const level: Level = levelConfigs;
      const params: ElementParams = {
        tag: 'div',
        classNames: [],
        textContent: '',
      };
      const table: ElementCreator = new ElementCreator(params);
      table.getElement().innerHTML = this.getHighlightedTags('<div class="table">');
      level.markup.forEach((tag: TagsHTML) => {
        table.addInnerElement(this.createHTMLTags(tag));
      });

      table.getElement().insertAdjacentHTML('beforeend', this.getHighlightedTags('</div>'));
      level.HTML = table.getElement();
      this.levels.push(level);
    });
  }

  createHTMLTags(markup: TagsHTML): HTMLElement {
    const params: ElementParams = {
      tag: 'div',
      classNames: [],
      textContent: '',
    };
    const result: ElementCreator = new ElementCreator(params);

    if (markup.children && markup.children.length) {
      result.getElement().innerHTML = this.getHighlightedTags(`<${this.getTagForHighlight(markup)}>`);

      markup.children.forEach((child: TagsHTML) => result.addInnerElement(this.createHTMLTags(child)));

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
