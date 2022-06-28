import setAttr from '../helpers/setAttr';

const setTop = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, ['t', 'top'], values);
};

export default setTop;
