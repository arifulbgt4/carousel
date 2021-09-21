import React from 'react';
import '../styles/CarouselFooter.scss';
import IconWearables from '../assets/IconWearables';
import IconFace from '../assets/IconFace';
import IconHelp from '../assets/IconHelp';
const CarouselFooter = () => {
  return (
    <div className='TestCarouselItem__Footer'>
      <ul>
        <li>
          <IconWearables />
          <span className='active'>Wearables</span>
        </li>
        <li>
          <IconFace />
          <span className='inactive'>Profile</span>
        </li>
        <li>
          <IconHelp />
          <span className='inactive'>Help</span>
        </li>
      </ul>
    </div>
  );
};

export default CarouselFooter;
