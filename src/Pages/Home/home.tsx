import Header from '../../Components/Headers/Standard/header';
import TitleSlider from '../../Components/Titles-Slider/title-slider';
import { SliderProps } from '../../utils/interfaces/components';
import { filterMoviesByGenre, getRandomMovie } from '../../utils/functions/movies';
import './home.css';
import { useNavigate } from 'react-router';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Home({ movies }: SliderProps) {
  const navigate = useNavigate()

  const romanceMovies = filterMoviesByGenre(movies, 'Romance');
  const fantasyMovies = filterMoviesByGenre(movies, 'Fantasy');
  const horrorMovies = filterMoviesByGenre(movies, 'Horror');

  const randomMovie = getRandomMovie({ movies });

  return (
    <div>
      <Header/>

      {randomMovie && 
        <div className='shaded-background random-movie-section' style={{backgroundImage: `url(${randomMovie.banner})`}}>
          <div className='display-4'>{randomMovie.title}</div>
          <div className='fs-5 py-5'>{randomMovie.description}</div>
          <button
            className='title-button btn btn-light d-flex'
            onClick={() => navigate(`/titles/${randomMovie.title}`)}
          >
            <FontAwesomeIcon icon={faPlay} className='ps-2' />
            <div className='ps-4'>Watch now</div>
          </button>
        </div>
      }
      
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
