import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CommentInput({ addComment }) {
  const [text, setText] = useState('');

  function addCommentHandler() {
    if (text.trim()) {
      addComment(text);
      setText('');
    }
  }

  function handleTextChange({ target }) {
    if (target.value.length <= 320) {
      setText(target.value);
    }
  }

  return (
    <div className="comment-input">
      <textarea type="text" placeholder="Comment this thread?" value={text} onChange={handleTextChange} />
      <p className="comment-input__char-left">
        <strong>{text.length}</strong>
        /320
      </p>
      <button type="submit" onClick={addCommentHandler}>Submit</button>
    </div>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentInput;
