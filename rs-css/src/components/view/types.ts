type ViewParams = {
  tag: string;
  classNames: string[];
};

enum CssClasses {
  HEADER = 'header',
  HEADER_LOGO = 'header__logo',
  HEADER_HELP = 'header__help',
  MAIN = 'main',
  MAIN_LEVEL_DESCRIPTION = 'main__level-description',
  MAIN_EDITOR = 'main__editor',
  ANIMATION_SHAKE = 'animation-shake',
  FOOTER = 'footer',
  FOOTER_GITHUB = 'footer__github',
  FOOTER_YEAR = 'footer__year',
  FOOTER_SCHOOL = 'footer__school',
}

enum TextHTML {
  HEADER_LOGO = 'rs css dinner',
  HEADER_HELP = 'Help?',
  ASIDE_TITLE = 'Levels',
  FOOTER_YEAR = '2023',
  FOOTER_GIT = 'Git',
  MODAL_CONGRATS = 'Congratulations!',
  MODAL_GOOD_LUCK = 'Good luck in your studies!',
  MODAL_CLOSE = 'Close',
}

enum LinkHTML {
  FOOTER_GIT = 'https://github.com/TvaExperts/',
  FOOTER_SCHOOL = 'https://rs.school/js/',
}

export { ViewParams, CssClasses, TextHTML, LinkHTML };
