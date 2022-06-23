import buildAttr from '../helpers/buildAttr';

const buildMinWidth = (
  valMinWidth: string,
  insertStyles: boolean = false
) => {
  return buildAttr(valMinWidth, 'miw', insertStyles);
};

export default buildMinWidth;
