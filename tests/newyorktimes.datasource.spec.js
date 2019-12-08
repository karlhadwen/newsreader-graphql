import { NewYorkTimesAPI } from '../datasources/newyorktimes';
import {
  emptyReducerReturnValue,
  getArticlePostReducerStub,
  getArticlePreReducerStub,
} from '../fixtures/newyorktimes';

const ds = new NewYorkTimesAPI();
ds.get = jest.fn();

describe('[NewYorkTimes.articleReducer]', () => {
  it('properly transforms using article reducer', () => {
    expect(ds.articleReducer(getArticlePreReducerStub)).toEqual(
      getArticlePostReducerStub
    );
  });

  it('does not transform using article reducer', () => {
    expect(ds.articleReducer()).toEqual(emptyReducerReturnValue);
  });
});
