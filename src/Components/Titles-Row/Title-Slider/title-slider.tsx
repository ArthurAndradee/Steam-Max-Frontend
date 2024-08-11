import Slider from 'react-slick';
import './title-slider.css';
import { movies } from '../../../Database/movies';
import { useEffect, useState } from 'react';

function TitleSlider() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slidesToShow = windowWidth < 580 ? 3 : windowWidth < 700 ? 4 : windowWidth < 820 ? 5 : windowWidth < 950 ? 6 : windowWidth < 1150 ? 7 : windowWidth < 1366 ? 8 : windowWidth < 1640 ? 9 : 10;
  
  const settings = {
    className: "center",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow
  };

  return (
    <div className="slider-container mx-5">
      <Slider {...settings} className='mx-4'>
      {movies.map((movie) => (
          <div >
            <img src={movie.banner} alt={movie.title} className='title-card' />
            <div style={{width:'1px'}} className='border'></div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default TitleSlider;
