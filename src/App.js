import { useState } from 'react';
import CarouselWrapper from './components/CarouselWrapper';
import CarouselDots from './components/CarouselDots';

import slidesToShow from './plugins/slidesToShow';

// import './App.css';

function App() {
  const [value, setValue] = useState(0);

  const slides = [
    <img
      src='https://brainhubeu.github.io/react-carousel/static/mona-7a1ceae9bdb8c43272eb101c091c5408.jpg'
      alt=''
    />,
    <img
      src='https://brainhubeu.github.io/react-carousel/static/mona-7a1ceae9bdb8c43272eb101c091c5408.jpg'
      alt=''
    />,
    <img
      src='https://brainhubeu.github.io/react-carousel/static/mona-7a1ceae9bdb8c43272eb101c091c5408.jpg'
      alt=''
    />,
  ];

  return (
    <div className='App'>
      <CarouselWrapper
        plugins={[
          'centered',
          {
            resolve: slidesToShow,
            options: {
              numberOfSlides: 2,
            },
          },
        ]}
        slides={slides}
        value={value}
        onChange={(v) => setValue(v)}
      />
      <CarouselDots
        value={value}
        onChange={(v) => setValue(v)}
        number={slides?.length}
      />
    </div>
  );
}

export default App;
