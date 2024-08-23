import Slider from 'react-slick';
import './title-slider.css';
import { Link } from 'react-router-dom';
import { Movies } from '../../utils/interfaces/objects';
import { useState, useEffect } from 'react';

function TitleSlider({ movies }: Movies) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const slidesToShow = windowWidth < 650 ? 3 : windowWidth < 750 ? 4 : windowWidth < 850 ? 5 : windowWidth < 950 ? 6 : windowWidth < 1150 ? 7 : windowWidth < 1366 ? 8 : windowWidth < 1440 ? 11 : windowWidth < 1640 ? 12 : windowWidth < 1840 ? 13 : windowWidth < 2040 ? 14 : windowWidth < 2240 ? 15 : windowWidth < 2440 ? 16 : windowWidth < 2540 ? 17 : windowWidth < 2640 ? 18 : 20;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow:   slidesToShow,
    slidesToScroll: slidesToShow,
  };

  return (
    <div className="slider-container mx-5">
      <Slider {...settings} className="mx-4">
        {movies.map((movie) => (
          <Link to={`/titles/${movie.title}`} key={movie.title}>
            <img src={movie.banner} alt={movie.title} className="title-card" />
            <div style={{ width: '1px' }} className="border"></div>
          </Link>
        ))}
      </Slider>
    </div>
  );
}

export default TitleSlider;
