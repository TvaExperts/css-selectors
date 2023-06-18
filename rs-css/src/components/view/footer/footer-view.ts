import './footer.scss';
import ElementCreator from '../../util/element-creator';
import ViewParams from '../types';
import View from '../view';

const CssClasses = {
  FOOTER: 'footer',
  GITHUB: 'footer__github',
  YEAR: 'footer__year',
  SCHOOL: 'footer__school',
};

const YEAR_TEXT = '2023';
const GIT_TEXT = 'Git';
const GIT_LINK = 'https://github.com/TvaExperts/';
const SCHOOL_LINK = 'https://rs.school/js/';

export default class FooterView extends View {
  constructor() {
    const params: ViewParams = {
      tag: 'footer',
      classNames: [CssClasses.FOOTER],
    };
    super(params);
    this.configureView();
  }

  configureView() {
    const gitElementCreator: ElementCreator = new ElementCreator({
      tag: 'a',
      classNames: [CssClasses.GITHUB],
      textContent: GIT_TEXT,
    });
    gitElementCreator.setAttribute('href', GIT_LINK);
    const yearElementCreator: ElementCreator = new ElementCreator({
      tag: 'p',
      classNames: [CssClasses.YEAR],
      textContent: YEAR_TEXT,
    });
    const schoolElementCreator: ElementCreator = new ElementCreator({
      tag: 'a',
      classNames: [CssClasses.SCHOOL],
      textContent: '',
    });
    schoolElementCreator.setAttribute('href', SCHOOL_LINK);
    this.viewElementCreator.addInnerElement(gitElementCreator.getElement());
    this.viewElementCreator.addInnerElement(yearElementCreator.getElement());
    this.viewElementCreator.addInnerElement(schoolElementCreator.getElement());
  }
}
