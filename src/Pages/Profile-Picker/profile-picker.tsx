import { useNavigate } from 'react-router-dom';
import ProfileBubble from '../../Components/Profile-Picker/Profile-Bubble/profile-bubble';
import './profile-picker.css';
import { Profile } from '../../utils/interfaces/objects';
import { useState, useEffect } from 'react';
import ProfileForm from '../../Components/Profile-Picker/Profile-Add-Form/profile-add-form';
import { deleteProfile, fetchProfiles } from '../../utils/functions/profile';
import ProfileEditForm from '../../Components/Profile-Picker/Profile-Update-Form/profile-update-form';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ProfilePicker() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [profileToEdit, setProfileToEdit] = useState<Profile | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isUserAddingProfile, setIsUserAddingProfile] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [choosingProfileToEdit, setChoosingProfileToEdit] = useState(false);
  const [isUserAddingProfileVisible, setIsUserAddingProfileVisible] = useState(false);
  const [isEditingProfileVisible, setIsEditingProfileVisible] = useState(false);

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
    setIsEditingProfileVisible(true);
  };

  const handleProfileUpdate = (updatedProfile: Profile) => {
    setProfiles(profiles.map(profile =>
      profile.name === profileToEdit?.name ? updatedProfile : profile
    ));
    closeEditForm();
  };

  const closeEditForm = () => {
    setIsEditingProfile(false);
    setIsUserAddingProfile(false);
    setTimeout(() => setIsEditingProfileVisible(false), 500);
  };

  const closeAddForm = () => {
    setIsUserAddingProfile(false);
    setTimeout(() => setIsUserAddingProfileVisible(false), 500);
  };

  const handleProfileSelect = (userName: string) => {
    localStorage.setItem('selectedProfile', userName);
    navigate('/home');
  };

  return (
    <div className='main-profile-picker'>
      <h3 className='profile-title'>Who is watching?</h3>
      <div className='profiles-container'>
        {profiles.map((profile: Profile) => (
          <div key={profile.name}>
            <div className={`choosing-profile-to-edit ${choosingProfileToEdit ? 'show' : ''} position-absolute d-flex px-2`} style={{ width: '10rem' }}>
              <div className='d-flex' style={{ width: '5rem', margin: 'auto' }}>
                <div className='profile-button-container' onClick={() => handleProfileEdit(profile)}>
                  <FontAwesomeIcon className='profile-interact-button' icon={faPenToSquare} />
                </div>
                <div className='profile-button-container ms-auto' onClick={() => handleProfileDelete(profile.name)}>
                  <FontAwesomeIcon className='profile-interact-button' icon={faTrashCan} />
                </div>
              </div>
            </div>
            <ProfileBubble
              key={profile.name}
              name={profile.name}
              picture={profile.picture}
              onClick={() => handleProfileSelect(profile.name)}
            />
          </div>
        ))}
        <div
          className={`profile-edit-container ${isHovered ? 'hovered' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className='profile-edit-main' onClick={() => {
            setIsUserAddingProfile(true);
            setIsUserAddingProfileVisible(true);
          }}>
            <div className='profile-edit-picture'>+</div>
            <div className='profile-edit-name'>Add Profile</div>
          </div>
        </div>
      </div>
      {(isUserAddingProfileVisible || (isEditingProfileVisible && profileToEdit)) && <div className='dark-background' />}
      <div className={`modal ${isUserAddingProfileVisible ? (isUserAddingProfile ? 'modal--visible' : 'modal--invisible') : ''}`}>
        {isUserAddingProfileVisible && <ProfileForm onCancel={closeAddForm} />}
      </div>
      <div className={`modal ${isEditingProfileVisible ? (isEditingProfile ? 'modal--visible' : 'modal--invisible') : ''}`}>
        {isEditingProfileVisible && profileToEdit && (
          <ProfileEditForm
          currentName={profileToEdit.name}
          currentPicture={profileToEdit.picture}
          onUpdateSuccess={handleProfileUpdate}
          onCancel={closeEditForm}
          />
        )}
      </div>
      <div className='mt-5 pt-5'></div>
      <button
        className='btn btn-dark edit-profile-button'
        style={{ width: '150px' }}
        onClick={() => setChoosingProfileToEdit(!choosingProfileToEdit)}
      >
        {choosingProfileToEdit ? (<div>Stop editing</div>) : (<div>Edit</div>)}
      </button>
    </div>
  );
}

export default ProfilePicker;