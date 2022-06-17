import { IBreakpoints } from '@helpers/breakpointsNums';

const getDirectBp = (objBps: IBreakpoints): string | boolean => {
  const bpDirect = Object.keys(objBps).find( iBp => objBps[iBp].direct === true );
  return bpDirect || false;
};

export default getDirectBp;
