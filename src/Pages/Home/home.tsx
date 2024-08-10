import Header from '../../Components/Headers/Standard/header';
import TitleSlider from '../../Components/Titles-Row/Title-Slider/title-slider';
import { userProfiles } from '../../Database/profiles';
import './home.css';

function Home() {
  return (
    <div className='home-main'>
      <Header currentProfilePicture={userProfiles[0].userPicture} />
      <TitleSlider />
    </div>
  );
}

export default Home;
