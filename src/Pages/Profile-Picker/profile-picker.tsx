import { useNavigate } from 'react-router-dom';
import { userProfiles } from '../../Database/profiles';
import ProfileBubble from '../../Components/Profile-Picker/Profile-Bubble/profile-bubble';
import './profile-picker.css';

function ProfilePicker() {
  const navigate = useNavigate();

  const handleProfileSelect = (userName: string) => {
    localStorage.setItem('selectedProfile', userName);
    navigate('/home');
  };

  return (
    <div className='main-profile-picker d-flex flex-column align-items-center p-5 text-light'>
      <h3 className='profile-title'>Who is watching?</h3>
      <div className='profiles-container'>
        {userProfiles.map((user) => (
          <ProfileBubble
            key={user.userName}
            userName={user.userName}
            userPicture={user.userPicture}
            onClick={() => handleProfileSelect(user.userName)}
          />
        ))}
      </div>
      <button className='btn btn-dark edit-profile-button' style={{width:'150px'}} onClick={() => navigate('/home')}>Editar</button>
    </div>
  );
}

export default ProfilePicker;
