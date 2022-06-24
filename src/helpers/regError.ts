import config from '../config/main';

const regError = (
  name: string,
  message: string,
  Node?: Element | HTMLElement
): Error => {
  const err = new Error();
  err.name = name;
  err.message = message;
  const intConfig = config();
  if (intConfig.debug) {
    console.error(err);
    if (Node) console.log(Node);
  }
  return err;
};

export default regError;
