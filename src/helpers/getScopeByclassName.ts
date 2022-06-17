import { ILayouter } from "@/index.d";
import createScopeStyles from "./createScopeStyles";
import getDirectBp from "@helpers/getDirectBp";

const getScopeByclassName = (className: string, instance: ILayouter) => {
  const nameClass = className.replace(/!/g, '');
  const atIndex = nameClass.indexOf('@');

  // Haven´t a BP designed
  if (atIndex === -1) {
    const directBp = getDirectBp(instance.breakpoints);
    return instance.scope[directBp as string];
  };

  // Have a BP designed, a normal BP.
  const bp = nameClass.substring(atIndex + 1);
  if (bp.indexOf('-') === -1) return instance.scope[bp]; // A simple BP, not compound (like this: 13/15@sm-md).

  // A BP until. Example 13/15@-md
  if (bp.substring(0, 1) === '-') {
    if (instance.scope.hasOwnProperty(bp)) return instance.scope[bp]; // exists the Scope.
    const bpUntil = bp.substring(1);
    instance.scope[bp] = createScopeStyles({
      bridge: instance.bridge,
      bp,
      insertionType: 'before',
      node: instance.scope[bpUntil].node
    });
    return instance.scope[bp]; // returning a new scope created
  }

  // A BP from and until (a BP Compount). Example: Example 13/15@sm-md
  if (instance.scope.hasOwnProperty(bp)) return instance.scope[bp]; // exists the Scope.

  const fromBp = bp.split('-')[0];
  instance.scope[bp] = createScopeStyles({
    bridge: instance.bridge,
    bp,
    insertionType: 'after',
    node: instance.scope[fromBp].node
  });
  return instance.scope[bp]; // returning a new scope compounted created
};

export default getScopeByclassName;
