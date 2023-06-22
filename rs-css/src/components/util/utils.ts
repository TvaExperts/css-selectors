/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/qtcreator-dark.css';
// import 'highlight.js/styles/vs.css';

hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));

function getRandomStr(length: number): string {
  const chrs: string = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result: string = '';
  for (let i = 0; i < length; i += 1) {
    const pos = Math.floor(Math.random() * chrs.length);
    result += chrs[pos];
  }
  return result;
}

function getHighlightedTags(str: string): string {
  return hljs.highlight(str, { language: 'xml' }).value;
}

function getHighlightedCss(str: string): string {
  return hljs.highlight(str, { language: 'css' }).value;
}

export { getRandomStr, getHighlightedTags, getHighlightedCss };
