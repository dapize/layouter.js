import setAttr from './setAttr';

const setPad = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, 'pad', values);
};

export default setPad;
