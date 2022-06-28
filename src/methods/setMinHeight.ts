import setAttr from '../helpers/setAttr';

const setMinHeight = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, ['mih', 'min-height'], values);
};

export default setMinHeight;
