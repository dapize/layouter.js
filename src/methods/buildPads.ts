import buildAttr from "../helpers/buildAttr";

const buildPads = (valPads: string | string[], insertStyles?: boolean) => {
  return buildAttr(valPads, 'pad', insertStyles);
};

export default buildPads;
