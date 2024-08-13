import Slider from 'react-slick';
import './title-slider.css';
import { useEffect, useState } from 'react';
import { Movies } from '../../../utils/interfaces';

function TitleSlider({ movies }: Movies) {
  const slidesToShow = window.innerWidth < 650 ? 3 : window.innerWidth < 750 ? 4 : window.innerWidth < 850 ? 5 : window.innerWidth < 950 ? 6 : window.innerWidth < 1150 ? 7 : window.innerWidth < 1366 ? 8 : window.innerWidth < 1440 ? 11 : window.innerWidth < 1640 ? 12 : window.innerWidth < 1840 ? 13 : window.innerWidth < 2040 ? 14 : window.innerWidth < 2240 ? 15 : window.innerWidth < 2440 ? 16 : window.innerWidth < 2540 ? 17 : window.innerWidth < 2640 ? 18 : 20;
  
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow
  };

  return (
    <div className="slider-container mx-5">
      <Slider {...settings} className='mx-4'>
        {movies.map((movie) => (
          <div key={movie.title}>
            <img src={movie.banner} alt={movie.title} className='title-card' />
            <div style={{width:'1px'}} className='border'></div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default TitleSlider;
