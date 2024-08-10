import { faBookmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './header.css';

interface HeaderProps {
  currentProfilePicture: string;
}

function Header(user: HeaderProps) {
  return (
    <div className='d-flex my-4 mx-5 align-items-center justify-content-between'>
      <h3 className='text-danger'>StreamMax</h3>
      <div className='d-flex'>
        <div className='mx-2'>Home</div>
        <div className='mx-2'>Series</div>
        <div className='mx-2'>Shows</div>
        <div className='mx-2'>Children and Family</div>
      </div>
      <div className='d-flex'>
        <FontAwesomeIcon className='mx-2' icon={faMagnifyingGlass} />
        <FontAwesomeIcon className='mx-2' icon={faBookmark} />
        <div className='rounded border ms-2 current-profile-icon' style={{backgroundImage: `url(${user.currentProfilePicture})`}}
        ></div>
      </div>
    </div>
  );
}

export default Header;
