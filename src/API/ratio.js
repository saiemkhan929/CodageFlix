const ratio = (w = 4, h = 3) => {
  let tempWidth = window.screen.width / w;

  return {
    width: window.screen.width,
    height: tempWidth * h,
  };
};

export default ratio;
