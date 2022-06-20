const regError = (
  name: string,
  message: string,
  Node?: Element | HTMLElement
): void => {
  const err = new Error();
  err.name = name;
  err.message = message;
  console.error(err);
  if (Node) console.log(Node);
};

export default regError;
