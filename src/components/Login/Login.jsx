import React, { useRef, useState } from 'react';
import { useAuth } from '../../Context';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, logInAnonymously } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (error) {
      setError('Failed to log in');
      console.log(error);
    }
    setLoading(false);
  };

  const handleAnon = async (e) => {
    e.preventDefault();
    console.log('logInAnonymously');
    try {
      setError('');
      setLoading(true);
      await logInAnonymously();
      navigate('/');
    } catch (error) {
      setError('Failed to log in');
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Log In</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" ref={emailRef} required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordRef} required />
        <button type="submit" disabled={loading}>
          Log In
        </button>
      </form>
      <button onClick={handleAnon}>Log In Anonymously</button>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
