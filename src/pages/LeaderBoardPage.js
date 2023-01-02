import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LeaderboardList from '../components/LeaderBoardList';
import { asyncGetLeaderBoard } from '../states/leaderboards/action';

function LeaderBoardPage() {
  const {
    leaderboards = [],
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetLeaderBoard());
  }, [dispatch]);

  return (
    <section className="leaderboard-page">
      <h2 className="leaderboard-title">Klasemen Pengguna Aktif</h2>
      <LeaderboardList leaderboards={leaderboards} />
    </section>
  );
}

export default LeaderBoardPage;
