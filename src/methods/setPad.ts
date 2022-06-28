import setAttr from '../helpers/setAttr';

const setPad = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, ['pad', 'p', 'padding'], values);
};

export default setPad;
