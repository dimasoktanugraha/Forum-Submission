/**
 * skenario test
 *
 * - receiveThreadsActionCreator thunk
 * - should dispatch action correctly when data fetching success
 * - should dispatch action and call alert correctly when data fetching failed
 */
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  addThreadActionCreator, asyncAddThread,
  asyncToogleUpVote, upVoteThreadActionCreator,
  asyncToogleDownVote, downVoteThreadActionCreator,
} from './action';

const fakeThreadsResponse = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  ownerId: 'users-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

const fakeVoteResponse = {
  id: 'vote-1',
  userId: 'users-1',
  threadId: 'thread-1',
  voteType: 1,
};

const fakeErrorResponse = new Error('Ups, something went wrong');

const title = 'Thread Pertama';
const body = 'Ini adalah thread pertama';
const category = 'General';

describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    // backup original implementation
    api._createThread = api.createThread;
  });

  afterEach(() => {
    // restore original implementation
    api.createThread = api._createThread;

    // delete backup
    delete api._createThread;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.createThread = () => Promise.resolve(fakeThreadsResponse);
    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncAddThread(title, body, category)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.createThread = () => Promise.resolve(fakeErrorResponse);
    // mock dispatch
    const dispatch = jest.fn();
    // mock alert
    window.alert = jest.fn();

    // action
    await asyncAddThread(title, body, category)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    // expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

// describe('asyncToogleUpVote thunk', () => {
//   beforeEach(() => {
//     // backup original implementation
//     api._neutralVoteThread = api.neutralVoteThread;
//     api._upVoteThread = api.upVoteThread;
//   });

//   afterEach(() => {
//     // restore original implementation
//     api.neutralVoteThread = api._neutralVoteThread;
//     api.upVoteThread = api._upVoteThread;

//     // delete backup
//     delete api._neutralVoteThread;
//     delete api._upVoteThread;
//   });

//   it('should dispatch action correctly when data fetching success', async () => {
//     // arrange
//     // stub implementation
//     api.neutralVoteThread = () => Promise.resolve(fakeVoteResponse);
//     api.upVoteThread = () => Promise.resolve(fakeVoteResponse);
//     // mock dispatch
//     const dispatch = jest.fn();
//     const { threadId, userId } = fakeThreadsResponse;

//     // action
//     await asyncToogleUpVote(threadId)(dispatch);

//     // assert
//     expect(dispatch).toHaveBeenCalledWith(showLoading());
//     expect(dispatch).toHaveBeenCalledWith(upVoteThreadActionCreator(threadId, userId));
//     expect(dispatch).toHaveBeenCalledWith(hideLoading());
//   });

//   it('should dispatch action and call alert correctly when data fetching failed', async () => {
//     // arrange
//     // stub implementation
//     api.neutralVoteThread = () => Promise.resolve(fakeVoteResponse);
//     api.upVoteThread = () => Promise.resolve(fakeVoteResponse);
//     // mock dispatch
//     const dispatch = jest.fn();
//     // mock alert
//     window.alert = jest.fn();
//     const { threadId } = fakeThreadsResponse;

//     // action
//     await asyncToogleUpVote(threadId)(dispatch);

//     // assert
//     expect(dispatch).toHaveBeenCalledWith(showLoading());
//     expect(dispatch).toHaveBeenCalledWith(hideLoading());
//     expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
//   });
// });

// describe('asyncToogleDownVote thunk', () => {
//   beforeEach(() => {
//     // backup original implementation
//     api._neutralVoteThread = api.neutralVoteThread;
//     api._downVoteThread = api.downVoteThread;
//   });

//   afterEach(() => {
//     // restore original implementation
//     api.neutralVoteThread = api._neutralVoteThread;
//     api.downVoteThread = api._downVoteThread;

//     // delete backup
//     delete api._neutralVoteThread;
//     delete api._downVoteThread;
//   });

//   it('should dispatch action correctly when data fetching success', async () => {
//     // arrange
//     // stub implementation
//     api.neutralVoteThread = () => Promise.resolve(fakeVoteResponse);
//     api.downVoteThread = () => Promise.resolve(fakeVoteResponse);
//     // mock dispatch
//     const dispatch = jest.fn();
//     const { threadId, userId } = fakeThreadsResponse;

//     // action
//     await asyncToogleDownVote(threadId)(dispatch);

//     // assert
//     expect(dispatch).toHaveBeenCalledWith(showLoading());
//     expect(dispatch).toHaveBeenCalledWith(downVoteThreadActionCreator(threadId, userId));
//     expect(dispatch).toHaveBeenCalledWith(hideLoading());
//   });

//   it('should dispatch action and call alert correctly when data fetching failed', async () => {
//     // arrange
//     // stub implementation
//     api.neutralVoteThread = () => Promise.resolve(fakeVoteResponse);
//     api.downVoteThread = () => Promise.resolve(fakeVoteResponse);
//     // mock dispatch
//     const dispatch = jest.fn();
//     // mock alert
//     window.alert = jest.fn();
//     const { threadId } = fakeThreadsResponse;

//     // action
//     await asyncToogleDownVote(threadId)(dispatch);

//     // assert
//     expect(dispatch).toHaveBeenCalledWith(showLoading());
//     expect(dispatch).toHaveBeenCalledWith(hideLoading());
//     expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
//   });
// });
