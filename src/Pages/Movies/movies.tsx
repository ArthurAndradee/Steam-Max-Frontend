import Header from "../../Components/Headers/Standard/header";
import TitleSlider from "../../Components/Titles-Slider/title-slider";
import { filterMoviesByGenre } from "../../utils/functions/movies";
import { SliderProps } from "../../utils/interfaces/components";
import './movies.css'

function Movies({ movies }: SliderProps) {
    const SciFiMovies = filterMoviesByGenre(movies, 'Sci-Fi');
    const romanceMovies = filterMoviesByGenre(movies, 'Romance');
    const fantasyMovies = filterMoviesByGenre(movies, 'Fantasy');
    const horrorMovies = filterMoviesByGenre(movies, 'Horror');
    const crimeMovies = filterMoviesByGenre(movies, 'Crime');
    const dramaMovies = filterMoviesByGenre(movies, 'Drama');

    return (
        <div className="home-main">
            <Header />

            <div className='mx-5 my-2 ps-4 text-light display-6' style={{ fontSize: '1rem' }}>Sci-Fi</div>
            <TitleSlider movies={SciFiMovies} />

            <div className='mx-5 my-2 ps-4 text-light display-6' style={{ fontSize: '1rem' }}>Romance</div>
            <TitleSlider movies={romanceMovies} />

            <div className='mx-5 my-2 ps-4 text-light display-6' style={{ fontSize: '1rem' }}>Fantasy</div>
            <TitleSlider movies={fantasyMovies} />

            <div className='mx-5 my-2 ps-4 text-light display-6' style={{ fontSize: '1rem' }}>Horror</div>
            <TitleSlider movies={horrorMovies} />

            <div className='mx-5 my-2 ps-4 text-light display-6' style={{ fontSize: '1rem' }}>Crime</div>
            <TitleSlider movies={crimeMovies} />

            <div className='mx-5 my-2 ps-4 text-light display-6' style={{ fontSize: '1rem' }}>Drama</div>
            <TitleSlider movies={dramaMovies} />
        </div>
    );
}

export default Movies;