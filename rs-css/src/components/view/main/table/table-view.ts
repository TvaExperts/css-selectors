import './table.scss';
// import ElementCreator from '../../../util/element-creator';
import ViewParams from '../../types';
import View from '../../view';

const CssClasses = {
  TABLE: 'game__table',
};

export default class TableView extends View {
  constructor() {
    const params: ViewParams = {
      tag: 'div',
      classNames: [CssClasses.TABLE],
    };
    super(params);
    this.configureView();
  }

  configureView() {}
}
