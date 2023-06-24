import './level-list.scss';
import ElementCreator from '../../util/element-creator';
import { ViewParams } from '../types';
import View from '../view';
import { Level } from '../../controller/types';
import { CssClasses, ATTRIBUTE_LEVEL_ID } from './types';

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
      levelItemElementCreator.setAttribute(ATTRIBUTE_LEVEL_ID, level.id.toString());
      this.levelItems.push(levelItemElementCreator);
      this.viewElementCreator.addInnerElement(levelItemElementCreator.getElement());
    });
  }

  public setClickCallback(callback: (levelId: number) => void) {
    this.getHtmlElement().addEventListener('click', (e) => {
      const { target }: { target: EventTarget | null } = e;
      if (!target || !(target instanceof Element)) return;
      const stringClickedLevelId: string | null = target.getAttribute(ATTRIBUTE_LEVEL_ID);
      if (!stringClickedLevelId) return;
      const levelId: number = parseInt(stringClickedLevelId, 10);
      callback(levelId);
    });
  }

  public selectLevel(levelId: number): void {
    this.levelItems.forEach((levelItem: ElementCreator) => {
      levelItem.removeCssClass([CssClasses.LIST_SELECTED]);
      const levelItemId: string | null = levelItem.getElement().getAttribute(ATTRIBUTE_LEVEL_ID);
      if (levelItemId && levelItemId === levelId.toString()) {
        levelItem.addCssClasses([CssClasses.LIST_SELECTED]);
      }
    });
  }
}
