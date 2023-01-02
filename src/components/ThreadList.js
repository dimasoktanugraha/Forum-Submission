import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem, { threadItemShape, userItemShape } from './ThreadItem';

function ThreadList({
  threads, users, upVote, downVote,
}) {
  return (
    <div className="thread-list">
      {
         threads.map((thread) => (
           <ThreadItem
             key={thread.id}
             id={thread.id}
             {...thread}
             users={users}
             upVote={upVote}
             downVote={downVote}
           />
         ))
      }
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape(userItemShape)).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default ThreadList;
