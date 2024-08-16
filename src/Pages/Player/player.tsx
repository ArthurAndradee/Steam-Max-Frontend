import { useState, useEffect } from 'react';
import { PlayerProps } from '../../utils/interfaces';
import './player.css';

function Player({ trailerUrl, title }: PlayerProps) {
    const [isCursorMoving, setIsCursorMoving] = useState(true);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const handleMouseMove = () => {
            setIsCursorMoving(true);

            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setIsCursorMoving(false);
            }, 2500);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="trailer-player">
            <h2 className={`text-light display-3 ps-3 pt-3 player-title ${isCursorMoving ? 'visible' : 'hidden'}`}>{title}</h2>
            <div className="video-container justify-content-center my-5">
                <video controls width="100%">
                    <source src={trailerUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
}

export default Player;
