import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../../utils/interfaces/objects';
import { addToWatchlist, removeFromWatchlist, fetchWatchlist } from '../../utils/requests/watchlist-requests';
import './title-page.css';
import { faPlay, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../../Components/Headers/Standard/header';

function TitlePage(currentMovie: Movie) {
  const navigate = useNavigate();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const currentProfile = localStorage.getItem('selectedProfile')

  useEffect(() => {
    const checkWatchlist = async () => {
      if(currentProfile)
      try {
        const watchlist = await fetchWatchlist(currentProfile);
        const movieInWatchlist = watchlist.some((movie: Movie) => movie._id === currentMovie._id);
        setIsInWatchlist(movieInWatchlist);
      } catch (error) {
        console.log(error)
      }
    };

    checkWatchlist();
  }, [currentMovie._id, currentProfile]);

  const handleAddToWatchlist = async () => {
    console.log(isInWatchlist)
    if(currentProfile)
    try {
      setIsInWatchlist(true);
      await addToWatchlist(currentProfile, currentMovie);
    } catch (error) {
      console.log(error)
    }
  };

  const handleRemoveFromWatchlist = async () => {
    console.log(isInWatchlist)
    if(currentProfile)
    try {
      setIsInWatchlist(false);
      await removeFromWatchlist(currentProfile,currentMovie._id);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className='title-main'>
      <Header />
      <div className='px-5 text-light d-flex flex-row'>
        <div className='pt-3'>
          <button
            className='title-button btn btn-light d-flex'
            onClick={() => navigate(`/movies/${currentMovie.title.toLowerCase().replace(/\s+/g, '-')}`)}
          >
            <FontAwesomeIcon icon={faPlay} className='ps-2' />
            <div className='ps-2'>Watch now</div>
          </button>
          {isInWatchlist ? (
            <button onClick={handleRemoveFromWatchlist} className='title-button btn btn-danger mt-2 d-flex'>
              <FontAwesomeIcon icon={faHeart} className='ps-1' />
              <div className='ps-2'>Remove from Watchlist</div>
            </button>
          ) : (
            <button onClick={handleAddToWatchlist} className='title-button btn btn-danger mt-2 d-flex'>
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
          <img className='title-page-title-card ms-3' src={currentMovie.banner} alt={currentMovie.title + '-banner'} />
          <div className='p-3'>{currentMovie.description}</div>
        </div>
      </div>
    </div>
  );
}

export default TitlePage;
