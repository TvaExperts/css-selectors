import ElementParams from './types';

export default class ElementCreator {
  private element: HTMLElement;

  constructor(params: ElementParams) {
    this.element = document.createElement(params.tag);
    this.setCssClasses(params.classNames);
    this.setTextContent(params.textContent);
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public addInnerElement(element: ElementCreator | HTMLElement) {
    if (element instanceof ElementCreator) {
      this.element.append(element?.getElement());
    } else {
      this.element.append(element);
    }
  }

  public setAttribute(atribute: string, value: string): void {
    this.element.setAttribute(atribute, value);
  }

  private setCssClasses(cssClasses: string[] = []): void {
    this.element.classList.add(...cssClasses);
  }

  setTextContent(text: string = ''): void {
    this.element.textContent = text;
  }
}
