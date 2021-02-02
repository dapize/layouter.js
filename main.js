
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
const layouter = new Layouter(configs);
console.log('layouter.breakPoints: ', layouter.breakPoints);
console.log('layouter.sizes:', layouter.sizes);
console.log('layouter.cols: ', layouter.cols);
const myDiv = document.querySelector('.my-div');
console.log('layouter.getParameters', layouter.getParameters(myDiv));

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
layouter.set(myDiv);
console.dir(layouter.styles);

// Title
Array.prototype.forEach.call(document.querySelectorAll('h3'), function (title) {
  layouter.set(title);
});

// BOX LIST
layouter.set(document.querySelector('.box-list'))
Array.prototype.forEach.call(document.querySelectorAll('.box-list li'), function (li) {
  layouter.set(li);
});

console.log(layouter);
