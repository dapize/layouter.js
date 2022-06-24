import buildAttr from '../helpers/buildAttr';

const buildPadTop = (valPadTop: string, insertStyles = false) => {
  return buildAttr(valPadTop, 'padt', insertStyles);
};

export default buildPadTop;
