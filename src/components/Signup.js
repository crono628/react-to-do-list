import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError('Passwords do not match');
    }
    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (error) {
      setError('Failed to create and account');
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
            <h1 className="text-center mb-4">Sign Up</h1>
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
              <Form.Group id="password-confirmation">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmationRef}
                  required
                />
              </Form.Group>
              <Button disabled={loading} type="submit" className="w-100 mt-3">
                Sign up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
