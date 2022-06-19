import config from "../config/main";
import breakpointsOrdered from "./breakpointsOrdered";

const getScopeByclassName = ( className: string ) => {
  const nameClass = className.replace(/!/g, '');
  const atIndex = nameClass.indexOf('@');
  const { breakpoints, scope } = config();

  // Haven´t a BP designed
  if (atIndex === -1) {
    const arrBps = breakpointsOrdered(breakpoints);
    return scope[arrBps[0] as string];
  };

  const bp = nameClass.substring(atIndex + 1);
  return scope[bp]; // returning a new scope compounted created
};

export default getScopeByclassName;
