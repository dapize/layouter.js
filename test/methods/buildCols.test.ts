import { setConfig } from '../../src/config/main';
import buildCols from '../../src/methods/buildCols';

describe('Build Cols params ', () => {
  setConfig(window, {
    debug: false
  });

  it('Simple', () => {
    const styles = buildCols('3/13');
    expect(styles).toEqual({
      'c-3/13': '.c-3\\/13{width:23.077%}',
    });
    expect(document.querySelector('#layouter-xs')?.outerHTML).toEqual(
      '<style id="layouter-xs"></style>'
    );
  });

  it('Simple with important!', () => {
    const styles = buildCols('3!');
    expect(styles).toEqual({
      'c-3!': '.c-3\\!{width:20% !important}',
    });
  });

  it('Simple with implicit columns', () => {
    const styles = buildCols('3@sm');
    expect(styles).toEqual({
      'c-3@sm':
        '@media screen and (min-width: 600px){.c-3\\@sm{width:12%}}',
    });
  });

  it('Simple with implicit columns and withouth breakpoint', () => {
    const styles = buildCols('3');
    expect(styles).toEqual({
      'c-3': '.c-3{width:20%}',
    });
  });

  it('Compound', () => {
    const styles = buildCols('3/13 21/21@sm 27/27@md');
    expect(styles).toEqual({
      'c-21/21@sm':
        '@media screen and (min-width: 600px){.c-21\\/21\\@sm{width:100%}}',
      'c-27/27@md':
        '@media screen and (min-width: 900px){.c-27\\/27\\@md{width:100%}}',
      'c-3/13': '.c-3\\/13{width:23.077%}',
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
