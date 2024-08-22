import { useState } from 'react';
import { ProfileBubbleProps } from '../../../utils/interfaces';
import './profile-bubble.css';

function ProfileBubble(user: ProfileBubbleProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`profile-picker-container ${isHovered ? 'hovered' : ''}`}
      onClick={user.onClick}
    >
      <div className='profile-picker-main'  onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
        <img className='profile-picker-picture' alt='Profile' src={user.userPicture}  />
        <div className='profile-picker-name'>{user.userName}</div>
      </div>
    </div>
  );
}

export default ProfileBubble;
