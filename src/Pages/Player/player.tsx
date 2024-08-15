import { PlayerProps } from '../../utils/interfaces';
import './player.css'

function Player({ trailerUrl, title }: PlayerProps) {
    return (
        <div className="trailer-player">
            <h2>{title}</h2>
            <video controls width="100%">
              <source src={trailerUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default Player;