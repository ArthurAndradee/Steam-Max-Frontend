import { useState, useEffect } from 'react';
import { ProfileBubbleProps } from '../../../utils/interfaces/components';
import './profile-bubble.css';

function ProfileBubble(user: ProfileBubbleProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [profileImageSrc, setProfileImageSrc] = useState<string>('');
  const fallbackImage = 'https://cdn-icons-png.freepik.com/512/10870/10870763.png';

  useEffect(() => {
    if (user.picture) {
      if (user.picture.startsWith('data:image')) {
        setProfileImageSrc(user.picture);
      } else {
        setProfileImageSrc(`data:image/png;base64,${user.picture}`);
      }
    } else {
      setProfileImageSrc(fallbackImage);
    }
  }, [user.picture]);

  return (
    <div
      className={`profile-picker-container ${isHovered ? 'hovered' : ''}`}
      onClick={user.onClick}
    >
      <div
        className='profile-picker-main'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          className='profile-picker-picture'
          alt='Profile'
          src={profileImageSrc}
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />
        <div className='profile-picker-name'>{user.name}</div>
      </div>
    </div>
  );
}

export default ProfileBubble;
