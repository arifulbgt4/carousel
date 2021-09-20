import React, { useEffect } from 'react';
import { useRecoilValue, RecoilRoot, useSetRecoilState } from 'recoil';
import _isNil from 'lodash/isNil';
import _omit from 'lodash/omit';
import {
  carouselValueState,
  transitionEnabledState,
} from '../../state/atoms/carouselAtoms';
import {
  getCurrentValueSelector,
  transformOffsetSelector,
  nearestSlideSelector,
} from '../../state/selectors/carouselSelectors';

const CarouselWrapper = (props) => {
  const changeSlide = useSetRecoilState(getCurrentValueSelector);
  const value = useRecoilValue(carouselValueState);
  const setTransitionEnabled = useSetRecoilState(transitionEnabledState);

  useEffect(() => {
    if (!_isNil(props.value)) {
      changeSlide(props.value);
    }
  }, [props.value, setTransitionEnabled]);

  const { onChange, value: customValue, ...rest } = props;

  const transformOffset = useRecoilValue(transformOffsetSelector);
  const nearestSlideIndex = useRecoilValue(nearestSlideSelector);

  const carouselProps = Object.entries(rest.breakpoints || {})
    .filter(([resolution]) => window.innerWidth <= resolution)
    .sort(([prevRes], [nextRes]) => nextRes - prevRes)
    .reduce(
      // eslint-disable-next-line no-unused-vars
      (prev, [_, props]) => ({
        ...prev,
        ...props,
      }),
      _omit(rest, ['breakpoints'])
    );

  const isControlled = !_isNil(customValue);

  return <div></div>;
};

const RecoiledComponent = (props) => (
  <RecoilRoot>
    <CarouselWrapper {...props} />
  </RecoilRoot>
);

export default RecoiledComponent;
