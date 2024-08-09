import { faBookmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './header.css';

function Header() {
  return (
    <div className='d-flex flex-row'>
      <h3>StreamMax</h3>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <FontAwesomeIcon icon={faBookmark} />
    </div>
  );
}

export default Header;
