import './profile-bubble.css';

interface ProfileBubbleProps {
  
}

function ProfileBubble(props: ProfileBubbleProps) {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center w-25'>
      <img className='border rounded-circle mx-5 mb-3' style={{width:'7rem'}} alt='Profile' src='https://i.pinimg.com/564x/0f/58/d2/0f58d2ac09aee0c5779bb8a20b88a76b.jpg' />
      <div>Profile name</div>
    </div>
  );
}

export default ProfileBubble;
