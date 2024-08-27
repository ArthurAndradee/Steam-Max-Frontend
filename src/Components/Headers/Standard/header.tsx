import { useEffect, useState } from 'react';
import { faBookmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './header.css';
import { Link } from 'react-router-dom';
import { fetchProfile } from '../../../utils/functions/profile'; // Adjust the import path as needed

function Header() {
  const [loading, setLoading] = useState(true);
  const [profileImageSrc, setProfileImageSrc] = useState<string>('');

  useEffect(() => {
    async function loadProfile() {
      const currentProfile = localStorage.getItem('selectedProfile');
      if (currentProfile) {
        try {
          const profileData = await fetchProfile(currentProfile);
          
          if (profileData.picture.startsWith('data:image')) {
            setProfileImageSrc(profileData.picture);
          } else {
            setProfileImageSrc(`data:image/png;base64,${profileData.picture}`);
          }
        } catch (err) {
          console.log(JSON.stringify(err));
        } finally {
          setLoading(false);
        }
      }
    }

    loadProfile();
  }, []);

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
        <Link to={'/profile-picker'} className='d-flex'>
        {loading ? (
          <span className="loading-spinner ms-2"></span>
        ) : (
          <img
          className='rounded border ms-2 current-profile-icon header-icon'
          src={profileImageSrc}
          alt="Profile"
          onError={(e) => {
            e.currentTarget.src = 'https://cdn-icons-png.freepik.com/512/10870/10870763.png'; // Fallback image URL
          }}
          />
        )}
        </Link>
      </div>
    </div>
  );
}

export default Header;
