import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdOutlineForum, MdOutlineLeaderboard } from 'react-icons/md';
import { IoMdLogIn, IoMdLogOut } from 'react-icons/io';

function Navigation({ signOut }) {
  const {
    authUser = null,
  } = useSelector((states) => states);

  return (
    <div className="navigation">
      <Link to="/"><button type="button" className="navigation-button" label="thread"><MdOutlineForum /></button></Link>
      <Link to="/leaderboards"><button type="button" className="navigation-button" label="leaderboards"><MdOutlineLeaderboard /></button></Link>
      {
        authUser == null
          ? <Link to="/login"><button type="button" className="navigation-button" label="login"><IoMdLogIn /></button></Link>
          : <button type="button" className="navigation-button" label="signout" onClick={signOut}><IoMdLogOut /></button>
      }
    </div>
  );
}

Navigation.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default Navigation;
