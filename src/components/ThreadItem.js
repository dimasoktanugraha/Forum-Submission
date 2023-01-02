import React from 'react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import {
  AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike, AiOutlineComment,
} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { postedAt } from '../utils';

function ThreadItem({
  id, title, body, category, createdAt, ownerId, upVotesBy,
  downVotesBy, totalComments, users, upVote, downVote, authUser = '',
}) {
  const navigate = useNavigate();
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  const onThreadClick = () => {
    navigate(`/thread/${id}`);
  };

  const onThreadPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      navigate(`/thread/${id}`);
    }
  };

  const onUpVoteClick = (event) => {
    event.stopPropagation();
    upVote(id);
  };

  const onDownVoteClick = (event) => {
    event.stopPropagation();
    downVote(id);
  };

  return (
    <div role="button" tabIndex={0} className="thread-item" onClick={onThreadClick} onKeyDown={onThreadPress}>
      <div className="thread-item__info">
        <div className="thread-item__category">
          <p>
            #
            {category}
          </p>
        </div>
        <p className="thread-item__title">{title}</p>
        <p className="thread-item__body">{parser(body)}</p>
      </div>
      <div className="thread-item__action">
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
        <p>
          <button type="button" aria-label="comment">
            <AiOutlineComment />
          </button>
          {' '}
          {totalComments}
        </p>
        <p className="thread-item__created-at">{postedAt(createdAt)}</p>
        <p className="thread-item__created-by">dibuat oleh</p>
        <p className="thread-item__owner">{users.find((user) => user.id === ownerId).name}</p>
      </div>
    </div>
  );
}

const userItemShape = {
  id: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  avatar: PropTypes.string,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  authUser: PropTypes.string,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  ...userItemShape,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export { threadItemShape, userItemShape };

export default ThreadItem;
