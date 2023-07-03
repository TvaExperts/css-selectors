import { ViewParams } from '../types';
import View from '../view';
import ElementCreator from '../../util/element-creator';
import { getHighlightedCss } from '../../util/highlight-js';
import GlobalCssClasses from '../../../sass/types';
import { CssClasses, TextHTML, Constants } from './types';

export default class CssSelectorView extends View {
  private buttonEnter: ElementCreator;
  private input: HTMLInputElement;
  private visibleInput: ElementCreator;

  constructor() {
    const params: ViewParams = {
      tag: 'div',
      classNames: [CssClasses.CSS_SELECTOR],
    };
    super(params);

    this.buttonEnter = new ElementCreator({
      tag: 'div',
      classNames: [CssClasses.BUTTON_ENTER, GlobalCssClasses.BUTTON],
      textContent: TextHTML.BUTTON_ENTER,
    });

    this.visibleInput = new ElementCreator({
      tag: 'div',
      classNames: [CssClasses.VISIBLE_INPUT],
      textContent: TextHTML.PLACEHOLDER,
    });

    this.input = this.createInput([CssClasses.INPUT]);
    this.viewElementCreator.addInnerElement(this.buttonEnter);
    this.viewElementCreator.addInnerElement(this.visibleInput);
    this.viewElementCreator.addInnerElement(this.input);
  }

  public setCheckCssCallback(callback: (selector: string) => void): void {
    this.input.addEventListener('keydown', (e: Event) => this.checkCssSelector(callback, e));
    this.buttonEnter.getElement().addEventListener('click', () => this.checkCssSelector(callback));
  }

  public clearInput(): void {
    this.input.value = '';
    this.visibleInput.setTextContent(TextHTML.PLACEHOLDER);
    this.visibleInput.getElement().style.color = '';
  }

  public showHint(hint: string): void {
    this.input.value = '';
    this.removePlaceHolderWhenFocus();
    let index = 0;
    const event: Event = new Event('input');

    const idInterval: NodeJS.Timer = setInterval(() => {
      index += 1;
      if (index > hint.length) index = hint.length;
      this.input.value = hint.slice(0, index);
      this.input.dispatchEvent(event);
    }, Constants.HINT_ANIMATION_DURATION / hint.length);

    setTimeout(() => {
      clearInterval(idInterval);
      this.input.focus();
    }, Constants.HINT_ANIMATION_DURATION);
  }

  private returnPlaceHolderInInput(): void {
    if (!this.input.value) {
      this.visibleInput.setTextContent(TextHTML.PLACEHOLDER);
      this.visibleInput.getElement().style.color = '';
    }
  }

  private createInput(classes: string[]): HTMLInputElement {
    const input = document.createElement('input');
    input.classList.add(...classes);
    input.addEventListener('input', () => this.changeInputText());
    input.addEventListener('blur', () => this.returnPlaceHolderInInput());
    input.addEventListener('focus', () => this.removePlaceHolderWhenFocus());
    input.maxLength = 36;
    return input;
  }

  private removePlaceHolderWhenFocus(): void {
    if (!this.input.value) {
      this.visibleInput.setTextContent('');
      this.visibleInput.getElement().style.color = Constants.INPUT_BASIC_TEXT_COLOR;
    }
  }

  private changeInputText(): void {
    this.input.value = this.thimCustomSpaces(this.input.value);
    this.visibleInput.getElement().innerHTML = getHighlightedCss(this.input.value);
  }

  private thimCustomSpaces(str: string): string {
    let result: string = str.trimStart();
    if (result.endsWith('  ')) result = `${result.trimEnd()} `;
    return result;
  }

  private checkCssSelector(callback: (selector: string) => void, e?: Event): void {
    if (e && e instanceof KeyboardEvent && e.key !== 'Enter') {
      return;
    }
    const cssSelector: string = this.input.value.trim();
    callback(cssSelector);
  }
}
