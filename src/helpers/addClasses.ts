const addClasses = (classesNames: string[], Node: HTMLElement) => {
  classesNames.forEach( name => {
    if (!Node.classList.contains(name)) Node.classList.add(name);
  });
};

export default addClasses
