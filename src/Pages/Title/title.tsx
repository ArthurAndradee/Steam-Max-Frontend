import { useNavigate } from 'react-router-dom';
import { Movie } from '../../utils/interfaces';
import './title.css'
import Header from '../../Components/Headers/Standard/header';
import { faHeart, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TitlePage(movie: Movie) {
    const navigate = useNavigate()

    return (
        <div className='title-main'>
            <Header currentProfilePicture={''} />
            <div className='px-5 text-light d-flex flex-row'>
                <div className='pt-3'>
                    <button className='title-button btn btn-light' onClick={() => navigate(`/movies/${movie.title.toLowerCase().replace(/\s+/g, '-')}`)}>
                        <FontAwesomeIcon icon={faPlay} className='ps-2'/>
                        <div className='ps-2'>Watch now</div>
                    </button>
                    <button className='title-button btn btn-light mt-2' >
                        <FontAwesomeIcon icon={faHeart} className='ps-2' />
                        <div className='ps-2'>Add to Watchlist</div>
                    </button>
                    <div className='d-flex flex-column pt-3'>
                        <div className='d-flex flex-column'>Cast: 
                            {movie.mainCast.map((actor) => (
                                <div className='pt-1' style={{color:'#a8a8a8'}}>{actor}</div>
                            ))}
                        </div>
                        <div className='pt-3'>Critics Rating: {movie.rating.toFixed(1)}</div>
                        <div className='pt-1' style={{color:'#a8a8a8'}}>{movie.ageRating}</div>
                    </div>
                </div>
                <div className='d-flex flex-column'>
                    <h3 className='p-3'>{movie.title}</h3>
                    <div className='p-3'>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</div>
                </div>
            </div>
        </div>
    );
}

export default TitlePage;