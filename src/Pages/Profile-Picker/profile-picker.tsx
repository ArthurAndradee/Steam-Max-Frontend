import ProfileBubble from '../../Components/Profile-Picker/Profile-Bubble/profile-bubble';
import './profile-picker.css';

function ProfilePicker() {
  return (
    <div className='main-profile-picker d-flex flex-column align-items-center p-5 text-light'>
      <h3>Who is watching?</h3>
      <div className='d-flex mt-5 justify-content-center'>
        <ProfileBubble />
        <ProfileBubble />
        <ProfileBubble />
      </div>
      <button className='btn btn-dark edit-profile-button' style={{width:'150px'}}>Editar</button>
    </div>
  );
}

export default ProfilePicker;
