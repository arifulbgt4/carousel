import { useEffect, useRef } from 'react';
import _throttle from 'lodash/throttle';

const useOnResize = ({
  width,
  carouselRef,
  setItemWidth,
  trackContainerRef,
}) => {
  const isInitialMount = useRef(true);
  const onResize = _throttle(() => {
    if (!carouselRef || !trackContainerRef) {
      return;
    }

    setItemWidth(trackContainerRef.current.offsetWidth);
  }, 300);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      onResize();
    }
  }, [width, trackContainerRef.current]);
};

export default useOnResize;
