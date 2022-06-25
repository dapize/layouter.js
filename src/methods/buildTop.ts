import buildAttr from '../helpers/buildAttr';

const buildTop = (val: string, insertStyles = false) => {
  return buildAttr(val, 't', insertStyles);
};

export default buildTop;
