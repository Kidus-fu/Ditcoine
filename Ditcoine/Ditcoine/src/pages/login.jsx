import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate a login process (replace with your API call)
    if (username === 'user123' && password === 'password') {
      alert('Login successful!');
      // Redirect or set user state here
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    
    <Container className="mt-5">
      <h2 className="text-center">Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            value={username}
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
        <div className="container row col-12 mt-3 ">
            
        <button className='btn btn-primary btn block ms-2'>Login </button>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
