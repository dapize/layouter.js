import buildAttr from "../helpers/buildAttr";

const buildWidth = (valWidth: string | string[], insertStyles?: boolean) => {
  return buildAttr(valWidth, 'wdh', insertStyles);
};

export default buildWidth;
