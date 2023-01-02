import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_DETAIL_THREAD: 'RECEIVE_DETAIL_THREAD',
  UP_VOTE_DETAIL: 'UP_VOTE_DETAIL',
  DOWN_VOTE_DETAIL: 'DOWN_VOTE_DETAIL',
  ADD_COMMENT_THREAD: 'ADD_COMMENT_THREAD',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
};

function receiveDetailThreadActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREAD,
    payload: {
      detailThread,
    },
  };
}

function upVoteDetailActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UP_VOTE_DETAIL,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteDetailActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_DETAIL,
    payload: {
      threadId,
      userId,
    },
  };
}

function addCommentThreadActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT_THREAD,
    payload: {
      comment,
    },
  };
}

function upVoteCommentdActionCreator({ threadId, commentId, userId }) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function downVoteCommenActionCreator({ threadId, commentId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function asyncGetDetailThread(id) {
  return async (dispatch, getState) => {
    dispatch(receiveDetailThreadActionCreator(null));
    dispatch(showLoading());

    try {
      const detailThread = await api.getDetailThread(id);
      dispatch(receiveDetailThreadActionCreator(detailThread));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncToogleUpVoteDetail(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(upVoteDetailActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.neutralVoteThread(threadId);
      await api.upVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(upVoteDetailActionCreator({ threadId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

function asyncToogleDownVoteDetail(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(downVoteDetailActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.neutralVoteThread(threadId);
      await api.downVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(downVoteDetailActionCreator({ threadId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

function asyncAddComment({ id, content = '' }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const comment = await api.createComment({ id, content });
      dispatch(addCommentThreadActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncToogleUpVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(upVoteCommentdActionCreator({ threadId, commentId, userId: authUser.id }));

    try {
      await api.neutralVoteComment({ threadId, commentId });
      await api.upVoteComment({ threadId, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(upVoteCommentdActionCreator({ threadId, commentId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

function asyncToogleDownVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(downVoteCommenActionCreator({ threadId, commentId, userId: authUser.id }));

    try {
      await api.neutralVoteComment({ threadId, commentId });
      await api.downVoteComment({ threadId, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(downVoteCommenActionCreator({ threadId, commentId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveDetailThreadActionCreator,
  upVoteDetailActionCreator,
  downVoteDetailActionCreator,
  addCommentThreadActionCreator,
  upVoteCommentdActionCreator,
  downVoteCommenActionCreator,
  asyncGetDetailThread,
  asyncToogleUpVoteDetail,
  asyncToogleDownVoteDetail,
  asyncAddComment,
  asyncToogleUpVoteComment,
  asyncToogleDownVoteComment,
};
