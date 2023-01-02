import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';
import { commentItemShape } from './DetailItem';

function CommentList({ comments, upVote, downVote }) {
  return (
    <div className="comment-list">
      {
         comments.map((comment) => (
           <CommentItem
             key={comment.id}
             id={comment.id}
             {...comment}
             upVote={upVote}
             downVote={downVote}
           />
         ))
      }
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default CommentList;
