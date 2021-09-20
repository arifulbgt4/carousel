import React, { useRef, useCallback, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { withResizeDetector } from 'react-resize-detector';
import classnames from 'classnames';
import _compact from 'lodash/compact';

import getChildren from '../../tools/getChildren';
import simulateEvent from '../../tools/simulateEvent';
import carouselPluginResolver from '../../tools/carouselPluginResolver';
import useOnResize from '../../hooks/useOnResize';
import useEventListener from '../../hooks/useEventListener';
import {
  slideMovementState,
  trackWidthState,
  transitionEnabledState,
  trackStylesState,
  carouselStrategiesState,
} from '../../state/atoms/carouselAtoms';
import {
  slideWidthState,
  slideOffsetState,
  activeSlideIndexState,
  slidesState,
} from '../../state/atoms/slideAtoms';

import CarouselSlide from '../CarouselSlide/CarouselSlide';

import '../../styles/Carousel.scss';

const Carousel = (props) => {
  const {
    children: child,
    slides: slide,
    width,
    offset,
    value,
    transformOffset,
  } = props;
  const [slideMovement, setSlideMovement] = useRecoilState(slideMovementState);
  const [itemWidth, setItemWidth] = useRecoilState(slideWidthState);
  const setItemOffset = useSetRecoilState(slideOffsetState);
  const [trackWidth, setTrackWidth] = useRecoilState(trackWidthState);
  const [activeSlideIndex] = useRecoilState(activeSlideIndexState);
  const [transitionEnabled, setTransitionEnabled] = useRecoilState(
    transitionEnabledState
  );
  const [trackStyles, setTrackStyles] = useRecoilState(trackStylesState);

  const children = getChildren(child, slide);

  const [slides, setSlides] = useRecoilState(slidesState);
  const setStrategies = useSetRecoilState(carouselStrategiesState);

  const isInitialMount = useRef(true);
  const carouselRef = useRef(null);
  const trackContainerRef = useRef(null);

  const {
    carouselPlugins,
    itemClassNames,
    carouselClassNames,
    beforeCarouselItems,
    afterCarouselItems,
    strategies,
    carouselCustomProps,
    trackCustomProps,
    slideCustomProps,
  } = carouselPluginResolver(
    props.plugins,
    props,
    trackContainerRef,
    carouselRef
  );

  // setStrategies(strategies);

  // Event
  const onMouseMove = useCallback(
    (event) => {
      const { pageX } = event;
      if (slideMovement.dragStart !== null) {
        setSlideMovement((previousState) => ({
          ...slideMovement,
          dragOffset: pageX - previousState.dragStart,
          dragEnd: pageX,
        }));
      }
    },

    [slideMovement, setTransitionEnabled]
  );

  // Event
  const onMouseDown = useCallback(
    (event, index) => {
      event.preventDefault();
      event.stopPropagation();
      setTransitionEnabled(false);
      const { pageX } = event;

      setSlideMovement({
        ...slideMovement,
        clicked: index,
        dragStart: pageX,
      });
    },
    [slideMovement, setTransitionEnabled]
  );

  // Event
  const onTouchStart = useCallback((event, index) => {
    const { changedTouches } = event;
    setSlideMovement({
      clicked: index,
      dragStart: changedTouches[0].pageX,
    });
  }, []);

  const onMouseUpTouchEnd = useCallback(() => {
    if (slideMovement.dragStart !== null) {
      props.onChange(props.nearestSlideIndex);
      setSlideMovement({
        clicked: null,
        dragOffset: 0,
        dragStart: null,
        dragEnd: null,
      });
    }
    setTransitionEnabled(true);
  }, [setTransitionEnabled, setSlideMovement, slideMovement]);

  useOnResize({
    carouselRef,
    itemWidth,
    setItemWidth,
    trackContainerRef,
    width: width,
  });

  useEffect(() => {
    setSlides(children);
  }, [children]);

  useEffect(() => {
    setItemOffset(offset);
  }, [offset]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setTransitionEnabled(true);
    }
  }, [value]);

  useEffect(() => {
    const trackWidth = width * children.length;

    setTrackWidth(trackWidth);
  }, [width]);

  useEffect(() => {
    setTrackStyles({
      ...trackStyles,
      transform: transformOffset,
    });
  }, [transformOffset]);

  useEventListener('mouseup', onMouseUpTouchEnd, {
    passive: true,
    capture: true,
  });

  useEventListener(
    'touchstart',
    simulateEvent,
    { passive: true, capture: true },
    carouselRef.current
  );
  useEventListener('touchmove', simulateEvent, carouselRef.current);
  useEventListener(
    'touchend',
    simulateEvent,
    { passive: true, capture: true },
    carouselRef.current
  );

  carouselPlugins?.forEach((plugin) =>
    typeof plugin === 'function' ? plugin() : plugin.plugin && plugin.plugin()
  );

  /* ========== rendering ========== */
  const renderCarouselItems = () => {
    const animationSpeed = props.animationSpeed;
    const draggable = props.draggable && children && children.length > 1;

    const currentTrackStyles = {
      width: `${trackWidth}px`,
      transitionDuration: transitionEnabled
        ? `${animationSpeed}ms, ${animationSpeed}ms`
        : null,
      transform: `translateX(${trackStyles.transform}px)`,
      marginLeft: `${trackStyles.marginLeft}px`,
      marginRight: `${trackStyles.marginRight}px`,
    };

    return (
      <div className='BrainhubCarousel__trackContainer' ref={trackContainerRef}>
        <ul
          className={classnames('BrainhubCarousel__track', {
            'BrainhubCarousel__track--transition': transitionEnabled,
            'BrainhubCarousel__track--draggable': draggable,
          })}
          style={currentTrackStyles}
          {...trackCustomProps}
        >
          {_compact(slides).map((carouselSlide, index) => (
            <CarouselSlide
              clickable
              key={index}
              currentSlideIndex={activeSlideIndex || props.value}
              index={index}
              width={props.itemWidth || itemWidth}
              offset={index !== slides.length ? props.offset : 0}
              onMouseDown={onMouseDown}
              onTouchStart={onTouchStart}
              isDragging={Math.abs(slideMovement.dragOffset) > 10}
              itemClassNames={itemClassNames}
              isDraggingEnabled={props.draggable}
              {...slideCustomProps}
            >
              {carouselSlide}
            </CarouselSlide>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className='BrainhubCarousel__container'>
      <div
        className={classnames(
          'BrainhubCarousel',
          props.className,
          ...(carouselClassNames || [])
        )}
        onMouseMove={onMouseMove}
        ref={carouselRef}
        {...carouselCustomProps}
      >
        {React.createElement(React.Fragment, null, beforeCarouselItems)}
        {renderCarouselItems()}
        {React.createElement(React.Fragment, null, afterCarouselItems)}
      </div>
    </div>
  );
};

export default Carousel;
