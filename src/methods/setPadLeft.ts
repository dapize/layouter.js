import setAttr from '../helpers/setAttr';

const setPadLeft = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, ['padl', 'pl', 'padding-left'], values);
};

export default setPadLeft;
