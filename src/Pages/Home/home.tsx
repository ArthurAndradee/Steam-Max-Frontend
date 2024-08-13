import { useState, useEffect } from 'react';
import Header from '../../Components/Headers/Standard/header';
import TitleSlider from '../../Components/Titles-Row/Title-Slider/title-slider';
import { userProfiles } from '../../Database/profiles';
import { Movie } from '../../utils/interfaces';
import './home.css';

function Home() {
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [sciFiMovies, setSciFiMovies] = useState<Movie[]>([]);
  const [dramaMovies, setDramaMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMoviesByCategory = async (category: string, setMovies: React.Dispatch<React.SetStateAction<Movie[]>>) => {
      try {
        const response = await fetch(`http://localhost:5000/movies/${category}`);
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error(`Error fetching ${category} movies:`, error);
      }
    };

    fetchMoviesByCategory('Action', setActionMovies);
    fetchMoviesByCategory('Sci-Fi', setSciFiMovies);
    fetchMoviesByCategory('Drama', setDramaMovies);

  }, []);

  console.log(actionMovies)

  return (
    <div className='home-main'>
      <Header currentProfilePicture={userProfiles[0].userPicture} />
      <div className='mx-5 my-2 ps-4 text-light display-6'>Action</div>
      <TitleSlider movies={actionMovies} />
      <TitleSlider movies={sciFiMovies} />
      <TitleSlider movies={dramaMovies} />
    </div>
  );
}

export default Home;
