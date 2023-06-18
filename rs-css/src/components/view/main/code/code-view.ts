import './code.scss';
// import ElementCreator from '../../../util/element-creator';
import ViewParams from '../../types';
import View from '../../view';

const CssClasses = {
  CODE: 'game__code',
};

export default class CodeView extends View {
  constructor() {
    const params: ViewParams = {
      tag: 'div',
      classNames: [CssClasses.CODE],
    };
    super(params);
    this.configureView();
  }

  configureView() {}
}
