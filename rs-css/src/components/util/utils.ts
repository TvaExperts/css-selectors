import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/qtcreator-dark.css';

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
