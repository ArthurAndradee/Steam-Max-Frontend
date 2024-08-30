import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './welcome.css';

function WelcomeHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  const buttonText = isHomePage ? 'Sign In' : 'Log In';
  const navigateTo = isHomePage ? '/register' : '/';

  return (
    <div className='p-5 d-flex'>
      <h2 className='text-danger'>StreamMax</h2>
      <select className="form-select w-25 ms-auto select-language-input" aria-label="Default select example">
        <option value="English">English</option>
        <option value="Portugues">Português</option>
      </select>
      <button className='btn btn-danger ms-4' onClick={() => navigate(navigateTo)}>
        {buttonText}
      </button>
    </div>
  );
}

export default WelcomeHeader;