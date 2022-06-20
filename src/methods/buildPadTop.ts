import buildAttr from '../helpers/buildAttr';

const buildPadTop = (
  valPadTop: string | string[],
  insertStyles: boolean = false
) => {
  return buildAttr(valPadTop, 'padt', insertStyles);
};

export default buildPadTop;
