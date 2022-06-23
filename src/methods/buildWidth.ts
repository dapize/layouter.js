import buildAttr from '../helpers/buildAttr';

const buildWidth = (
  valWidth: string,
  insertStyles = false
) => {
  return buildAttr(valWidth, 'wdh', insertStyles);
};

export default buildWidth;
