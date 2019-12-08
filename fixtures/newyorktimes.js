export const emptyReducerReturnValue = {
  id: 'nyt-undefined',
  title: undefined,
  author: undefined,
  url: undefined,
  time: undefined,
  source: 'New York Times',
};

export const getArticlePreReducerStub = {
  id: '100000006666678',
  title: 'Welcome to Estonia’s Isle of Women',
  url: 'https://www.nytimes.com/2019/10/02/travel/kihnu.html',
  adx_keywords:
    'Trump-Ukraine Whistle-Blower Complaint and Impeachment Inquiry;',
  column: null,
  section: 'U.S.',
  byline: 'By NICHOLAS FANDOS',
  published_date: '2019-10-02',
};

export const getArticlePostReducerStub = {
  id: 'nyt-100000006666678',
  title: 'Welcome to Estonia’s Isle of Women',
  author: 'By NICHOLAS FANDOS',
  url: 'https://www.nytimes.com/2019/10/02/travel/kihnu.html',
  time: '2019-10-02',
  source: 'New York Times',
};
