import setAttr from './setAttr';

const setPosition = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, 'pos', values);
};

export default setPosition;
