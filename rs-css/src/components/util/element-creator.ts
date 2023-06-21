import ElementParams from './types';

export default class ElementCreator {
  private element: HTMLElement;

  constructor(params: ElementParams) {
    this.element = document.createElement(params.tag);
    this.addCssClasses(params.classNames);
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

  public addCssClasses(cssClasses: string[] = []): void {
    if (cssClasses.length) this.element.classList.add(...cssClasses);
  }

  public removeCssClass(className: string[]): void {
    this.element.classList.remove(...className);
  }

  public removeInnerElements(): void {
    this.element.innerHTML = '';
  }

  public setTextContent(text: string = ''): void {
    this.element.textContent = text;
  }
}
