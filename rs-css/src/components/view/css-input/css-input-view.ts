import './css-input.scss';

import { ViewParams } from '../types';
import View from '../view';
import { CssClasses, TextHTML } from './types';
import ElementCreator from '../../util/element-creator';

export default class CssInputView extends View {
  buttonEnter: ElementCreator;

  constructor() {
    const params: ViewParams = {
      tag: 'input',
      classNames: [CssClasses.CSS_INPUT],
    };
    super(params);
    this.buttonEnter = new ElementCreator({
      tag: 'div',
      classNames: [CssClasses.BUTTON_ENTER],
      textContent: TextHTML.BUTTON_ENTER,
    });
    this.viewElementCreator.addInnerElement(this.buttonEnter);
  }
}
