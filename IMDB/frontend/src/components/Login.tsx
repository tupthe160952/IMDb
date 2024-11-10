import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import '../styles/Login.css';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:9999/users?email=${email}&password=${password}`);
      const users = await response.json();

      if (users.length > 0) {
        // Đăng nhập thành công
        localStorage.setItem('user', JSON.stringify(users[0]));
        setUser(users[0]);
        alert('Login successful');
        navigate('/'); // Điều hướng về trang Home
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during login');
    }
  };

  return (
    <div className='form-login'>
      <div className="logo-container">
        <img src="https://m.media-amazon.com/images/G/01/imdb/authportal/images/www_imdb_logo._CB667618033_.png" alt="IMDb Logo" className="logo" />
      </div>
      <div className="login-container">
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email or mobile phone number"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign in</button>
          <div className="checkbox-container">
            <label>
              <input type="checkbox" /> Keep me signed in.
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <div className="create-account">
            New to IMDb? <a href="/register">Create your IMDb account</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
