import { Link } from 'react-router-dom';
import { Movie } from '../../utils/interfaces';
import './title.css'

function TitlePage(movie: Movie) {

    return (
        <div className='d-flex flex-column'>
            <div className='d-flex flex-row'>
                <div><Link to={`/movies/${movie.title.toLowerCase().replace(/\s+/g, '-')}`}>Watch</Link></div>
            </div>

            <div className='d-flex flex-row'>
                <div className='p-3'>{movie.title}</div>
                <div className='p-3'>{movie.ageRating}</div>
            </div>
            <div className='p-3'>{movie.description}</div>
            <div className='d-flex flex-row p-3'>
                <div className='d-flex flex-column'>Cast: 
                    {movie.mainCast.map((actor) => (
                        <div>{actor}</div>
                    ))}
                </div>
                <div>Rating: {movie.rating}</div>
            </div>
        </div>
    );
}

export default TitlePage;