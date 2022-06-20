(function () {
  console.time('layouter');
  window.layouterConfig = {
    ready: () => {
      console.timeEnd('layouter');
      console.log(window.layouter);
    }
  }
}());
