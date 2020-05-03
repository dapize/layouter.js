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
    },
    bridge: false
  };
  const layout = new Layouter(configs);
  console.log('layout.breakPoints: ', layout.breakPoints);
  console.log('layout.sizes:', layout.sizes);
  console.log('layout.cols: ', layout.cols);
  const myDiv = document.querySelector('.my-div');
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
  console.dir(layout.styles);

  // Title
  Array.prototype.forEach.call(document.querySelectorAll('h3'), function (title) {
    layout.build(title);
  });

  // BOX LIST
  layout.build(document.querySelector('.box-list'))
  Array.prototype.forEach.call(document.querySelectorAll('.box-list li'), function (li) {
    layout.build(li);
  });

  console.log(layout);

}());