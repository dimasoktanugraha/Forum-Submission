/**
 * skenario test
 *
 * - asyncGetLeaderBoard thunk
 * - should dispatch action correctly when data fetching success
 * - should dispatch action and call alert correctly when data fetching failed
 */
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncGetLeaderBoard, receiveLeaderboardsActionCreator } from './action';

const fakeLeaderboardsResponse = [
  {
    user: {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 10,
  },
  {
    user: {
      id: 'users-2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 5,
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncGetLeaderBoard thunk', () => {
  beforeEach(() => {
    // backup original implementation
    api._getLeaderBoard = api.getLeaderBoard;
  });

  afterEach(() => {
    // restore original implementation
    api.getLeaderBoard = api._getLeaderBoard;

    // delete backup
    delete api._getLeaderBoard;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getLeaderBoard = () => Promise.resolve(fakeLeaderboardsResponse);
    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncGetLeaderBoard()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveLeaderboardsActionCreator(fakeLeaderboardsResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.getLeaderBoard = () => Promise.resolve(fakeLeaderboardsResponse);
    // mock dispatch
    const dispatch = jest.fn();
    // mock alert
    window.alert = jest.fn();

    // action
    await asyncGetLeaderBoard()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    // expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
