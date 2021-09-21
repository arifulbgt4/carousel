import CarouselWrapper from './components/CarouselWrapper';
import CarouselCard from './components/CarouselCard';
import CarouselFooter from './components/CarouselFooter'
import slidesToShow from './plugins/slidesToShow';
import prof from './assets/prof.png'
import './styles/App.scss';

function App() {
  return (
    <div className='TestCarousel__App'>
      <div className="TestCarousel__profile">
        <img src={prof} alt="prof" />
        <span>Lottie Curtis</span>
      </div>
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
        {/* <img
          src='https://brainhubeu.github.io/react-carousel/static/mona-7a1ceae9bdb8c43272eb101c091c5408.jpg'
          alt=''
        /> */}
        <div className="TestCarousel__Carousel-Card">
          <CarouselCard />
        </div>
        <div className="TestCarousel__Carousel-Card">
          <CarouselCard />
        </div>
        <div className="TestCarousel__Carousel-Card">
          <CarouselCard />
        </div>
        {/* <img
          src='https://brainhubeu.github.io/react-carousel/static/mona-7a1ceae9bdb8c43272eb101c091c5408.jpg'
          alt=''
        />
        <img
          src='https://brainhubeu.github.io/react-carousel/static/mona-7a1ceae9bdb8c43272eb101c091c5408.jpg'
          alt=''
        /> */}
      </CarouselWrapper>
      <CarouselFooter/>
    </div>
  );
}

export default App;
