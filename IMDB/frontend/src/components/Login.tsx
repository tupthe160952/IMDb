import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser  } from './UserContext';
import '../styles/Login.css';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser  } = useUser ();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [keepSignedIn, setKeepSignedIn] = useState(false); // Trạng thái giữ đăng nhập


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:9999/users?email=${email}&password=${password}`);
      const users = await response.json();

      if (users.length > 0) {
        // Đăng nhập thành công
        const loggedInUser  = users[0];

        // Kiểm tra trạng thái isActive
        if (!loggedInUser .isActive) {
          setError('Your account has been deactivated.');
          return; // Dừng xử lý nếu tài khoản bị cấm
        }

        // Nếu tài khoản hoạt động, tiếp tục đăng nhập
        if (keepSignedIn) {
          localStorage.setItem('user', JSON.stringify(loggedInUser ));
        } else {
          sessionStorage.setItem('user', JSON.stringify(loggedInUser )); // Sử dụng sessionStorage nếu không muốn giữ đăng nhập
        }
        setUser (loggedInUser );
        alert('Login successful');

        // Kiểm tra vai trò của người dùng
        if (loggedInUser .role === 'admin') {
          navigate('/admin'); // Điều hướng đến trang admin
        } else {
          navigate('/'); // Điều hướng về trang Home
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred during login');
    } finally {
      setLoading(false); // Đặt trạng thái loading về false
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
          {error && <div className="alert alert-danger">{error}</div>}
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
            value={password }
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
          <div className="checkbox-container">
            <label>
              <input 
                type="checkbox" 
                checked={keepSignedIn} 
                onChange={(e) => setKeepSignedIn(e.target.checked)} 
              /> Keep me signed in.
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