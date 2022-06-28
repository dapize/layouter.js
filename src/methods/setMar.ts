import setAttr from '../helpers/setAttr';

const setMar = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, ['mar', 'm', 'margin'], values);
};

export default setMar;
