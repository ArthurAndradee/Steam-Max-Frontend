import Header from '../../Components/Headers/Standard/header';
import TitleSlider from '../../Components/Titles-Slider/title-slider';
import { userProfiles } from '../../Database/profiles';
import { Movie } from '../../utils/interfaces';
import './home.css';

interface HomeProps {
  romanceMovies: Movie[];
  fantasyMovies: Movie[];
  horrorMovies: Movie[];
}

function Home({ romanceMovies, fantasyMovies, horrorMovies }: HomeProps) {
  return (
    <div className='home-main'>
      <Header currentProfilePicture={userProfiles[0].userPicture} />
      <div className='mx-5 my-2 ps-4 text-light display-6' style={{ fontSize: '1rem' }}>Romance</div>
      <TitleSlider movies={romanceMovies} />
      <div className='mx-5 my-2 ps-4 text-light display-6' style={{ fontSize: '1rem' }}>Fantasia</div>
      <TitleSlider movies={fantasyMovies} />
      <div className='mx-5 my-2 ps-4 text-light display-6' style={{ fontSize: '1rem' }}>Horror</div>
      <TitleSlider movies={horrorMovies} />
    </div>
  );
}

export default Home;
