import ElementCreator from './element-creator';

describe('Element Creator tests', () => {
  test('Should return the HTML div element ', () => {
    const elementCreator = new ElementCreator({
      tag: 'div',
      classNames: [],
      textContent: '',
    });
    expect(elementCreator.getElement()).toBeInstanceOf(HTMLDivElement);
  });

  test('Should correct set and remove className', () => {
    const elementCreator = new ElementCreator({
      tag: 'div',
      classNames: ['div-test'],
      textContent: '',
    });
    expect(elementCreator.getElement().className).toBe('div-test');
    elementCreator.removeCssClass(['div-test']);
    expect(elementCreator.getElement().className).toBe('');
  });

  test('Should set correct ID', () => {
    const elementCreator = new ElementCreator({
      tag: 'div',
      classNames: ['div-test'],
      textContent: '',
    });
    elementCreator.setAttribute('id', 'Test-ID');
    expect(elementCreator.getElement().id).toBe('Test-ID');
  });

  test('Should correct add and remove inner elements', () => {
    const elementCreator = new ElementCreator({
      tag: 'div',
      classNames: [],
      textContent: '',
    });
    expect(elementCreator.getElement().children.length).toBe(0);
    elementCreator.addInnerElement(document.createElement('p'));
    elementCreator.addInnerElement(document.createElement('p'));
    elementCreator.addInnerElement(document.createElement('p'));
    expect(elementCreator.getElement().children.length).toBe(3);
    elementCreator.removeInnerElements();
    expect(elementCreator.getElement().children.length).toBe(0);
  });
});
