import './header.scss';
import ElementCreator from '../../util/element-creator';
import ViewParams from '../types';
import View from '../view';

const CssClasses = {
  HEADER: 'header',
  HELP: 'header__help',
};

const HELP_TEXT = 'Help?';

export default class HeaderView extends View {
  constructor() {
    const params: ViewParams = {
      tag: 'header',
      classNames: [CssClasses.HEADER],
    };
    super(params);
    this.configureView();
  }

  configureView() {
    const helpElementCreator: ElementCreator = new ElementCreator({
      tag: 'a',
      classNames: [CssClasses.HELP],
      textContent: HELP_TEXT,
    });
    helpElementCreator.setAttribute('href', '#!');
    this.viewElementCreator.addInnerElement(helpElementCreator.getElement());
  }
}
