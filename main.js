(function () {
  const configs = {
    breakPoints: {
      xs: {
        width: 320,
        cols: 15,
        direct: true
      },
      sm: {
        width: 768,
        cols: 31
      },
      md: {
        width: 1024,
        cols: 31
      },
      lg: {
        width: 1280,
        cols: 31
      }
    }
  };
  const layout = new Layouter(configs);
  const main = document.querySelector('.main');
  layout.setFlex(main);
}());

