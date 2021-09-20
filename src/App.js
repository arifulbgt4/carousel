import CarouselWrapper from './components/CarouselWrapper/CarouselWrapper';

import { slidesToShow } from './constants/plugins';

import './App.css';

function App() {
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
      >
        <img
          src='https://brainhubeu.github.io/react-carousel/static/mona-7a1ceae9bdb8c43272eb101c091c5408.jpg'
          alt=''
        />
        <img
          src='https://brainhubeu.github.io/react-carousel/static/mona-7a1ceae9bdb8c43272eb101c091c5408.jpg'
          alt=''
        />
        <img
          src='https://brainhubeu.github.io/react-carousel/static/mona-7a1ceae9bdb8c43272eb101c091c5408.jpg'
          alt=''
        />
        <img
          src='https://brainhubeu.github.io/react-carousel/static/mona-7a1ceae9bdb8c43272eb101c091c5408.jpg'
          alt=''
        />
      </CarouselWrapper>
    </div>
  );
}

export default App;
