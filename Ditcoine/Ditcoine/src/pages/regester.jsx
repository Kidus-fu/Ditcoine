import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Make sure this is pointing to your API
import { Link } from 'react-router-dom';
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Reset error message

    // Check if passwords match
    if (password !== password2) {
      setError("Passwords don't match.");
      setLoading(false);
      return;
    }

    api
      .post('register/', {
        username :username,
        password : password,
        password2: password2,
        email:email,
        first_name: firstName,
        last_name: lastName,
      })
      .then((res) => {
        if (res.status === 201) {
          // Registration successful
          navigate('/login'); // Redirect to login
        }
      })
      .catch((err) => {
        const responseErrors = err.response?.data;
        if (responseErrors) {
          // Handle specific error messages from Django
          if (responseErrors.username) {
            setError(responseErrors.username[0]); // Existing username
          } else if (responseErrors.email) {
            setError(responseErrors.email[0]); // Existing email
          } else {
            setError('Registration failed. Please try again.'); // General error
          }
        } else {
          setError('An unexpected error occurred.'); // Handle unexpected errors
        }
        setLoading(false);
      });
  };

  return (
    <Container className="mt-5">
      {loading ? (
        <div className="position-absolute top-50 start-50 translate-middle pulse-container" style={{ width: '100px', height: '100px' }}>
          <div className="spinner-border text-primary" role="status" style={{ width: '80px', height: '80px' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-center">Register</h2>
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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

            <Form.Group controlId="formBasicPassword2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
            </Form.Group>

            {error && <p className="text-danger">{error}</p>}

            <Button type="submit" className="btn btn-primary w-100 mt-3">
              Register
            </Button>
            <center>
            </center>
          </Form>
        </>
      )}
    </Container>
  );
};

export default Register;
