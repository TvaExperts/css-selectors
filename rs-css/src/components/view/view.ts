import ElementParams from '../util/types';
import ElementCreator from '../util/element-creator';
import ViewParams from './types';

export default class View {
  viewElementCreator: ElementCreator;

  constructor(params: ViewParams) {
    this.viewElementCreator = this.createView(params);
  }

  public getHtmlElement() {
    return this.viewElementCreator.getElement();
  }

  private createView(params: ViewParams): ElementCreator {
    const elementParams: ElementParams = {
      tag: params.tag,
      classNames: params.classNames,
      textContent: '',
    };
    return new ElementCreator(elementParams);
  }
}
