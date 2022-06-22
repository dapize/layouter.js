window.layouterConfig = {
  debug: false
};
import layouter from '../../src';

describe('Build Cols params ', () => {
  it('Simple', () => {
    const styles = layouter.buildCols('3/13');
    expect(styles).toEqual({
      'cols-3/13': '.cols-3\\/13{width:23.077%}',
    });
    expect(document.querySelector('#layouter-xs')?.outerHTML).toEqual(
      '<style id="layouter-xs"></style>'
    );
  });

  it('Simple with important!', () => {
    const styles = layouter.buildCols('3!');
    expect(styles).toEqual({
      'cols-3!': '.cols-3\\!{width:20% !important}',
    });
  });

  it('Simple with implicit columns', () => {
    const styles = layouter.buildCols('3@sm');
    expect(styles).toEqual({
      'cols-3@sm':
        '@media screen and (min-width: 768px){.cols-3\\@sm{width:9.677%}}',
    });
  });

  it('Simple with implicit columns and until', () => {
    const styles = layouter.buildCols('3@sm-md');
    expect(styles).toBeFalsy();
  });

  it('Simple with implicit columns and withouth breakpoint', () => {
    const styles = layouter.buildCols('3');
    expect(styles).toEqual({
      'cols-3': '.cols-3{width:20%}',
    });
  });

  it('Compound', () => {
    const styles = layouter.buildCols('3/13 21/21@sm 27/27@md');
    expect(styles).toEqual({
      'cols-21/21@sm':
        '@media screen and (min-width: 768px){.cols-21\\/21\\@sm{width:100%}}',
      'cols-27/27@md':
        '@media screen and (min-width: 1024px){.cols-27\\/27\\@md{width:100%}}',
      'cols-3/13': '.cols-3\\/13{width:23.077%}',
    });
    expect(document.querySelector('#layouter-xs')?.outerHTML).toEqual(
      '<style id="layouter-xs"></style>'
    );
    expect(document.querySelector('#layouter-sm')?.outerHTML).toEqual(
      '<style id="layouter-sm"></style>'
    );
    expect(document.querySelector('#layouter-md')?.outerHTML).toEqual(
      '<style id="layouter-md"></style>'
    );
  });
});
