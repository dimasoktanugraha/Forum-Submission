import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ThreadInput from '../components/ThreadInput';
import { asyncAddThread } from '../states/threads/action';

function AddPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCreate = ({ title, body, category }) => {
    dispatch(asyncAddThread({ title, body, category }));
    navigate('/');
  };

  return (
    <section className="login-page">
      <h2>Buat Diskusi Baru</h2>
      <ThreadInput thread={onCreate} />
    </section>
  );
}

export default AddPage;
