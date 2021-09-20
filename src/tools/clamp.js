const clamp = (value, slides) => {
  const getChildren = () => {
    if (slides) {
      return slides;
    }
    return [];
  };

  const maxValue = getChildren().length - 1;
  if (value > maxValue) {
    return maxValue;
  }
  if (value < 0) {
    return 0;
  }
  return value;
};

export default clamp;
