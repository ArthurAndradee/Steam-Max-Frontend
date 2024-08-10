import Header from '../../Components/Headers/Standard/header';
import { userProfiles } from '../../Database/profiles';
import './home.css';

function Home() {
  return (
    <div className='home-main'>
      <Header currentProfilePicture={userProfiles[0].userPicture} />
    </div>
  );
}

export default Home;
