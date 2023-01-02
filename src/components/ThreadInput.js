import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function ThreadInput({ thread }) {
  const [title, onTitleChange] = useInput('');
  const [body, onBodyChange] = useInput('');
  const [category, onCategoryChange] = useInput('');

  return (
    <form className="thread-input">
      <input type="text" value={title} onChange={onTitleChange} placeholder="Title" />
      <input type="text" value={category} onChange={onCategoryChange} placeholder="Category" />
      <textarea type="text" placeholder="Isi Diskusi" value={body} onChange={onBodyChange} />
      <button type="button" onClick={() => thread({ title, body, category })}>Buat</button>
    </form>
  );
}

ThreadInput.propTypes = {
  thread: PropTypes.func.isRequired,
};

export default ThreadInput;
