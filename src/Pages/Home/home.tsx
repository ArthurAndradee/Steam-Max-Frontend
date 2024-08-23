import Header from '../../Components/Headers/Standard/header';
import TitleSlider from '../../Components/Titles-Slider/title-slider';
import { userProfiles } from '../../Database/profiles';
import { Movie } from '../../utils/interfaces/objects';
import { HomeProps } from '../../utils/interfaces/components';
import './home.css';

function Home({ movies }: HomeProps) {
  const filterMoviesByGenre = (genre: string): Movie[] => {
    return movies.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
  };

  const romanceMovies = filterMoviesByGenre('Romance');
  const fantasyMovies = filterMoviesByGenre('Fantasy');
  const horrorMovies = filterMoviesByGenre('Horror');

  return (
    <div className='home-main'>
      <Header currentProfilePicture={userProfiles[0].userPicture} />
      
      <div className='mx-5 my-2 ps-4 text-light display-6' style={{ fontSize: '1rem' }}>Romance</div>
      <TitleSlider movies={romanceMovies} />

      <div className='mx-5 my-2 ps-4 text-light display-6' style={{ fontSize: '1rem' }}>Fantasy</div>
      <TitleSlider movies={fantasyMovies} />

      <div className='mx-5 my-2 ps-4 text-light display-6' style={{ fontSize: '1rem' }}>Horror</div>
      <TitleSlider movies={horrorMovies} />
    </div>
  );
}

export default Home;
