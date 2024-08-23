import { useNavigate } from 'react-router-dom';
import { Movie } from '../../utils/interfaces';
import './title-page.css';
import Header from '../../Components/Headers/Standard/header';
import { faHeart, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addToWatchlist } from '../../utils/functions';

function TitlePage(movie: Movie) {
    const navigate = useNavigate();

    const handleAddToWatchlist = () => {
        addToWatchlist(movie);
      };

    return (
        <div className='title-main'>
            <Header currentProfilePicture={''} />
            <div className='px-5 text-light d-flex flex-row'>
                <div className='pt-3'>
                    <button
                        className='title-button btn btn-light'
                        onClick={() => navigate(`/movies/${movie.title.toLowerCase().replace(/\s+/g, '-')}`)}
                    >
                        <FontAwesomeIcon icon={faPlay} className='ps-2' />
                        <div className='ps-2'>Watch now</div>
                    </button>
                    <button
                        onClick={handleAddToWatchlist}
                        className='title-button btn btn-danger mt-2'
                    >
                        <FontAwesomeIcon icon={faHeart} className='ps-1' />
                        <div className='ps-2'>Add to Watchlist</div>
                    </button>
                    <div className='d-flex flex-column pt-3'>
                        <div className='d-flex flex-column'>Cast:
                            {movie.mainCast.map((actor, index) => (
                                <div key={index} className='pt-1' style={{ color: '#a8a8a8' }}>{actor}</div>
                            ))}
                        </div>
                        <div className='pt-3'>Critics Rating: {movie.rating.toFixed(1)}</div>
                        <div className='pt-1' style={{ color: '#a8a8a8' }}>{movie.ageRating}</div>
                    </div>
                </div>
                <div className='d-flex flex-column'>
                    <h3 className='p-3'>{movie.title}</h3>
                    <img className='title-card ms-3' src={movie.banner} alt={movie.title + '-banner'} />
                    <div className='p-3'>{movie.description}</div>
                </div>
            </div>
        </div>
    );
}

export default TitlePage;
