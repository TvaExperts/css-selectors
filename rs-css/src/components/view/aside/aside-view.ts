import './aside.scss';
import ElementCreator from '../../util/element-creator';
import ViewParams from '../types';
import View from '../view';
import Level from '../../controller/types';

const CssClasses = {
  ASIDE: 'aside',
  ASIDE_TITLE: 'aside__title',
  LEVEL_LIST: 'aside__level-list',
  ITEM: 'aside__level-item',
  SELECTED: 'selected',
};

const LEVELS_TEXT = 'Levels';

export default class HeaderView extends View {
  levelItems: ElementCreator[];
  constructor() {
    const params: ViewParams = {
      tag: 'aside',
      classNames: [CssClasses.ASIDE],
    };
    super(params);
    this.levelItems = [];
    this.configureView();
  }

  private configureView(): void {
    const titleElementCreator: ElementCreator = new ElementCreator({
      tag: 'p',
      classNames: [CssClasses.ASIDE_TITLE],
      textContent: LEVELS_TEXT,
    });
    this.viewElementCreator.addInnerElement(titleElementCreator.getElement());
  }

  public createLevelsList(levels: Level[], callback: (levelId: string) => void) {
    const levelListElementCreator: ElementCreator = new ElementCreator({
      tag: 'ul',
      classNames: [CssClasses.LEVEL_LIST],
      textContent: '',
    });

    levels.forEach((level: Level): void => {
      const levelItemElementCreator: ElementCreator = new ElementCreator({
        tag: 'li',
        classNames: [CssClasses.ITEM],
        textContent: level.title,
      });
      levelItemElementCreator.setAttribute('levelId', level.id.toString());
      levelItemElementCreator.getElement().addEventListener('click', (e) => {
        const { target }: { target: EventTarget | null } = e;
        if (!target || !(target instanceof Element)) return;
        const clickedLevelId: string | null = target.getAttribute('levelId');
        if (clickedLevelId) {
          callback(clickedLevelId);
        }
      });
      this.levelItems.push(levelItemElementCreator);
      levelListElementCreator.addInnerElement(levelItemElementCreator.getElement());
      this.viewElementCreator.addInnerElement(levelListElementCreator.getElement());
    });
  }

  public selectLevel(levelId: string): void {
    this.levelItems.forEach((levelItem: ElementCreator) => {
      levelItem.removeCssClass([CssClasses.SELECTED]);
      const levelItemId: string | null = levelItem.getElement().getAttribute('levelId');
      if (levelItemId && levelItemId === levelId) {
        levelItem.addCssClasses([CssClasses.SELECTED]);
      }
    });
  }
}
