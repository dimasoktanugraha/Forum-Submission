import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiPlusCircle } from 'react-icons/fi';
import PopulerList from '../components/PopulerList';
import ThreadList from '../components/ThreadList';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncToogleUpVote, asyncToogleDownVote } from '../states/threads/action';

function ThreadPage() {
  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((states) => states);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  function onAddHandler() {
    navigate('/add');
  }

  const onUpVote = (id) => {
    if (authUser != null) {
      dispatch(asyncToogleUpVote(id));
    } else {
      alert('Mohon Login');
    }
  };

  const onDownVote = (id) => {
    if (authUser != null) {
      dispatch(asyncToogleDownVote(id));
    } else {
      alert('Mohon Login');
    }
  };

  const threadList = threads.map((thread) => ({
    ...thread,
    authUser: authUser != null ? authUser.id : '',
  }));

  return (
    <section className="thread-page">
      <h3>Kategory Populer</h3>
      <PopulerList threads={threads} />
      <h2>Diskusi Tersedia</h2>
      <ThreadList threads={threadList} users={users} upVote={onUpVote} downVote={onDownVote} />
      <div className="thread__action">
        <button type="button" className="thread__add" label="add" onClick={() => onAddHandler()}><FiPlusCircle /></button>
      </div>
    </section>
  );
}

export default ThreadPage;
