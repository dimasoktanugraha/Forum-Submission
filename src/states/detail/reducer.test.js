/**
 * test scenario for detailThreadReducer
 *
 * - detailThreadReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the detailThread when given by RECEIVE_DETAIL_THREAD action
 *  - should return the threadId, userId when given by UP_VOTE_DETAIL action
 *  - should return the threadId, userId when given by DOWN_VOTE_DETAIL action
 *  - should return the comment when given by ADD_COMMENT_THREAD action
 *  - should return the threadId, commentId, userId when given by UP_VOTE_COMMENT action
 *  - should return the threadId, commentId, userId when given by DOWN_VOTE_COMMENT action
 *
 */

import detailThreadReducer from './reducer';

describe('detailThreadReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the detailThread when given by RECEIVE_DETAIL_THREAD action', () => {
    // arrange
    const initialState = null;

    const action = {
      type: 'RECEIVE_DETAIL_THREAD',
      payload: {
        detailThread: {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
          comments: [],
        },
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.detailThread);
  });

  it('should return the detailThread when given by RECEIVE_DETAIL_THREAD action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    const action = {
      type: 'UP_VOTE_DETAIL',
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: initialState.upVotesBy.includes(action.payload.userId)
        ? initialState.upVotesBy.filter((id) => id !== action.payload.userId)
        : initialState.upVotesBy.concat([action.payload.userId]),
      downVotesBy: initialState.downVotesBy.includes(action.payload.userId)
        ? initialState.downVotesBy.filter((id) => id !== action.payload.userId)
        : initialState.downVotesBy,
    });
  });

  it('should return the threadId, userId when given by UP_VOTE_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    const action = {
      type: 'DOWN_VOTE_DETAIL',
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      downVotesBy: initialState.downVotesBy.includes(action.payload.userId)
        ? initialState.downVotesBy.filter((id) => id !== action.payload.userId)
        : initialState.downVotesBy.concat([action.payload.userId]),
      upVotesBy: initialState.upVotesBy.includes(action.payload.userId)
        ? initialState.upVotesBy.filter((id) => id !== action.payload.userId)
        : initialState.upVotesBy,
    });
  });

  it('should return the comment when given by ADD_COMMENT_THREAD action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    const action = {
      type: 'ADD_COMMENT_THREAD',
      payload: {
        comment: {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: 'users-1',
            name: 'John Doe',
            email: 'john@example.com',
          },
        },
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [action.payload.comment, ...initialState.comments],
    });
  });

  it('should return the threadId, commentId, userId when given by UP_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: 'users-1',
            name: 'John Doe',
            email: 'john@example.com',
          },
        },
      ],
    };

    const action = {
      type: 'UP_VOTE_COMMENT',
      payload: {
        threadId: 'thread-1',
        commentId: 'comment-1',
        userId: 'users-1',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: initialState.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.includes(action.payload.userId)
              ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
              : comment.upVotesBy.concat([action.payload.userId]),
            downVotesBy: comment.downVotesBy.includes(action.payload.userId)
              ? comment.downVotesBy.filter((id) => id !== action.payload.userId)
              : comment.downVotesBy,
          };
        }
        return comment;
      }),
    });
  });

  it('should return the threadId, commentId, userId when given by DOWN_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: 'users-1',
            name: 'John Doe',
            email: 'john@example.com',
          },
        },
      ],
    };

    const action = {
      type: 'DOWN_VOTE_COMMENT',
      payload: {
        threadId: 'thread-1',
        commentId: 'comment-1',
        userId: 'users-1',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: initialState.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            downVotesBy: comment.downVotesBy.includes(action.payload.userId)
              ? comment.downVotesBy.filter((id) => id !== action.payload.userId)
              : comment.downVotesBy.concat([action.payload.userId]),
            upVotesBy: comment.upVotesBy.includes(action.payload.userId)
              ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
              : comment.upVotesBy,
          };
        }
        return comment;
      }),
    });
  });
});
