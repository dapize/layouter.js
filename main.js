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
  console.log('layout.breakPoints: ', layout.breakPoints);
  console.log('layout.sizes:', layout.sizes);
  console.log('layout.cols: ', layout.cols);

  const myDiv = document.querySelector('div');
  console.log('layout.getParameters', layout.getParameters(myDiv));

  /*
  // Columns
  layout.setCols(myDiv);

  // Paddings
  layout.setPads(myDiv);

  // Margins
  layout.setMars(myDiv);

  // Flex
  layout.setFlex(myDiv);
  */

  // Procesar todo
  layout.build(myDiv);

  layout.build(document.querySelectorAll('div')[1]);

  console.dir(layout.styles);
}());