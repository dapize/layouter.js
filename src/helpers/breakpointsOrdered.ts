import { ICols } from '../config/main';
import { IBreakpoints } from './breakpointsNums';

const breakpointsOrdered = ( bps: IBreakpoints, sizes: ICols ) => {
  const bpsOrdered: IBreakpoints = {};
  Object.keys(sizes).forEach( bpName => bpsOrdered[bpName] = bps[bpName]);
  return bpsOrdered;
}

export default breakpointsOrdered;

