import buildAttr from "../helpers/buildAttr";

const buildMinWidth = (valMinWidth: string | string[], insertStyles?: boolean) => {
  return buildAttr(valMinWidth, 'miw', insertStyles);
};

export default buildMinWidth;
