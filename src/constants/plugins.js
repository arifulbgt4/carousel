import { useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { slideOffsetState, slideWidthState } from '../state/atoms/slideAtoms';
import useEventListener from '../hooks/useEventListener';
export const centered = ({ refs }) => ({
  name: 'CENTERED',
  strategies: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const itemWidth = useRecoilValue(slideWidthState);
    console.log('itemWidth',itemWidth);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const itemOffset = useRecoilValue(slideOffsetState);
    const trackContainerWidth = refs.trackContainerRef?.current?.offsetWidth;

    return {
      GET_TRANSFORM_OFFSET: (originalValue, prevValue) => {
        const elementWidthWithOffset = itemWidth + itemOffset;
        const additionalOffset =
          trackContainerWidth / 2 - elementWidthWithOffset / 2;
        return prevValue + additionalOffset;
      },
    };
  },
});

const defaultOptions = {
  numberOfSlides: 3,
};


export const slidesToShow = ({ carouselProps, refs, options = defaultOptions }) => ({
  name: 'SLIDESTOSHOW',
  plugin: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isInitialMount = useRef(true);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const setItemWidth = useSetRecoilState(slideWidthState);

    const onResize = () => {
      setItemWidth(
        refs.trackContainerRef.current.offsetWidth / options.numberOfSlides
      );
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
      } else {
        onResize();
      }
    }, [carouselProps.width, refs.trackContainerRef.current]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEventListener('load', onResize);
  },
});
