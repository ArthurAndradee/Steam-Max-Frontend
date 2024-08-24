import { faBookmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './header.css';
import { Link } from 'react-router-dom';

interface HeaderProps {
  currentProfilePicture: string;
}

function Header(user: HeaderProps) {
  return (
    <div className='d-flex py-4 px-5 align-items-center justify-content-between'>
      <h2 className='text-danger'>StreamMax</h2>
      <div className='d-flex'>
        <div className='mx-2 pb-2'><Link to={'/home'} className='header-link'>Home</Link></div>
        <div className='mx-2 pb-2'><Link to={'/home'} className='header-link'>Series</Link></div>
        <div className='mx-2 pb-2'><Link to={'/home'} className='header-link'>Movies</Link></div>
        <div className='mx-2 pb-2'><Link to={'/home'} className='header-link'>Children  and Family</Link></div>
      </div>
      <div className='d-flex'>
        <FontAwesomeIcon className='mx-2 text-light header-icon' icon={faMagnifyingGlass} />
        <Link to={'/watchlist'} className='d-flex'><FontAwesomeIcon className='mx-2 text-light header-icon' icon={faBookmark} /></Link>
        <div 
          className='rounded border ms-2 current-profile-icon header-icon' 
          style={{backgroundImage: `url(${user.currentProfilePicture})`}} 
        />
      </div>
    </div>
  );
}

export default Header;
