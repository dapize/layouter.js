import buildAttr from '../helpers/buildAttr';

const buildBottom = (val: string, insertStyles = false) => {
  return buildAttr(val, 'b', insertStyles);
};

export default buildBottom;
