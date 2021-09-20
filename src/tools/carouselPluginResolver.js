import { useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import _flatten from 'lodash/flatten';
import _sortBy from 'lodash/sortBy';

import { slideOffsetState, slideWidthState } from '../state/atoms/slideAtoms';

import useEventListener from '../hooks/useEventListener';

const defaultOptions = {
  numberOfSlides: 3,
};

const slidesToShow = ({ carouselProps, refs, options = defaultOptions }) => ({
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

const centered = ({ refs }) => ({
  name: 'CENTERED',
  strategies: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const itemWidth = useRecoilValue(slideWidthState);
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

const carouselPluginResolver = (
  plugins,
  carouselProps,
  trackContainerRef,
  carouselRef
) => {
  const carouselPlugins = carouselProps?.plugins.map((plugin) => {
    if (typeof plugin === 'string') {
      return (
        centered &&
        centered({
          carouselProps: {
            ...carouselProps,
            children: carouselProps.children
              ? carouselProps.children
              : carouselProps.slides,
          },
          options: plugin.options,
          refs: { trackContainerRef, carouselRef },
        })
      );
    }
    return plugin.resolve({
      carouselProps,
      options: plugin.options,
      refs: { trackContainerRef, carouselRef },
    });
  });
  const itemClassNames = _flatten(
    carouselPlugins.map(
      (plugin) =>
        plugin.itemClassNames &&
        plugin.itemClassNames({
          carouselProps,
          options: plugin.options,
          refs: { trackContainerRef, carouselRef },
        })
    )
  ).filter((className) => typeof className === 'string');

  const carouselClassNames = _flatten(
    carouselPlugins.map(
      (plugin) =>
        plugin.carouselClassNames &&
        plugin.carouselClassNames({
          carouselProps,
          options: plugin.options,
          refs: { trackContainerRef, carouselRef },
        })
    )
  ).filter((className) => typeof className === 'string');

  const carouselCustomProps = Object.assign(
    {},
    ...carouselPlugins.map(
      (plugin) => plugin.carouselCustomProps && plugin.carouselCustomProps()
    )
  );

  const trackCustomProps = Object.assign(
    {},
    ...carouselPlugins.map(
      (plugin) => plugin.trackCustomProps && plugin.trackCustomProps()
    )
  );

  const slideCustomProps = Object.assign(
    {},
    ...carouselPlugins.map(
      (plugin) => plugin.slideCustomProps && plugin.slideCustomProps()
    )
  );

  const beforeCarouselItems =
    carouselPlugins.map(
      (plugin) => plugin.beforeCarouselItems && plugin.beforeCarouselItems()
    ) || [];

  const afterCarouselItems =
    carouselPlugins.map(
      (plugin) => plugin.afterCarouselItems && plugin.afterCarouselItems()
    ) || [];

  const strategies = _sortBy(carouselPlugins, (plugin) =>
    ['CENTERED'].indexOf(plugin.name)
  ).map((plugin) => plugin.strategies && plugin.strategies());

  return {
    itemClassNames,
    carouselClassNames,
    beforeCarouselItems,
    afterCarouselItems,
    strategies,
    carouselCustomProps,
    trackCustomProps,
    slideCustomProps,
    carouselPlugins,
  };
};

export default carouselPluginResolver;
