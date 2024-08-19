import { ProfileBubbleProps } from '../../../utils/interfaces';
import './profile-bubble.css';

function ProfileBubble(user: ProfileBubbleProps) {
  return (
    <div style={{width:'10rem'}} className='profile-picker-container' onClick={user.onClick}>
      <div className='profile-picker-main'>
          <img className='profile-picker-picture'  alt='Profile' src={user.userPicture} />
        <div className='profile-picker-name'>{user.userName}</div>
      </div>
    </div>
  );
}

export default ProfileBubble;
