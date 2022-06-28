import setAttr from '../helpers/setAttr';

const setPadTop = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, ['padt', 'pt', 'padding-top'], values);
};

export default setPadTop;
