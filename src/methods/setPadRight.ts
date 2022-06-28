import setAttr from '../helpers/setAttr';

const setPadRight = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, ['padr', 'pr', 'padding-right'], values);
};

export default setPadRight;
