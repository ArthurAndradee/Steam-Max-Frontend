import { useState, useEffect } from 'react';
import Header from '../../Components/Headers/Standard/header';
import { Movie } from '../../utils/interfaces/objects';
import { Link } from 'react-router-dom';
import { fetchWatchlist } from '../../utils/functions/watchlist'
import './watchlist.css';

function Watchlist() {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWatchlist = async () => {
      try {
        const watchlistData = await fetchWatchlist();
        setWatchlist(watchlistData);
      } catch (error) {
        setError('Failed to fetch watchlist');
      }
    };

    loadWatchlist();
  }, []);

  return (
    <div className='watchlist-main'>
      <Header currentProfilePicture={''} />
      <div className='p-5'>
        <h1 className='display-6 text-light mb-4'>My Watchlist</h1>
        {error && <p className="error">{error}</p>}
        <div className='watchlist-grid'>
          {watchlist.map(movie => (
            <Link to={`/titles/${movie.title}`} key={movie.title}>
              <img src={movie.banner} alt={movie.title} className="watchlist-title-card" />
              <div style={{ width: '0px' }} className="border"></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Watchlist;
