interface LevelConfigs {
  hint: string;
  title: string;
  description: string;
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
    title: 'A and B',
    description: 'ssssss $1111111111111$ ewr $1111111111111$ wer!',
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
    title: 'C and D',
    description: 'ssssss $22222$ ewr $2222$ wer!',
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
    title: 'AAAAAAAAAAA!',
    description: 'ssssss $3$ ewr $333333333$ wer!',
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
    title: 'AAAYYYY!',
    description: 'ssssss $44$ ewr $4444444444444444444$ wer!',
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
    title: 'ASASASASSSA!',
    description: 'ssssss $555555$ ewr $5555$ wer!',
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
    title: 'No-No! No-No!',
    description: 'ssssss $666$ ewr $6666$ ewr $6666$ ewr $6666$ wer!',
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
