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
    hint: '1Системная ошибка: net::ERR_BLOCKED_BY_CLIENT',
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
    hint: '2Waiting for update signal from WDS...',
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
    hint: '3DevTools failed to load source map: Could not load ',
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
    hint: '4ot Module Replacement enabled,',
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
    hint: '5ot Module Replacement enabled,',
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
    hint: '6ot Module Replacement enabled,',
    title: 'level 6',
    markup: [
      {
        tagName: 'plate',
        className: 'small',
      },
      {
        tagName: 'plate',
        idName: 'Ya',
        winCondition: true,
      },
      {
        tagName: 'plate',
      },
    ],
  },
];

export { LevelConfigs, LevelData, GameHTMLTag };
