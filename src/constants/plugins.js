import pluginsFunc from '../plugins';

const { slidesToShow, clickToChange, centered, slidesToScroll } = pluginsFunc;

export const pluginNames = {
  SLIDES_TO_SHOW: 'SLIDESTOSHOW',
  CLICK_TO_CHANGE: 'CLICKTOCHANGE',
  CENTERED: 'CENTERED',
  SLIDES_TO_SCROLL: 'SLIDESTOSCROLL',
};

export const plugins = {
  [pluginNames.SLIDES_TO_SHOW]: slidesToShow,
  [pluginNames.CLICK_TO_CHANGE]: clickToChange,
  [pluginNames.CENTERED]: centered,
  [pluginNames.SLIDES_TO_SCROLL]: slidesToScroll,
};
