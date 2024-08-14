import { TrailerPlayerProps } from '../../utils/interfaces';

function TrailerPlayer({ trailerUrl, title }: TrailerPlayerProps) {
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

export default TrailerPlayer;
