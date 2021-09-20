import { atom } from 'recoil';

export const activeSlideIndexState = atom({
  key: '@carousel/activeSlideIndexState',
  default: 0,
});

export const slideWidthState = atom({
  key: '@carousel/itemWidthState',
  default: 0,
});

export const slideOffsetState = atom({
  key: '@carousel/itemOffsetState',
  default: 0,
});

export const slidesState = atom({
  key: '@carousel/slidesState',
  default: [],
});
