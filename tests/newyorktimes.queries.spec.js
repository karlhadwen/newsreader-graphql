import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';
import { NewYorkTimesAPI } from '../datasources/newyorktimes';
import { resolvers } from '../resolvers';
import { typeDefs } from '../typedefs';
import { getArticlePreReducerStub } from '../fixtures/newyorktimes';

const GET_ALL_ARTICLES_BY_SOURCE = gql`
  query getAllArticlesBySource($source: String!) {
    allArticlesBySource(source: $source) {
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
  const newyorktimesAPI = new NewYorkTimesAPI();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      newyorktimes: newyorktimesAPI,
    }),
  });

  return { server, newyorktimesAPI };
};

describe('[Queries.NewYorkTimesAPI]', () => {
  it('fetches an array of articles from the New York Times API', async () => {
    const { server, newyorktimesAPI } = constructTestServer();

    newyorktimesAPI.get = jest.fn(() => ({
      results: [getArticlePreReducerStub],
    }));

    const { query } = createTestClient(server);

    const res = await query({
      query: GET_ALL_ARTICLES_BY_SOURCE,
      variables: { source: 'newyorktimes' },
    });

    expect(res).toMatchSnapshot();
  });
});
