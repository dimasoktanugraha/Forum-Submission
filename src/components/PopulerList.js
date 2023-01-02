import React from 'react';
import PropTypes from 'prop-types';
import PopulerItem from './PopulerItem';
import { threadItemShape } from './ThreadItem';

function PopulerList({ threads }) {
  return (
    <div className="populer-list">
      {
         threads.map((thread) => (
           <PopulerItem
             key={thread.id}
             id={thread.id}
             {...thread}
           />
         ))
      }
    </div>
  );
}

PopulerList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
};

export default PopulerList;
