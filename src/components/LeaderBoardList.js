import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardItem, { leaderboardItemShape } from './LeaderboardItem';

function LeaderboardList({ leaderboards }) {
  return (
    <div className="leaderboard-list">
      <div className="leaderboard-header">
        <h3 className="leaderboard-header__user">Pengguna</h3>
        <h3 className="leaderboard-header__score">Skor</h3>
      </div>
      {
         leaderboards.map((leaderboard) => (
           <LeaderboardItem
             key={leaderboard.user.id}
             id={leaderboard.user.id}
             {...leaderboard}
           />
         ))
      }
    </div>
  );
}

LeaderboardList.propTypes = {
  leaderboards: PropTypes.arrayOf(PropTypes.shape(leaderboardItemShape)).isRequired,
};

export default LeaderboardList;
