import FooterView from './view/footer/footer-view';
import HeaderView from './view/header/header-view';
import MainView from './view/main/main-view';

export default class App {
  constructor() {
    document.body.append(new HeaderView().getHtmlElement());
    document.body.append(new MainView().getHtmlElement());
    document.body.append(new FooterView().getHtmlElement());
  }
}
