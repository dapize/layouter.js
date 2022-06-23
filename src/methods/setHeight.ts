import setAttr from './setAttr';

const setHeight = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void> => {
  return setAttr(Node, 'hgt', values);
};

export default setHeight;
