interface LevelConfigs {
  id: string;
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
    id: '1',
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
    id: '2',
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
