import React from 'react';
import '../styles/CarouselCard.scss';
import rock_1 from '../assets/rock_1.png';
const CarouselCard = () => {
  return (
    <div className='TestCarousel__card-wrapper'>
      <img src={rock_1} alt='' />
      <div className="TestCarousel__card-info">
        <h3>Moonstone Keychain</h3>
        <p>Choosing the Best Gemstone for Your Necklace and Jewelry</p>
      </div>
      <button className="TestCarousel__card-viewBtn">View</button>
    </div>
  );
};

export default CarouselCard;
