interface LevelConfigs {
  hint: string;
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
    hint: '#test',
    title: 'level 1',
    markup: [
      {
        tagName: 'plate',
        className: 'small',
      },
      {
        tagName: 'plate',
        idName: 'test',
        winCondition: true,
      },
      {
        tagName: 'plate',
      },
    ],
  },
  {
    hint: 'apple',
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
    hint: '#test',
    title: 'level 3',
    markup: [
      {
        tagName: 'plate',
        className: 'small',
      },
      {
        tagName: 'plate',
        idName: 'test',
        winCondition: true,
      },
      {
        tagName: 'plate',
      },
    ],
  },
  {
    hint: '#test',
    title: 'level 4',
    markup: [
      {
        tagName: 'plate',
        className: 'small',
      },
      {
        tagName: 'plate',
        idName: 'test',
        winCondition: true,
      },
      {
        tagName: 'plate',
      },
    ],
  },
  {
    hint: '#test',
    title: 'level 5',
    markup: [
      {
        tagName: 'plate',
        className: 'small',
      },
      {
        tagName: 'plate',
        idName: 'test',
        winCondition: true,
      },
      {
        tagName: 'plate',
      },
    ],
  },
  {
    hint: '#test',
    title: 'level 6',
    markup: [
      {
        tagName: 'plate',
        className: 'small',
      },
      {
        tagName: 'plate',
        idName: 'test',
        winCondition: true,
      },
      {
        tagName: 'plate',
      },
    ],
  },
];

export { LevelConfigs, LevelData, GameHTMLTag };
