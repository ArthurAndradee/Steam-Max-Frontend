import './profile-bubble.css';

interface ProfileBubbleProps {
  userName: string;
  userPicture: string;
}

function ProfileBubble(user: ProfileBubbleProps) {
  return (
    <div style={{width:'10rem'}} className='d-flex flex-row justify-content-center'>
      <div className='profile-picker-main'>
          <img className='rounded-circle profile-picker-picture'  alt='Profile' src={user.userPicture} />
        <div className='profile-picker-name'>{user.userName}</div>
      </div>
    </div>
  );
}

export default ProfileBubble;
