import { useNavigate } from 'react-router-dom';
import ProfileBubble from '../../Components/Profile-Picker/Profile-Bubble/profile-bubble';
import './profile-picker.css';
import { Profile } from '../../utils/interfaces/objects';
import { useState, useEffect } from 'react';
import ProfileForm from '../../Components/Profile-Picker/Profile-Add-Form/profile-add-form';
import { deleteProfile, fetchProfiles } from '../../utils/functions/profile'
import ProfileEditForm from '../../Components/Profile-Picker/Profile-Update-Form/profile-update-form';

function ProfilePicker() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isUserAddingProfile, setIsUserAddingProfile] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileToEdit, setProfileToEdit] = useState<Profile | null>(null);

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

  const handleProfileEdit = (profile: Profile) => {
    setProfileToEdit(profile);
    setIsEditingProfile(true);
  };

  const handleProfileUpdate = (updatedProfile: Profile) => {
    setProfiles(profiles.map(profile =>
      profile.name === profileToEdit?.name ? updatedProfile : profile
    ));
    setIsEditingProfile(false);
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
              name={profile.name}
              picture={profile.picture}
              onClick={() => handleProfileSelect(profile.name)}
            />
            <div className='mt-5 pt-5'>
              <button onClick={() => handleProfileEdit(profile)} className='btn btn-success'>Edit</button>
              <button onClick={() => handleProfileDelete(profile.name)} className='btn btn-danger'>Delete</button>
            </div>
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
      {(isUserAddingProfile || (isEditingProfile && profileToEdit)) && <div className='dark-background' />}
      {isUserAddingProfile && <ProfileForm />}
      {isEditingProfile && profileToEdit && (
        <ProfileEditForm
          currentName={profileToEdit.name}
          currentPicture={profileToEdit.picture}
          onUpdateSuccess={handleProfileUpdate}
          onCancel={() => setIsEditingProfile(false)}
        />
      )}
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
