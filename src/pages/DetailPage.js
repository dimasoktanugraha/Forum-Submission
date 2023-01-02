import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncGetDetailThread, asyncAddComment,
  asyncToogleUpVoteComment, asyncToogleDownVoteComment,
  asyncToogleUpVoteDetail, asyncToogleDownVoteDetail,
} from '../states/detail/action';
import DetailItem from '../components/DetailItem';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';

function DetailPage() {
  const { id } = useParams();

  const {
    detailThread = null,
    authUser = null,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetDetailThread(id));
  }, [id, dispatch]);

  const onUpVoteDetail = () => {
    if (authUser != null) {
      dispatch(asyncToogleUpVoteDetail(id));
    } else {
      alert('Mohon Login');
    }
  };

  const onDownVoteDetail = () => {
    if (authUser != null) {
      dispatch(asyncToogleDownVoteDetail(id));
    } else {
      alert('Mohon Login');
    }
  };

  const onCommentThread = (text) => {
    dispatch(asyncAddComment({ id, content: text }));
  };

  const onUpVoteComment = (commentId) => {
    if (authUser != null) {
      dispatch(asyncToogleUpVoteComment({ threadId: id, commentId }));
    } else {
      alert('Mohon Login');
    }
  };

  const onDownVoteComment = (commentId) => {
    if (authUser != null) {
      dispatch(asyncToogleDownVoteComment({ threadId: id, commentId }));
    } else {
      alert('Mohon Login');
    }
  };

  if (!detailThread) {
    return null;
  }

  const commentList = detailThread.comments.map((comment) => ({
    ...comment,
    authUser: authUser != null ? authUser.id : '',
  }));

  return (
    <section className="detail-page">
      <h2>DETAIL</h2>
      <DetailItem
        {...detailThread}
        upVote={onUpVoteDetail}
        downVote={onDownVoteDetail}
        authUser={authUser != null ? authUser.id : ''}
      />
      <h3>Beri komentar</h3>
      {
        !authUser
          ? (
            <p>
              <Link to="/login">Login</Link>
              {' '}
              untuk memberi komentar
            </p>
          )
          : <CommentInput addComment={onCommentThread} />
      }
      <h3>
        Komentar (
        {detailThread.comments ? detailThread.comments.length : 0}
        )
      </h3>
      {
        detailThread.comments
          ? (
            <CommentList
              comments={commentList}
              upVote={onUpVoteComment}
              downVote={onDownVoteComment}
            />
          )
          : <div />
      }

    </section>
  );
}

export default DetailPage;
