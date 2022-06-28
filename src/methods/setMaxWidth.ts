import setAttr from '../helpers/setAttr';

const setMaxWidth = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, ['mxw', 'max-width'], values);
};

export default setMaxWidth;
