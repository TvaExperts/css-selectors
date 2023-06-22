import './css-selector.scss';
import { ViewParams } from '../types';
import View from '../view';
import { CssClasses, TextHTML } from './types';
import ElementCreator from '../../util/element-creator';
import { getHighlightedCss } from '../../util/utils';

export default class CssSelectorView extends View {
  buttonEnter: ElementCreator;
  input: HTMLInputElement;
  visibleInput: ElementCreator;

  constructor() {
    const params: ViewParams = {
      tag: 'div',
      classNames: [CssClasses.CSS_SELECTOR],
    };
    super(params);

    this.buttonEnter = new ElementCreator({
      tag: 'div',
      classNames: [CssClasses.BUTTON_ENTER],
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

  private createInput(classes: string[]): HTMLInputElement {
    const input = document.createElement('input');
    input.classList.add(...classes);
    input.addEventListener('input', () => this.changeInputText());
    input.addEventListener('blur', () => this.returnPlaceHolderInInput());
    input.addEventListener('focus', () => this.removePlaceHolderWhenFocus());
    return input;
  }

  private returnPlaceHolderInInput(): void {
    if (!this.input.value) this.visibleInput.setTextContent(TextHTML.PLACEHOLDER);
  }

  private removePlaceHolderWhenFocus(): void {
    if (!this.input.value) this.visibleInput.setTextContent('');
  }

  private changeInputText(): void {
    this.visibleInput.getElement().innerHTML = getHighlightedCss(this.input.value);
  }
}
