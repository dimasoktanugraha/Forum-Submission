import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './components/Loading';
import Navigation from './components/Navigation';
import LoginPage from './pages/LoginPage';
import ThreadPage from './pages/ThreadPage';
import LeaderBoardPage from './pages/LeaderBoardPage';
import RegisterPage from './pages/RegisterPage';
import DetailPage from './pages/DetailPage';
import AddPage from './pages/AddPage';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';

function App() {
  const {
    isPreload = false,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  return (
    <>
      <Loading />
      <div className="app-container">
        <header className="app-header">
          <div className="top-bar">
            <h1>Forum</h1>
          </div>
        </header>
        <main className="app-content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/*" element={<ThreadPage />} />
            <Route path="/leaderboards" element={<LeaderBoardPage />} />
            <Route path="/thread/:id" element={<DetailPage />} />
            <Route path="/add" element={<AddPage />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <Navigation signOut={onSignOut} />
        </footer>
      </div>
    </>
  );
}

export default App;
