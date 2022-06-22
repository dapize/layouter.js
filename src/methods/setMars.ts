import setAttr from './setAttr';

const setMars = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void> => {
  return setAttr(Node, 'mar', values);
};

export default setMars;
