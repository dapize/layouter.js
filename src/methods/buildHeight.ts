import buildAttr from '../helpers/buildAttr';

const buildHeight = (valHeight: string, insertStyles = false) => {
  return buildAttr(valHeight, 'hgt', insertStyles);
};

export default buildHeight;
