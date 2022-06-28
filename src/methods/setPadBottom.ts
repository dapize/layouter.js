import setAttr from '../helpers/setAttr';

const setPadBottom = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, ['padb', 'pb', 'padding-bottom'], values);
};

export default setPadBottom;
