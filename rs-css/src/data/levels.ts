interface LevelConfigs {
  help: string;
  title: string;
  markup: GameHTMLTag[];
}

type GameHTMLTag = {
  tagName: string;
  className?: string;
  idName?: string;
  children?: GameHTMLTag[];
  signElement?: string;
  winCondition?: boolean;
};

const LevelData: LevelConfigs[] = [
  {
    help: '',
    title: 'level 1',
    markup: [
      {
        tagName: 'plate',
        className: 'small',
      },
      {
        tagName: 'plate',
        idName: 'Ya!',
        winCondition: true,
      },
      {
        tagName: 'plate',
      },
    ],
  },
  {
    help: '',
    title: 'level 2',
    markup: [
      {
        tagName: 'plate',
        children: [
          {
            tagName: 'apple',
            className: 'big',
            winCondition: true,
          },
        ],
      },
      {
        tagName: 'plate',
      },
      {
        tagName: 'plate',
        idName: 'dddd!',
      },
    ],
  },
  {
    help: '',
    title: 'level 3',
    markup: [
      {
        tagName: 'plate',
        className: 'small',
      },
      {
        tagName: 'plate',
        idName: 'Ya!',
        winCondition: true,
      },
      {
        tagName: 'plate',
      },
    ],
  },
  {
    help: '',
    title: 'level 4',
    markup: [
      {
        tagName: 'plate',
        className: 'small',
      },
      {
        tagName: 'plate',
        idName: 'Ya!',
        winCondition: true,
      },
      {
        tagName: 'plate',
      },
    ],
  },
  {
    help: '',
    title: 'level 5',
    markup: [
      {
        tagName: 'plate',
        className: 'small',
      },
      {
        tagName: 'plate',
        idName: 'Ya!',
        winCondition: true,
      },
      {
        tagName: 'plate',
      },
    ],
  },
  {
    help: '',
    title: 'level 6',
    markup: [
      {
        tagName: 'plate',
        className: 'small',
      },
      {
        tagName: 'plate',
        idName: 'Ya!',
        winCondition: true,
      },
      {
        tagName: 'plate',
      },
    ],
  },
];

export { LevelConfigs, LevelData, GameHTMLTag };
