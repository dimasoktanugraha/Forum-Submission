import React from 'react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import {
  AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike,
} from 'react-icons/ai';
import { postedAt } from '../utils';

function DetailItem({
  title, body, category, createdAt, owner, upVotesBy, downVotesBy, upVote, downVote, authUser,
}) {
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  const onUpVoteClick = (event) => {
    event.stopPropagation();
    upVote();
  };

  const onDownVoteClick = (event) => {
    event.stopPropagation();
    downVote();
  };

  return (
    <div className="detail-item">
      <div className="detail-item__info">
        <div className="detail-item__category">
          <p>
            #
            {category}
          </p>
        </div>
        <p className="detail-item__title">{title}</p>
        <p className="detail-item__body">{parser(body)}</p>
      </div>
      <div className="detail-item__action">
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
        <p className="detail-item__created-by">dibuat oleh</p>
        <div className="detail-item__owner-avatar">
          <img src={owner.avatar} alt={owner} />
        </div>
        <p className="detail-item__owner-name">{owner.name}</p>
        <p className="detail-item__created-at">{postedAt(createdAt)}</p>
      </div>
    </div>
  );
}

const ownerItemShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const commentItemShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerItemShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string,
};

const detailThreadItemShape = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerItemShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired,
};

DetailItem.propTypes = {
  ...detailThreadItemShape,
};

export { detailThreadItemShape, ownerItemShape, commentItemShape };

export default DetailItem;
