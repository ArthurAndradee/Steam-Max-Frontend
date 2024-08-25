import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../../utils/interfaces/objects';
import { addToWatchlist, removeFromWatchlist, fetchWatchlist } from '../../utils/functions/watchlist';
import './title-page.css';
import { faPlay, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../../Components/Headers/Standard/header';

function TitlePage(currentMovie: Movie) {
  const navigate = useNavigate();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentProfile = localStorage.getItem('selectedProfile')

  useEffect(() => {
    const checkWatchlist = async () => {
      if(currentProfile)
      try {
        const watchlist = await fetchWatchlist(currentProfile);
        const movieInWatchlist = watchlist.some((movie: Movie) => movie._id === currentMovie._id);
        setIsInWatchlist(movieInWatchlist);
      } catch (error) {
        setError(JSON.stringify(error));
      }
    };

    checkWatchlist();
  }, [currentMovie._id, currentProfile]);

  const handleAddToWatchlist = async () => {
    if(currentProfile)
    try {
      await addToWatchlist(currentProfile, currentMovie);
      setIsInWatchlist(true);
    } catch (error) {
      setError('Failed to add movie to watchlist');
    }
  };

  const handleRemoveFromWatchlist = async () => {
    if(currentProfile)
    try {
      await removeFromWatchlist(currentProfile,currentMovie._id);
      setIsInWatchlist(false);
    } catch (error) {
      setError('Failed to remove movie from watchlist');
    }
  };

  return (
    <div className='title-main'>
      <Header />
      <div className='px-5 text-light d-flex flex-row'>
        <div className='pt-3'>
          <button
            className='title-button btn btn-light'
            onClick={() => navigate(`/movies/${currentMovie.title.toLowerCase().replace(/\s+/g, '-')}`)}
          >
            <FontAwesomeIcon icon={faPlay} className='ps-2' />
            <div className='ps-2'>Watch now</div>
          </button>
          {isInWatchlist ? (
            <button onClick={handleRemoveFromWatchlist} className='title-button btn btn-danger mt-2'>
              <FontAwesomeIcon icon={faHeart} className='ps-1' />
              <div className='ps-2'>Remove from Watchlist</div>
            </button>
          ) : (
            <button onClick={handleAddToWatchlist} className='title-button btn btn-danger mt-2'>
              <FontAwesomeIcon icon={faHeart} className='ps-1' />
              <div className='ps-2'>Add to Watchlist</div>
            </button>
          )}
          <div className='d-flex flex-column pt-3'>
            <div className='d-flex flex-column'>Cast:
              {currentMovie.mainCast.map((actor, index) => (
                <div key={index} className='pt-1' style={{ color: '#a8a8a8' }}>{actor}</div>
              ))}
            </div>
            <div className='pt-3'>Critics Rating: {currentMovie.rating.toFixed(1)}</div>
            <div className='pt-1' style={{ color: '#a8a8a8' }}>{currentMovie.ageRating}</div>
          </div>
        </div>
        <div className='d-flex flex-column'>
          <h3 className='p-3'>{currentMovie.title}</h3>
          <img className='title-card ms-3' src={currentMovie.banner} alt={currentMovie.title + '-banner'} />
          <div className='p-3'>{currentMovie.description}</div>
        </div>
      </div>
    </div>
  );
}

export default TitlePage;
