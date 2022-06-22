import config from "../config/main";

const regError = (
  name: string,
  message: string,
  Node?: Element | HTMLElement
): void => {
  const { debug } = config();
  const err = new Error();
  err.name = name;
  err.message = message;
  if ( debug ) {
    console.error(err);
    if (Node) console.log(Node);
  }
};

export default regError;
