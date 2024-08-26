import { useNavigate } from 'react-router-dom';
import ProfileBubble from '../../Components/Profile-Picker/Profile-Bubble/profile-bubble';
import './profile-picker.css';
import { Profile } from '../../utils/interfaces/objects';
import { useState, useEffect } from 'react';
import ProfileForm from '../../Components/Profile-Picker/Profile-Form/profile-form';
import { deleteProfile, fetchProfiles } from '../../utils/functions/profile'

function ProfilePicker() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isUserAddingProfile, setIsUserAddingProfile] = useState(false);

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const profilesData = await fetchProfiles();
        setProfiles(profilesData);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    loadProfiles();
  }, []);

  const handleProfileDelete = async (profileName: string) => {
    try {
      await deleteProfile(profileName);
      setProfiles(prevProfiles => prevProfiles.filter(profile => profile.name !== profileName));
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };


  const handleProfileSelect = (userName: string) => {
    localStorage.setItem('selectedProfile', userName);
    navigate('/home');
  };

  return (
    <div className='main-profile-picker d-flex flex-column align-items-center text-light'>
      <h3 className='profile-title'>Who is watching?</h3>
      <div className='profiles-container'>
        {profiles.map((profile: Profile) => (
          <div>
            <ProfileBubble
              key={profile.name}
              userName={profile.name}
              userPicture={profile.picture}
              onClick={() => handleProfileSelect(profile.name)}
            />
            <button onClick={() => handleProfileDelete(profile.name)} className='btn btn-danger'>Delete</button>
          </div>
        ))}
        <div
          className={`profile-edit-container ${isHovered ? 'hovered' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className='profile-edit-main' onClick={() => setIsUserAddingProfile(true)}>
            <div className='profile-edit-picture'>+</div>
            <div className='profile-edit-name'>Add Profile</div>
          </div>
        </div>
      </div>
      {isUserAddingProfile && <div className='dark-background' />}
      {isUserAddingProfile && <ProfileForm />}
      <button
        className='btn btn-dark edit-profile-button'
        style={{ width: '150px' }}
        onClick={() => navigate('/home')}
      >
        Edit
      </button>
    </div>
  );
}

export default ProfilePicker;
