import setAttr from '../helpers/setAttr';

const setMarRight = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, ['marr', 'mr', 'margin-right'], values);
};

export default setMarRight;
