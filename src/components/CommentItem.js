import React from 'react';
import parser from 'html-react-parser';
import PropTypes from 'prop-types';
import {
  AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike,
} from 'react-icons/ai';
import { commentItemShape } from './DetailItem';
import { postedAt } from '../utils';

function CommentItem({
  id, content, createdAt, owner, upVotesBy, downVotesBy, upVote, downVote, authUser = '',
}) {
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  const onUpVoteClick = (event) => {
    event.stopPropagation();
    upVote(id);
  };

  const onDownVoteClick = (event) => {
    event.stopPropagation();
    downVote(id);
  };

  return (
    <div className="comment-item">
      <div className="comment-item__info">
        <div className="comment-item__owner">
          <div className="comment-item__owner-avatar">
            <img src={owner.avatar} alt={owner} />
          </div>
          <p>
            {owner.name}
          </p>
        </div>
        <p>
          {postedAt(createdAt)}
        </p>
      </div>
      <p className="comment-item__content">
        {parser(content)}
      </p>
      <div className="comment-item__action">
        <p>
          <button type="button" aria-label="like" onClick={onUpVoteClick}>
            { isUpVoted ? <AiFillLike /> : <AiOutlineLike />}
          </button>
          {' '}
          {upVotesBy.length}
        </p>
        <p>
          <button type="button" aria-label="dislike" onClick={onDownVoteClick}>
            { isDownVoted ? <AiFillDislike /> : <AiOutlineDislike />}
          </button>
          {' '}
          {downVotesBy.length}
        </p>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  ...commentItemShape,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default CommentItem;
