import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from './AuthContext';
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
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body>
            <h1 className="text-center mb-4">Log In</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} type="submit" className="w-100 mt-3">
                Log In
              </Button>
            </Form>
            <Button
              onClick={handleAnon}
              disabled={loading}
              type="submit"
              className="w-100 mt-3"
            >
              Log In Anonymously
            </Button>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up</Link>{' '}
        </div>
      </div>
    </div>
  );
};

export default Login;
