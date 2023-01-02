import React from 'react';
import PropTypes from 'prop-types';

function PopulerItem({ category }) {
  return (
    <div className="chip">
      <p>
        #
        {category}
      </p>
    </div>
  );
}

PopulerItem.propTypes = {
  category: PropTypes.string.isRequired,
};

export default PopulerItem;
