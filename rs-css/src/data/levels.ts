interface LevelConfigs {
  hint: string;
  title: string;
  description: string;
  markup: GameHTMLTag[];
}

type GameHTMLTag = {
  tagName: string;
  className?: string;
  children?: GameHTMLTag[];
  signElement?: string;
  winCondition?: boolean;
};

const LevelData: LevelConfigs[] = [
  {
    hint: 'apple',
    title: 'My favorite apple',
    description: 'Pick my favorite $apple$',
    markup: [
      {
        tagName: 'plate',
      },
      {
        tagName: 'plate',
        children: [
          {
            tagName: 'apple',
            winCondition: true,
          },
        ],
      },
      {
        tagName: 'plate',
      },
    ],
  },

  {
    hint: '*',
    title: 'greed is good!',
    description: "I'm hungry - pick $all$ the fruit",
    markup: [
      {
        tagName: 'apple',
        winCondition: true,
      },
      {
        tagName: 'orange',
        winCondition: true,
      },
      {
        tagName: 'apple',
        winCondition: true,
      },
    ],
  },
  {
    hint: ':nth-child(3)',
    title: 'I choose the right',
    description: 'select the $right plate$!',
    markup: [
      {
        tagName: 'plate',
      },
      {
        tagName: 'plate',
        winCondition: true,
      },
    ],
  },
  {
    hint: 'plate *',
    title: "I don't like green",
    description: 'Choose $all fruits$ except the $green$ ones!',
    markup: [
      {
        tagName: 'apple',
        className: 'green',
      },
      {
        tagName: 'plate',
        children: [
          {
            tagName: 'apple',
            winCondition: true,
          },
          {
            tagName: 'orange',
            winCondition: true,
          },
        ],
      },
      {
        tagName: 'plate',
        children: [
          {
            tagName: 'apple',
            winCondition: true,
          },
          {
            tagName: 'apple',
            className: 'yellow',
            winCondition: true,
          },
        ],
      },
    ],
  },
  {
    hint: 'apple:not(.green), orange',
    title: "I don't like green 2",
    description: 'Choose $all fruits$ except the $green$ ones!',
    markup: [
      {
        tagName: 'plate',
        children: [
          {
            tagName: 'apple',
            className: 'green',
          },
        ],
      },
      {
        tagName: 'plate',
        children: [
          {
            tagName: 'apple',
            winCondition: true,
          },
          {
            tagName: 'orange',
            winCondition: true,
          },
        ],
      },
      {
        tagName: 'plate',
        children: [
          {
            tagName: 'apple',
            winCondition: true,
          },
          {
            tagName: 'apple',
            className: 'yellow',
            winCondition: true,
          },
        ],
      },
    ],
  },
  {
    hint: 'plate:nth-child(3) *',
    title: 'my plate is center',
    description: 'select $fruit$ from the $center plate$',
    markup: [
      {
        tagName: 'plate',
        children: [
          {
            tagName: 'apple',
            className: 'green',
          },
          {
            tagName: 'orange',
          },
        ],
      },
      {
        tagName: 'plate',
        children: [
          {
            tagName: 'apple',
            className: 'yellow',
            winCondition: true,
          },
          {
            tagName: 'orange',
            winCondition: true,
          },
        ],
      },
      {
        tagName: 'plate',
        children: [
          {
            tagName: 'apple',
          },
          {
            tagName: 'apple',
          },
        ],
      },
    ],
  },
  {
    hint: 'plate *:nth-child(2)',
    title: 'one each',
    description: 'I want to tasty $every type$ of apple',
    markup: [
      {
        tagName: 'plate',
        children: [
          {
            tagName: 'apple',
            className: 'yellow',
            winCondition: true,
          },
          {
            tagName: 'apple',
            className: 'yellow',
          },
          {
            tagName: 'apple',
            className: 'yellow',
          },
        ],
      },
      {
        tagName: 'plate',
        children: [
          {
            tagName: 'apple',
            className: 'green',
            winCondition: true,
          },
          {
            tagName: 'apple',
            className: 'green',
          },
          {
            tagName: 'apple',
            className: 'green',
          },
        ],
      },
      {
        tagName: 'plate',
        children: [
          {
            tagName: 'apple',
            winCondition: true,
          },
          {
            tagName: 'apple',
          },
          {
            tagName: 'apple',
          },
        ],
      },
    ],
  },
  {
    hint: 'plate ~ apple',
    title: 'clean table',
    description: 'Choose $all fruits$ except the $green$ ones!',
    markup: [
      {
        tagName: 'plate',
        children: [
          {
            tagName: 'apple',
            className: 'green',
          },
        ],
      },
      {
        tagName: 'apple',
        className: 'yellow',
        winCondition: true,
      },
      {
        tagName: 'plate',
        children: [
          {
            tagName: 'apple',
          },
          {
            tagName: 'apple',
            className: 'yellow',
          },
        ],
      },
      {
        tagName: 'apple',
        winCondition: true,
      },
    ],
  },
  {
    hint: ':not(plate)>apple',
    title: 'clean table 2',
    description: 'Choose $all fruits$ except the $green$ ones!',
    markup: [
      {
        tagName: 'plate',
        children: [
          {
            tagName: 'apple',
            className: 'green',
          },
        ],
      },
      {
        tagName: 'apple',
        className: 'yellow',
        winCondition: true,
      },
      {
        tagName: 'apple',
        winCondition: true,
      },
      {
        tagName: 'plate',
        children: [
          {
            tagName: 'apple',
          },
          {
            tagName: 'apple',
            className: 'yellow',
          },
        ],
      },
      {
        tagName: 'apple',
        winCondition: true,
      },
    ],
  },
];

export { LevelConfigs, LevelData, GameHTMLTag };
