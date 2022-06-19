import { IBreakpoints } from './breakpointsNums';

export interface IPrepareParam {
  widthBp: boolean;
  numbers: string;
  breakPoints: string;
  important: boolean;
}

const prepareParam = (param: string, objBps: IBreakpoints): IPrepareParam => {
  let bp: string;
  let argParam = param;
  let important = false;
  const haveBp = argParam.includes('@');
  if (haveBp) {
    const bpSplited = argParam.split('@');
    argParam = bpSplited[0];
    bp = bpSplited[1];
  } else {
    bp = Object.keys(objBps)[0];
  }

  if (param.includes('!')) {
    important = true;
    bp = bp.replace(/!/g, '');
    argParam = argParam.replace(/!/g, '');
  }

  return {
    widthBp: haveBp,
    numbers: argParam,
    breakPoints: bp,
    important,
  };
};

export default prepareParam;
