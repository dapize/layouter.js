import setAttr from './setAttr';

const setDisplay = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, 'd', values);
};

export default setDisplay;
