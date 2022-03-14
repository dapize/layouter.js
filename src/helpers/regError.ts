const regError = (name: string, message: string): void => {
  const err = new Error();
  err.name = name;
  err.message = message;
}

export default regError;