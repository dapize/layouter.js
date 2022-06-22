import config from '../config/main';
import breakpointsOrdered from './breakpointsOrdered';
import createScopeStyles from './createScopeStyles';

const getScopeByclassName = (className: string) => {
  const nameClass = className.replace(/!/g, '');
  const atIndex = nameClass.indexOf('@');
  const intConfig = config();
  const breakpoints = intConfig.breakpoints;
  const scope = intConfig.scope;
  const bridge = intConfig.bridge;

  // Haven´t a BP designed
  if (atIndex === -1) {
    const arrBps = breakpointsOrdered(breakpoints);
    return scope[arrBps[0] as string];
  }

  // Have a BP designed, a normal BP.
  const bp = nameClass.substring(atIndex + 1);
  if (!bp.includes('-')) return scope[bp]; // A simple BP, not compound (like this: 13/15@sm-md).

  // A BP until. Example 13/15@-md
  if (bp.substring(0, 1) === '-') {
    if (scope.hasOwnProperty(bp)) return scope[bp]; // exists the Scope.
    const bpUntil = bp.substring(1);
    scope[bp] = createScopeStyles({
      bridge: bridge,
      bp,
      insertionType: 'before',
      node: scope[bpUntil].node,
    });
    return scope[bp]; // returning a new scope created
  }

  // A BP from and until (a BP Compount). Example: Example 13/15@sm-md
  if (scope.hasOwnProperty(bp)) {
    return scope[bp]; // exists the Scope.
  }

  const fromBp = bp.split('-')[0];
  scope[bp] = createScopeStyles({
    bridge: bridge,
    bp,
    insertionType: 'after',
    node: scope[fromBp].node,
  });

  return scope[bp]; // returning a new scope compounted created
};

export default getScopeByclassName;
