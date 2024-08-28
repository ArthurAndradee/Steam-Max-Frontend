// src/Pages/Home/home.tsx

import Header from '../../Components/Headers/Standard/header';
import TitleSlider from '../../Components/Titles-Slider/title-slider';
import { HomeProps } from '../../utils/interfaces/components';
import { filterMoviesByGenre } from '../../utils/functions/movies'; // Import the function
import './home.css';

function Home({ movies }: HomeProps) {
  const romanceMovies = filterMoviesByGenre(movies, 'Romance');
  const fantasyMovies = filterMoviesByGenre(movies, 'Fantasy');
  const horrorMovies = filterMoviesByGenre(movies, 'Horror');

  return (
    <div className='home-main'>
      <Header/>
      
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
