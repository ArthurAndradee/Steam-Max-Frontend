import { useState, useEffect } from 'react';
import Header from '../../Components/Headers/Standard/header';
import TitleSlider from '../../Components/Titles-Row/Title-Slider/title-slider';
import { userProfiles } from '../../Database/profiles';
import { Movie } from '../../utils/interfaces';
import './home.css';

function Home() {
  const [romanceMovies, setRomanceMovies] = useState<Movie[]>([]);
  const [fantasyMovies, setFantasyMovies] = useState<Movie[]>([]);
  const [horrorMovies, setHorrorMovies] = useState<Movie[]>([]);

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

    fetchMoviesByCategory('Romance', setRomanceMovies);
    fetchMoviesByCategory('Fantasy', setFantasyMovies);
    fetchMoviesByCategory('Horror', setHorrorMovies);

  }, []);

  console.log(romanceMovies)

  return (
    <div className='home-main'>
      <Header currentProfilePicture={userProfiles[0].userPicture} />
      <div className='mx-5 my-2 ps-4 text-light display-6' style={{fontSize:'1rem'}}>Romance</div>
      <TitleSlider movies={romanceMovies} />
      <div className='mx-5 my-2 ps-4 text-light display-6' style={{fontSize:'1rem'}}>Fantasia</div>
      <TitleSlider movies={fantasyMovies} />
      <div className='mx-5 my-2 ps-4 text-light display-6' style={{fontSize:'1rem'}}>Horror</div>
      <TitleSlider movies={horrorMovies} />
    </div>
  );
}

export default Home;
