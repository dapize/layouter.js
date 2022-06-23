import setAttr from './setAttr';

const setMinWidth = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, 'miw', values);
};

export default setMinWidth;
