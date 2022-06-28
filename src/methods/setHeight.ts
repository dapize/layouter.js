import setAttr from '../helpers/setAttr';

const setHeight = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, ['hgt', 'h'], values);
};

export default setHeight;
