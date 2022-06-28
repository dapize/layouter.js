import setAttr from '../helpers/setAttr';

const setMaxHeight = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, ['mxh', 'max-height'], values);
};

export default setMaxHeight;
