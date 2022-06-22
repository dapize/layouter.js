import layouter from '../../src/';
import { IBuildResult } from '../../src/methods/build';
window.layouterConfig = {
  breakpoints: {
    xs: {
      width: 320,
      cols: 15,
    },
    sm: {
      width: 768,
      cols: 31,
    },
    md: {
      width: 1024,
      cols: 31,
    },
  },
};

describe('Building all', () => {
  it('All Together', () => {
    const buildResponse = layouter.build({
      flex: 'jc:ce ai:ce',
      cols: '3/13 21/21@sm 27/27@md',
      mar: '0-2/13-0-0@-sm 0-0-20-0@sm',
      pad: '20-0@sm',
    });
    const builded = buildResponse as Partial<IBuildResult>;
    expect(builded.flex).toEqual({
      'flex-jc:ce-ai:ce':
        '.flex-jc\\:ce-ai\\:ce{justify-content:center;align-items:center;display:flex;}',
    });
    expect(builded.cols).toEqual({
      'cols-21/21@sm':
        '@media screen and (min-width: 600px){.cols-21\\/21\\@sm{width:100%}}',
      'cols-27/27@md':
        '@media screen and (min-width: 900px){.cols-27\\/27\\@md{width:100%}}',
      'cols-3/13': '.cols-3\\/13{width:23.077%}',
    });
    expect(builded.mar).toEqual({
      'mar-0-0-20-0@sm':
        '@media screen and (min-width: 600px){.mar-0-0-20-0\\@sm{margin:0 0 20px 0}}',
      'mar-0-2/13-0-0@-sm':
        '@media screen and (max-width: 599px){.mar-0-2\\/13-0-0\\@-sm{margin:0 15.385% 0 0}}',
    });
    expect(builded.pad).toEqual({
      'pad-20-0@sm':
        '@media screen and (min-width: 600px){.pad-20-0\\@sm{padding:20px 0}}',
    });
  });

  it('Separated', () => {
    expect(layouter.build({ flex: 'jc:ce ai:ce' })).toEqual({
      flex: {
        'flex-jc:ce-ai:ce':
          '.flex-jc\\:ce-ai\\:ce{justify-content:center;align-items:center;display:flex;}',
      },
    });
    expect(layouter.build({ cols: '3/13 21/21@sm 27/27@md' })).toEqual({
      cols: {
        'cols-21/21@sm':
          '@media screen and (min-width: 600px){.cols-21\\/21\\@sm{width:100%}}',
        'cols-27/27@md':
          '@media screen and (min-width: 900px){.cols-27\\/27\\@md{width:100%}}',
        'cols-3/13': '.cols-3\\/13{width:23.077%}',
      },
    });
    expect(layouter.build({ padt: '10 40.5@sm 30@md' })).toEqual({
      padt: {
        'padt-10': '.padt-10{padding-top:10px}',
        'padt-30@md':
          '@media screen and (min-width: 900px){.padt-30\\@md{padding-top:30px}}',
        'padt-40_5@sm':
          '@media screen and (min-width: 600px){.padt-40_5\\@sm{padding-top:40.5px}}',
      },
    });
    expect(layouter.build({ padr: '20 50.5@sm 40@md' })).toEqual({
      padr: {
        'padr-20': '.padr-20{padding-right:20px}',
        'padr-40@md':
          '@media screen and (min-width: 900px){.padr-40\\@md{padding-right:40px}}',
        'padr-50_5@sm':
          '@media screen and (min-width: 600px){.padr-50_5\\@sm{padding-right:50.5px}}',
      },
    });
    expect(layouter.build({ padb: '30 60.5@sm 50@md' })).toEqual({
      padb: {
        'padb-30': '.padb-30{padding-bottom:30px}',
        'padb-50@md':
          '@media screen and (min-width: 900px){.padb-50\\@md{padding-bottom:50px}}',
        'padb-60_5@sm':
          '@media screen and (min-width: 600px){.padb-60_5\\@sm{padding-bottom:60.5px}}',
      },
    });
    expect(layouter.build({ padl: '40 70.5@sm 60@md' })).toEqual({
      padl: {
        'padl-60@md':
          '@media screen and (min-width: 900px){.padl-60\\@md{padding-left:60px}}',
        'padl-70_5@sm':
          '@media screen and (min-width: 600px){.padl-70_5\\@sm{padding-left:70.5px}}',
        'padl-40': '.padl-40{padding-left:40px}',
      },
    });

    expect(layouter.build({ mart: '50 30.5@sm 70@md' })).toEqual({
      mart: {
        'mart-30_5@sm':
          '@media screen and (min-width: 600px){.mart-30_5\\@sm{margin-top:30.5px}}',
        'mart-50': '.mart-50{margin-top:50px}',
        'mart-70@md':
          '@media screen and (min-width: 900px){.mart-70\\@md{margin-top:70px}}',
      },
    });
    expect(layouter.build({ marr: '60 20.5@sm 80@md' })).toEqual({
      marr: {
        'marr-20_5@sm':
          '@media screen and (min-width: 600px){.marr-20_5\\@sm{margin-right:20.5px}}',
        'marr-60': '.marr-60{margin-right:60px}',
        'marr-80@md':
          '@media screen and (min-width: 900px){.marr-80\\@md{margin-right:80px}}',
      },
    });
    expect(layouter.build({ marb: '70 40.5@sm 90@md' })).toEqual({
      marb: {
        'marb-40_5@sm':
          '@media screen and (min-width: 600px){.marb-40_5\\@sm{margin-bottom:40.5px}}',
        'marb-70': '.marb-70{margin-bottom:70px}',
        'marb-90@md':
          '@media screen and (min-width: 900px){.marb-90\\@md{margin-bottom:90px}}',
      },
    });
    expect(layouter.build({ marl: '80 5.5@sm 100@md' })).toEqual({
      marl: {
        'marl-100@md':
          '@media screen and (min-width: 900px){.marl-100\\@md{margin-left:100px}}',
        'marl-5_5@sm':
          '@media screen and (min-width: 600px){.marl-5_5\\@sm{margin-left:5.5px}}',
        'marl-80': '.marl-80{margin-left:80px}',
      },
    });
  });
});
