import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/qtcreator-dark.css';

function getHighlightedTags(str: string): string {
  return hljs.highlight(str, { language: 'xml' }).value;
}

function getHighlightedCss(str: string): string {
  return hljs.highlight(str, { language: 'css' }).value;
}

export { getHighlightedTags, getHighlightedCss };
