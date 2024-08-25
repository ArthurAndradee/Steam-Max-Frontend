import { useEffect, useState } from 'react';
import { faBookmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './header.css';
import { Link } from 'react-router-dom';
import { fetchProfile } from '../../../utils/functions/profile'; // Adjust the import path as needed

function Header() {
  const [profile, setProfile] = useState({ name: '', picture: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProfile() {
      const currentProfile = localStorage.getItem('selectedProfile')
      if(currentProfile)
      try {
        const profileData = await fetchProfile(currentProfile);
        setProfile(profileData);
      } catch (err) {
        setError(JSON.stringify(err));
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='d-flex py-4 px-5 align-items-center justify-content-between'>
      <h2 className='text-danger'>StreamMax</h2>
      <div className='d-flex'>
        <div className='mx-2 pb-2'><Link to={'/home'} className='header-link'>Home</Link></div>
        <div className='mx-2 pb-2'><Link to={'/home'} className='header-link'>Series</Link></div>
        <div className='mx-2 pb-2'><Link to={'/home'} className='header-link'>Movies</Link></div>
        <div className='mx-2 pb-2'><Link to={'/home'} className='header-link'>Children and Family</Link></div>
      </div>
      <div className='d-flex'>
        <FontAwesomeIcon className='mx-2 text-light header-icon' icon={faMagnifyingGlass} />
        <Link to={'/watchlist'} className='d-flex'><FontAwesomeIcon className='mx-2 text-light header-icon' icon={faBookmark} /></Link>
        <div 
          className='rounded border ms-2 current-profile-icon header-icon' 
          style={{backgroundImage: `url(${profile.picture})`}} 
        />
      </div>
    </div>
  );
}

export default Header;
