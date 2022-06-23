import setAttr from './setAttr';

const setMar = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, 'mar', values);
};

export default setMar;
