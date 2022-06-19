import buildAttr from "../helpers/buildAttr";

const buildMars = (valMars: string | string[], insertStyles?: boolean) => {
  return buildAttr(valMars, 'mar', insertStyles);
};

export default buildMars;
