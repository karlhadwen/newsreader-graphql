import { RESTDataSource } from 'apollo-datasource-rest';

export class NewYorkTimesAPI extends RESTDataSource {
  articleReducer({ id, byline, url, published_date, title } = {}) {
    return {
      id: `nyt-${id}`,
      title,
      author: byline,
      url,
      time: published_date,
      source: 'New York Times',
    };
  }

  async getAllArticles() {
    const result = await this.get(
      'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=Jg1WQqSCu08PZKrQyqPGNN7F7FCYVnxp'
    );
    return result?.results?.map(article => this.articleReducer(article));
  }
}
