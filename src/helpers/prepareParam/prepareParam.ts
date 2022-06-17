import { IBreakpoints } from '@helpers/breakpointsNums'
import { IRprepareParam } from './prepareParam.d';

const prepareParam = ( param: string, objBps: IBreakpoints ): IRprepareParam => {
  let bp: string;
  let argParam = param;
  let important = false;
  const haveBp = argParam.includes('@');
  if (haveBp) {
    const bpSplited = argParam.split('@');
    argParam = bpSplited[0];
    bp = bpSplited[1];
  } else {
    bp = Object.keys( objBps )[0];
  };

  if (param.includes('!')) {
    important = true;
    bp = bp.replace(/!/g, '');
    argParam = argParam.replace(/!/g, '');
  };

  return {
    widthBp: haveBp,
    numbers: argParam,
    breakPoints: bp,
    important: important
  }
}

export default prepareParam;
