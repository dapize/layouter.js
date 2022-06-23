import buildAttr from '../helpers/buildAttr';

const buildWidth = (
  valWidth: string,
  insertStyles: boolean = false
) => {
  return buildAttr(valWidth, 'wdh', insertStyles);
};

export default buildWidth;
