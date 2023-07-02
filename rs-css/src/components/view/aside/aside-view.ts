import ElementCreator from '../../util/element-creator';
import View from '../view';
import { ViewParams } from '../types';
import { Level, ResolveStatus } from '../../controller/types';
import { CssClasses, ATTRIBUTE_LEVEL_ID, TextHTML } from './types';

export default class AsideView extends View {
  private levelList: ElementCreator;
  private levelItems: ElementCreator[];
  private resetProgressButton: ElementCreator;

  constructor() {
    const params: ViewParams = {
      tag: 'aside',
      classNames: [CssClasses.ASIDE],
    };

    super(params);

    this.levelList = new ElementCreator({
      tag: 'ul',
      classNames: [CssClasses.LEVEL_LIST],
      textContent: '',
    });
    this.resetProgressButton = new ElementCreator({
      tag: 'div',
      classNames: [CssClasses.RESET_PROGRESS],
      textContent: TextHTML.RESET_PROGRESS,
    });

    this.configureView();
    this.levelItems = [];
  }

  public setClickListItemCallback(callback: (levelId: number) => void) {
    this.getHtmlElement().addEventListener('click', (e) => {
      let { target }: { target: EventTarget | null } = e;
      while (target !== this.levelList.getElement()) {
        if (!target || !(target instanceof Element)) return;

        if (target.classList.contains(CssClasses.LIST_ITEM)) {
          const stringClickedLevelId: string | null = target.getAttribute(ATTRIBUTE_LEVEL_ID);
          if (!stringClickedLevelId) return;
          const levelId: number = parseInt(stringClickedLevelId, 10);
          callback(levelId);
          return;
        }
        target = target.parentNode;
      }
    });
  }

  public setResetProgressCallback(callback: () => void) {
    this.resetProgressButton.getElement().addEventListener('click', callback);
  }

  public createLevelsList(levels: Level[]): void {
    levels.forEach((level: Level): void => {
      const levelItemElementCreator: ElementCreator = new ElementCreator({
        tag: 'li',
        classNames: [CssClasses.LIST_ITEM],
        textContent: '',
      });
      levelItemElementCreator.setAttribute(ATTRIBUTE_LEVEL_ID, level.id.toString());
      levelItemElementCreator.addInnerElement(this.createCheckmarkBlock(level.resolveStatus));
      const levelCaptionElementCreator: ElementCreator = new ElementCreator({
        tag: 'p',
        classNames: [CssClasses.ITEM_CAPTION],
        textContent: `${level.id}:  ${level.title}`,
      });
      levelItemElementCreator.addInnerElement(levelCaptionElementCreator);
      this.levelItems.push(levelItemElementCreator);
      this.levelList.addInnerElement(levelItemElementCreator.getElement());
    });
  }

  public selectLevel(levelId: number): void {
    this.levelItems.forEach((levelItem: ElementCreator) => {
      levelItem.removeCssClass([CssClasses.ITEM_SELECTED]);
      const levelItemId: string | null = levelItem.getElement().getAttribute(ATTRIBUTE_LEVEL_ID);
      if (levelItemId && levelItemId === levelId.toString()) {
        levelItem.addCssClasses([CssClasses.ITEM_SELECTED]);
      }
    });
  }

  public updateCheckmarkStatus(level: Level): void {
    const levelItem: ElementCreator | undefined = this.levelItems.find(
      (item) => item.getElement().getAttribute(ATTRIBUTE_LEVEL_ID) === level.id.toString(10)
    );

    if (levelItem) {
      const itemChildren: HTMLCollection = levelItem.getElement().children;

      for (let i = 0; i < itemChildren.length; i += 1) {
        const child = itemChildren.item(i);
        if (!child) return;

        if (child.classList.contains(CssClasses.ITEM_CHECKMARK)) {
          switch (level.resolveStatus) {
            case ResolveStatus.DONE:
              child.classList.remove(CssClasses.CHECKMARK_DONE_WHITH_HINT);
              child.classList.add(CssClasses.CHECKMARK_DONE);
              break;
            case ResolveStatus.DONE_WITH_HINT:
              child.classList.add(CssClasses.CHECKMARK_DONE_WHITH_HINT);
              break;
            default:
          }
        }
      }
    }
  }

  public resetProgress(): void {
    this.levelItems.forEach((levelItem) => {
      const itemChildren: HTMLCollection = levelItem.getElement().children;
      for (let i = 0; i < itemChildren.length; i += 1) {
        const child = itemChildren.item(i);
        if (!child) return;
        if (child.classList.contains(CssClasses.ITEM_CHECKMARK)) {
          child.classList.remove(CssClasses.CHECKMARK_DONE_WHITH_HINT);
          child.classList.remove(CssClasses.CHECKMARK_DONE);
        }
      }
    });
  }

  private configureView(): void {
    const arrowButtonElementCreator: ElementCreator = new ElementCreator({
      tag: 'div',
      classNames: [CssClasses.ASIDE_ARROW],
      textContent: '',
    });
    arrowButtonElementCreator.getElement().addEventListener('click', this.toggleOpenAside.bind(this));
    const titleElementCreator: ElementCreator = new ElementCreator({
      tag: 'p',
      classNames: [CssClasses.ASIDE_TITLE],
      textContent: TextHTML.LIST_TITLE,
    });
    this.viewElementCreator.addInnerElement(arrowButtonElementCreator);
    this.viewElementCreator.addInnerElement(titleElementCreator);
    this.viewElementCreator.addInnerElement(this.levelList);
    this.viewElementCreator.addInnerElement(this.resetProgressButton);
  }

  private toggleOpenAside(): void {
    this.viewElementCreator.getElement().classList.toggle(CssClasses.ASIDE_OPEN);
  }

  private createCheckmarkBlock(resolveStatus: ResolveStatus): ElementCreator {
    const checkmarkElementCreator: ElementCreator = new ElementCreator({
      tag: 'div',
      classNames: [CssClasses.ITEM_CHECKMARK],
      textContent: '',
    });
    switch (resolveStatus) {
      case ResolveStatus.DONE:
        checkmarkElementCreator.addCssClasses([CssClasses.CHECKMARK_DONE]);
        break;
      case ResolveStatus.DONE_WITH_HINT:
        checkmarkElementCreator.addCssClasses([CssClasses.CHECKMARK_DONE_WHITH_HINT]);
        break;
      default:
    }
    return checkmarkElementCreator;
  }
}
