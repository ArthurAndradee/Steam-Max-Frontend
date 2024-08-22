import { useSelector } from 'react-redux';
import Header from '../../Components/Headers/Standard/header';
import { RootState } from '../../store/store';
import './watchlist,.css'

function Watchlist() {
    const watchlist = useSelector((state: RootState) => state.watchlist.movies);

    return (
        <div className='watchlist-main'>
            <Header currentProfilePicture={''} />
            <div className='p-5'>
            {watchlist.map((movie) => (
                <div key={movie.title}>{movie.title}</div>
            ))}
            </div>
        </div>
    );
}

export default Watchlist;