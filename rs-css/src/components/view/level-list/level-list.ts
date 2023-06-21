import './level-list.scss';
import ElementCreator from '../../util/element-creator';
import { ViewParams } from '../types';
import View from '../view';
import Level from '../../controller/types';
import CssClasses from './types';

export default class LevelListView extends View {
  levelItems: ElementCreator[];

  constructor() {
    const params: ViewParams = {
      tag: 'ul',
      classNames: [CssClasses.LEVEL_LIST],
    };
    super(params);
    this.levelItems = [];
  }

  public createLevelsList(levels: Level[]) {
    levels.forEach((level: Level): void => {
      const levelItemElementCreator: ElementCreator = new ElementCreator({
        tag: 'li',
        classNames: [CssClasses.LIST_ITEM],
        textContent: level.title,
      });
      levelItemElementCreator.setAttribute('levelId', level.id.toString());
      this.levelItems.push(levelItemElementCreator);
      this.viewElementCreator.addInnerElement(levelItemElementCreator.getElement());
    });
  }

  setClickCallback(callback: (levelId: string) => void) {
    this.getHtmlElement().addEventListener('click', (e) => {
      const { target }: { target: EventTarget | null } = e;
      if (!target || !(target instanceof Element)) return;
      const clickedLevelId: string | null = target.getAttribute('levelId');
      if (clickedLevelId) {
        callback(clickedLevelId);
      }
    });
  }

  public selectLevel(levelId: string): void {
    this.levelItems.forEach((levelItem: ElementCreator) => {
      levelItem.removeCssClass([CssClasses.LIST_SELECTED]);
      const levelItemId: string | null = levelItem.getElement().getAttribute('levelId');
      if (levelItemId && levelItemId === levelId) {
        levelItem.addCssClasses([CssClasses.LIST_SELECTED]);
      }
    });
  }
}
