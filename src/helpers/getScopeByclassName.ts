import config from '../config/main';
import createScopeStyles, { IRCreateScopeStyles } from './createScopeStyles';

const getScopeByclassName = (className: string): IRCreateScopeStyles => {
  const nameClass = className.replace(/!/g, '');
  const atIndex = nameClass.indexOf('@');
  const intConfig = config();
  const scope = intConfig.scope;
  const bridge = intConfig.bridge;

  // Haven´t a BP designed
  if (atIndex === -1) {
    const firstBp = Object.keys(intConfig.breakpoints)[0];
    return scope[firstBp as string];
  }

  // Have a BP designed, a normal BP.
  const bp = nameClass.substring(atIndex + 1);
  if (!bp.includes('-')) return scope[bp]; // A simple BP (13/15@lg), not compound (like this: 13/15@sm-md).

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

  // A BP from and until (a BP compound). Example: Example 13/15@sm-md
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

  return scope[bp]; // returning a new scope compounded created
};

export default getScopeByclassName;
