import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';
import { HackerNewsAPI } from '../datasources/hackernews';
import { resolvers } from '../resolvers';
import { typeDefs } from '../typedefs';
import { getArticlePreReducerStub } from '../fixtures/hackernews';

const GET_ARTICLE_BY_ID_AND_SOURCE = gql`
  query getArticleByIdAndSource($id: ID!, $source: String!) {
    articleBySource(id: $id, source: $source) {
      id
      title
      author
      url
      time
      source
    }
  }
`;

const GET_ARTICLES_BY_SOURCE = gql`
  query getArticlesBySource($ids: [Int!]!, $source: String!) {
    articlesBySource(ids: $ids, source: $source) {
      id
      title
      author
      url
      time
      source
    }
  }
`;

const GET_ALL_ARTICLES = gql`
  query getAllArticles {
    allArticles {
      id
      title
      author
      url
      time
      source
    }
  }
`;

const constructTestServer = () => {
  const hackernewsAPI = new HackerNewsAPI();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      hackernews: hackernewsAPI,
    }),
  });

  return { server, hackernewsAPI };
};

describe('[Queries.HackerNewsAPI]', () => {
  it('fetches an article from the HackerNews API', async () => {
    const { server, hackernewsAPI } = constructTestServer();

    hackernewsAPI.get = jest.fn(() => getArticlePreReducerStub);

    const { query } = createTestClient(server);

    const res = await query({
      query: GET_ARTICLE_BY_ID_AND_SOURCE,
      variables: { id: 21168364, source: 'hackernews' },
    });

    expect(res).toMatchSnapshot();
  });

  it('fetches an array of articles from the HackerNews API', async () => {
    const { server, hackernewsAPI } = constructTestServer();

    hackernewsAPI.get = jest.fn(() => getArticlePreReducerStub);

    const { query } = createTestClient(server);

    const res = await query({
      query: GET_ARTICLES_BY_SOURCE,
      variables: { ids: [21168364], source: 'hackernews' },
    });

    expect(res).toMatchSnapshot();
  });

  it('fetches an array of all the articles from the HackerNews API', async () => {
    const { server, hackernewsAPI } = constructTestServer();

    hackernewsAPI.get = jest.fn(() => [getArticlePreReducerStub]);

    const { query } = createTestClient(server);

    const res = await query({
      query: GET_ALL_ARTICLES,
    });

    expect(res).toMatchSnapshot();
  });
});
