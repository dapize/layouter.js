import buildAttr from '../helpers/buildAttr';

const buildMinWidth = (valMinWidth: string, insertStyles = false) => {
  return buildAttr(valMinWidth, 'miw', insertStyles);
};

export default buildMinWidth;
