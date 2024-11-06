import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';


const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rePassword, setRePassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== rePassword) {
      alert('Passwords do not match');
      return;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters long');
        return;
      }

      try {
        // Kiểm tra xem email đã tồn tại hay chưa
        const checkResponse = await fetch(`http://localhost:3001/users?email=${email}`);
        const users = await checkResponse.json();
  
        if (users.length > 0) {
          alert('Email already exists');
          return;
        }
  
        // Nếu email chưa tồn tại, tiếp tục đăng ký
        const user = { name, email, password,role: 'user' };
        const response = await fetch('http://localhost:3001/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });
  
        if (response.ok) {
          alert('User registered successfully');
          navigate('/home'); // Điều hướng về trang Home
        } else {
          alert('Failed to register user');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while registering the user');
      }
  };

  return (
    <div className=" register-form-container">
      <img
        src="https://m.media-amazon.com/images/G/01/imdb/authportal/images/www_imdb_logo._CB667618033_.png"
        alt="IMDb Logo"
        className="register-logo"
      />
      <div className="register-container">
        <h2 className='register-heading'>Create Account</h2>
        <form onSubmit={handleSubmit} className='register-form'>
          <label htmlFor="name">Your name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="First and last name" 
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <small>Passwords must be at least 8 characters.</small>

          <label htmlFor="re-password">Re-enter password</label>
          <input 
            type="password" 
            id="re-password" 
            name="re-password" 
            required 
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />

          <button type="submit">Create your IMDb account</button>
          <p className='register-p '>Already have an account? <a href="/login" register-link >Sign in</a></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
