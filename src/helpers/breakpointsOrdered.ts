import breakpointsNums, { IBreakpoints } from './breakpointsNums';

const breakpointsOrdered = (bps: IBreakpoints) => {
  const objBps = breakpointsNums(bps, 'width');
  const arrBps = Object.keys(bps);
  return arrBps
    .map(bp => {
      return objBps[bp];
    })
    .sort((a, b) => {
      return a - b;
    })
    .map(width => {
      return arrBps.filter(iBp => {
        return objBps[iBp] === width;
      })[0];
    });
};

export default breakpointsOrdered;
