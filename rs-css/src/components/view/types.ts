type ViewParams = {
  tag: string;
  classNames: string[];
};

enum CssClasses {
  HEADER = 'header',
  MAIN = 'main',
  MAIN_HELP = 'main__help',
  MAIN_TITLE = 'main__title',
  MAIN_EDITOR = 'main__editor',
  ANIMATION_SHAKE = 'animation-shake',
  ASIDE = 'aside',
  ASIDE_TITLE = 'aside__title',
  FOOTER = 'footer',
  FOOTER_GITHUB = 'footer__github',
  FOOTER_YEAR = 'footer__year',
  FOOTER_SCHOOL = 'footer__school',
}

enum TextHTML {
  MAIN_HELP = 'Help?',
  ASIDE_TITLE = 'Levels',
  FOOTER_YEAR = '2023',
  FOOTER_GIT = 'Git',
}

enum LinkHTML {
  FOOTER_GIT = 'https://github.com/TvaExperts/',
  FOOTER_SCHOOL = 'https://rs.school/js/',
}

export { ViewParams, CssClasses, TextHTML, LinkHTML };
