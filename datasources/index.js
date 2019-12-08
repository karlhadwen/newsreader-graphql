import { HackerNewsAPI } from './hackernews';
import { NewYorkTimesAPI } from './newyorktimes';

export default {
  hackernews: new HackerNewsAPI(),
  newyorktimes: new NewYorkTimesAPI(),
};
