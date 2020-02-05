(function () {
  const configs = {
    prefix: 'lh', 
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
  const lyt = new Layouter(configs);
  console.log('lyt.breakPoints: ', lyt.breakPoints);
  console.log('lyt.sizes:', lyt.sizes);
  console.log('lyt.cols: ', lyt.cols);

  const myDiv = document.querySelector('div');
  console.log('lyt.getParameters', lyt.getParameters(myDiv));

  lyt.setCols(myDiv);
}());