import { RESTDataSource } from 'apollo-datasource-rest';

export class HackerNewsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://hacker-news.firebaseio.com/v0/';
  }

  articleReducer({ id, by, url, time, title } = {}) {
    return {
      id: `hn-${id}`,
      title,
      author: by,
      url,
      time,
      source: 'HackerNews',
    };
  }

  async getAllArticleIds() {
    const result = await this.get('topstories.json');
    return result;
  }

  async getArticle(articleId) {
    const result = await this.get(`item/${articleId}.json`);
    return this.articleReducer(result);
  }

  getArticlesByIds(articleIds) {
    return Promise.all(articleIds.map(articleId => this.getArticle(articleId)));
  }

  async getAllArticles() {
    let articleIds = await this.getAllArticleIds();
    articleIds = articleIds.slice(0, 100);
    return Promise.all(articleIds.map(articleId => this.getArticle(articleId)));
  }
}
