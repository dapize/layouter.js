import setAttr from './setAttr';

const setHeight = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, 'hgt', values);
};

export default setHeight;
