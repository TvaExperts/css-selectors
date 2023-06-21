import FooterView from './footer/footer-view';
import HeaderView from './header/header-view';
import MainView from './main/main-view';
import AsideView from './aside/aside-view';

export default class AppView {
  public aside: AsideView;
  public header: HeaderView;
  public main: MainView;

  constructor() {
    this.header = new HeaderView();
    this.main = new MainView();
    this.aside = new AsideView();
    document.body.append(this.header.getHtmlElement());
    document.body.append(this.main.getHtmlElement());
    document.body.append(this.aside.getHtmlElement());
    document.body.append(new FooterView().getHtmlElement());
  }
}
