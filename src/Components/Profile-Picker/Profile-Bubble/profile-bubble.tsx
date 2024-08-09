import './profile-bubble.css';

interface ProfileBubbleProps {
  
}

function ProfileBubble(props: ProfileBubbleProps) {
  return (
    <div style={{width:'10rem'}} className='d-flex flex-row justify-content-center'>
      <div className='profile-picker-main'>
          <img className='border rounded-circle profile-picker-picture'  alt='Profile' src='https://i.pinimg.com/564x/0f/58/d2/0f58d2ac09aee0c5779bb8a20b88a76b.jpg' />
        <div className='profile-picker-name'>Profile name</div>
      </div>
    </div>
  );
}

export default ProfileBubble;
