import setAttr from '../helpers/setAttr';

const setMarTop = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, ['mart', 'mt', 'margin-top'], values);
};

export default setMarTop;
