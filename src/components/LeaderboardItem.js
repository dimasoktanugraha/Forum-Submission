import React from 'react';
import PropTypes from 'prop-types';
import { userItemShape } from './ThreadItem';

function LeaderboardItem({
  user, score,
}) {
  return (
    <div className="leaderboards-item">
      <div className="leaderboards-item__user">
        <div className="leaderboards-item__user-avatar">
          <img src={user.avatar} alt={user} />
        </div>
        <h2>{user.name}</h2>
      </div>
      <div className="leaderboards-item__score">
        <h2>{score}</h2>
      </div>
    </div>
  );
}

const leaderboardItemShape = {
  user: PropTypes.shape(userItemShape).isRequired,
  score: PropTypes.number.isRequired,
};

LeaderboardItem.propTypes = {
  ...leaderboardItemShape,
};

export { leaderboardItemShape };

export default LeaderboardItem;
