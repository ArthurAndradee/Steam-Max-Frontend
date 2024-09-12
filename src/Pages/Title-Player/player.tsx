import { useState, useEffect } from 'react';
import { PlayerProps } from '../../utils/interfaces/components';
import { Video } from "reactjs-media";
import './player.css';

function Player({ trailerUrl, title, banner }: PlayerProps) {
    const [isCursorMoving, setIsCursorMoving] = useState(true);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const handleMouseMove = () => {
            setIsCursorMoving(true);

            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setIsCursorMoving(false);
            }, 1500);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="trailer-container">
            <div className="trailer-player">
                <h2 className={`text-light display-3 ps-4 pt-4 player-title ${isCursorMoving ? 'visible' : 'hidden'}`}>{title}</h2>
                <div className="video-container my-5">
                <Video
                    src={trailerUrl}
                    controls={true}
                    height={1080}
                    width={1920}
                    poster={banner}
                />
                </div>
            </div>
        </div>
    );
}

export default Player;
