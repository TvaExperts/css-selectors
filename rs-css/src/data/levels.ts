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
];

export { LevelConfigs, LevelData, GameHTMLTag };
