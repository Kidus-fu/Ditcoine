import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../config';
import api from '../api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    api
      .post('/api/token/', { username, password })
      .then((res) => res.data)
      .then((data) => {
        localStorage.clear();
        localStorage.setItem("Username",username)
        localStorage.setItem(ACCESS_TOKEN, data.access);
        localStorage.setItem(REFRESH_TOKEN, data.refresh);
        setLoading(false);
        navigate('/'); // Redirect to home page after successful login
      })
      .catch((err) => {
        setError('Invalid login credentials');
        setLoading(false);
      });
  };

  return (
    <Container className="mt-5">
      {loading ? (
        <div
          className="position-absolute top-50 start-50 translate-middle pulse-container"
          style={{ width: '100px', height: '100px' }} // Make spinner container larger
        >
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: '80px', height: '80px' }} // Bigger spinner size
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-center">Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {error && <p className="text-danger">{error}</p>}
            <Button type="submit" className="btn btn-primary w-100 mt-3">
              Login
            </Button>
            <center>
            <small>I don't have account yet<a href='regester/' className='text-decoration-none text-info btn'>Sing Up</a></small>
            </center>
          </Form>
        </>
      )}
    </Container>
  );
};

export default Login;
