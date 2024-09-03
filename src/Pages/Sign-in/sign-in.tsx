import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeHeader from '../../Components/Headers/Login/welcome';

function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('https://streaming-service-backend-muow.onrender.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/');
      } else {
        console.error('Registration failed:', data.message || 'An error occurred');
        setError(data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registration failed, please try again later.');
    }
  };

  return (
    <div className='welcome-main'>
      <div className='welcome-main'>
        <WelcomeHeader />
        <div className='d-flex flex-column align-items-center m-5'>
          <h3 className='text-light display-2'>Join Us Today</h3>
          <p className='text-light mt-3 mt-5' style={{ fontSize: '1.75rem' }}>Create your account to get started.</p>
          <form className='d-flex flex-column align-items-center w-50' onSubmit={handleRegister}>
            <input
              type="email"
              className="form-control mb-3 w-75"
              placeholder="Your email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="input-group mb-3 w-75">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Your password here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="input-group mb-3 w-75">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {error && <p className='text-danger'>{error}</p>}
            <button type='submit' className='btn btn-lg btn-danger w-25'>
              Register {'>'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;