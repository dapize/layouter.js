(function () {
  
  // CONFIG
  const layouter = new Layouter({
    breakPoints: {
      xs: {
        width: 360,
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
  });
  
  // PROCESOR
  let nodes = document.querySelectorAll(
    "[cols], [pad], [padt], [padr], [padb], [padl], [mar], [mart], [marr], [marb], [marl], [flex], [mxw], [mxh], [miw], [mih], [hgt], [wdh]"
  );
  if (!nodes.length) return false;
  
  const setNodes = new Set();
  Array.prototype.forEach.call(nodes, function (itemNode) {
    setNodes.add(itemNode);
  });
  
  nodes = [];
  setNodes.forEach(function (node) {
    nodes.push(node);
    layouter.set(node);
  });
  
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

  console.log(layouter);

}());

