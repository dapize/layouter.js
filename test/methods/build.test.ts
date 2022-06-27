import { setConfig } from '../../src/config/main';
import build, { IBuildResult } from '../../src/methods/build';

describe('Building all', () => {
  setConfig(window);

  it('All Together', () => {
    const buildResponse = build({
      flex: 'jc:ce ai:ce',
      cols: '3/13 21/21@sm 27/27@md',
      mar: '0-2/13-0-0@-sm 0-0-20-0@sm',
      pad: '20-0@sm',
    });
    const builded = buildResponse as Partial<IBuildResult>;
    expect(builded.flex).toEqual({
      'fx-jc:ce-ai:ce':
        '.fx-jc\\:ce-ai\\:ce{justify-content:center;align-items:center;display:flex;}',
    });
    expect(builded.cols).toEqual({
      'c-21/21@sm':
        '@media screen and (min-width: 600px){.c-21\\/21\\@sm{width:100%}}',
      'c-27/27@md':
        '@media screen and (min-width: 900px){.c-27\\/27\\@md{width:100%}}',
      'c-3/13': '.c-3\\/13{width:23.077%}',
    });
    expect(builded.mar).toEqual({
      'm-0-0-20-0@sm':
        '@media screen and (min-width: 600px){.m-0-0-20-0\\@sm{margin:0 0 20px 0}}',
      'm-0-2/13-0-0@-sm':
        '@media screen and (max-width: 599px){.m-0-2\\/13-0-0\\@-sm{margin:0 15.385% 0 0}}',
    });
    expect(builded.pad).toEqual({
      'p-20-0@sm':
        '@media screen and (min-width: 600px){.p-20-0\\@sm{padding:20px 0}}',
    });
  });

  it('Separated', () => {
    expect(build({ flex: 'jc:ce ai:ce' })).toEqual({
      flex: {
        'fx-jc:ce-ai:ce':
          '.fx-jc\\:ce-ai\\:ce{justify-content:center;align-items:center;display:flex;}',
      },
    });
    expect(build({ cols: '3/13 21/21@sm 27/27@md' })).toEqual({
      cols: {
        'c-21/21@sm':
          '@media screen and (min-width: 600px){.c-21\\/21\\@sm{width:100%}}',
        'c-27/27@md':
          '@media screen and (min-width: 900px){.c-27\\/27\\@md{width:100%}}',
        'c-3/13': '.c-3\\/13{width:23.077%}',
      },
    });
    expect(build({ padt: '10 40.5@sm 30@md' })).toEqual({
      padt: {
        'pt-10': '.pt-10{padding-top:10px}',
        'pt-30@md':
          '@media screen and (min-width: 900px){.pt-30\\@md{padding-top:30px}}',
        'pt-40_5@sm':
          '@media screen and (min-width: 600px){.pt-40_5\\@sm{padding-top:40.5px}}',
      },
    });
    expect(build({ padr: '20 50.5@sm 40@md' })).toEqual({
      padr: {
        'pr-20': '.pr-20{padding-right:20px}',
        'pr-40@md':
          '@media screen and (min-width: 900px){.pr-40\\@md{padding-right:40px}}',
        'pr-50_5@sm':
          '@media screen and (min-width: 600px){.pr-50_5\\@sm{padding-right:50.5px}}',
      },
    });
    expect(build({ padb: '30 60.5@sm 50@md' })).toEqual({
      padb: {
        'pb-30': '.pb-30{padding-bottom:30px}',
        'pb-50@md':
          '@media screen and (min-width: 900px){.pb-50\\@md{padding-bottom:50px}}',
        'pb-60_5@sm':
          '@media screen and (min-width: 600px){.pb-60_5\\@sm{padding-bottom:60.5px}}',
      },
    });
    expect(build({ padl: '40 70.5@sm 60@md' })).toEqual({
      padl: {
        'pl-60@md':
          '@media screen and (min-width: 900px){.pl-60\\@md{padding-left:60px}}',
        'pl-70_5@sm':
          '@media screen and (min-width: 600px){.pl-70_5\\@sm{padding-left:70.5px}}',
        'pl-40': '.pl-40{padding-left:40px}',
      },
    });

    expect(build({ mart: '50 30.5@sm 70@md' })).toEqual({
      mart: {
        'mt-30_5@sm':
          '@media screen and (min-width: 600px){.mt-30_5\\@sm{margin-top:30.5px}}',
        'mt-50': '.mt-50{margin-top:50px}',
        'mt-70@md':
          '@media screen and (min-width: 900px){.mt-70\\@md{margin-top:70px}}',
      },
    });
    expect(build({ marr: '60 20.5@sm 80@md' })).toEqual({
      marr: {
        'mr-20_5@sm':
          '@media screen and (min-width: 600px){.mr-20_5\\@sm{margin-right:20.5px}}',
        'mr-60': '.mr-60{margin-right:60px}',
        'mr-80@md':
          '@media screen and (min-width: 900px){.mr-80\\@md{margin-right:80px}}',
      },
    });
    expect(build({ marb: '70 40.5@sm 90@md' })).toEqual({
      marb: {
        'mb-40_5@sm':
          '@media screen and (min-width: 600px){.mb-40_5\\@sm{margin-bottom:40.5px}}',
        'mb-70': '.mb-70{margin-bottom:70px}',
        'mb-90@md':
          '@media screen and (min-width: 900px){.mb-90\\@md{margin-bottom:90px}}',
      },
    });
    expect(build({ marl: '80 5.5@sm 100@md' })).toEqual({
      marl: {
        'ml-100@md':
          '@media screen and (min-width: 900px){.ml-100\\@md{margin-left:100px}}',
        'ml-5_5@sm':
          '@media screen and (min-width: 600px){.ml-5_5\\@sm{margin-left:5.5px}}',
        'ml-80': '.ml-80{margin-left:80px}',
      },
    });
  });
});
