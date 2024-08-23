import { useState, useEffect } from 'react';
import Header from '../../Components/Headers/Standard/header';
import { Movie } from '../../utils/interfaces/objects';
import './watchlist,.css'
import { removeFromWatchlist } from '../../utils/functions/watchlist';

function Watchlist() {
    const [watchlist, setWatchlist] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchWatchlist = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
          setError('User not logged in');
          return;
        }
  
        try {
          const response = await fetch('http://localhost:5000/watchlist', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          const data = await response.json();
          if (response.ok) {
            setWatchlist(data.watchlist);
          } else {
            setError(data.message);
          }
        } catch (error) {
          setError('Failed to fetch watchlist');
        }
      };
  
      fetchWatchlist();
    }, []);

    const handleRemove = async (movieId: string) => {
        try {
          await removeFromWatchlist(movieId);
          setWatchlist(prevWatchlist => prevWatchlist.filter(movie => movie._id !== movieId));
        } catch (error) {
          setError('Failed to remove movie from watchlist');
        }
      };

    return (
        <div className='watchlist-main'>
            <Header currentProfilePicture={''} />
            <div className='p-5'>
                <h1>My Watchlist</h1>
                {error && <p className="error">{error}</p>}
                <ul>
                  {watchlist.map(movie => (
                    <li key={movie._id}>
                      <div>
                        <h2>{movie.title}</h2>
                        <button onClick={() => handleRemove(movie._id)}>Remove from Watchlist</button>
                      </div>
                    </li>
                  ))}
                </ul>
            </div>
        </div>
    );
}

export default Watchlist;