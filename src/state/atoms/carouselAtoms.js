import { atom } from 'recoil';

export const slideMovementState = atom({
  key: '@carousel/slideMovementState',
  default: {
    clicked: null,
    dragStart: null,
    dragEnd: null,
    dragOffset: 0,
  },
});

export const transitionEnabledState = atom({
  key: '@carousel/transitionEnabledState',
  default: false,
});

export const carouselStrategiesState = atom({
  key: '@carousel/carouselStrategiesState',
  default: [],
});

export const carouselValueState = atom({
  key: '@carousel/carouselValueState',
  default: 0,
});
