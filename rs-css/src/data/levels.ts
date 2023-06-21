interface LevelConfigs {
  id: string;
  help: string;
  title: string;
  markup: TagsHTML[];
}

type TagsHTML = {
  tagName: string;
  className?: string;
  idName?: string;
  children?: TagsHTML[];
  hash?: string;
};

const LevelData: LevelConfigs[] = [
  {
    id: '1',
    help: '',
    title: 'level 1',
    markup: [
      {
        tagName: 'apple',
        className: 'small',
      },
      {
        tagName: 'apple',
        idName: 'Ya!',
      },
      {
        tagName: 'apple',
      },
    ],
  },
  {
    id: '2',
    help: '',
    title: 'level 2',
    markup: [
      {
        tagName: 'apple',
        children: [
          {
            tagName: 'apple',
            className: 'big',
          },
        ],
      },
      {
        tagName: 'apple',
      },
      {
        tagName: 'apple',
        idName: 'dddd!',
      },
    ],
  },
];

export { LevelConfigs, LevelData, TagsHTML };
