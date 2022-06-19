const addClasses = (classesNames: string[], Node: HTMLElement | Element) => {
  const classesToAdd = classesNames.filter( name => !Node.classList.contains(name))
  if ( classesToAdd.length ) {
    const space = Node.hasAttribute('class') ? ' ' : '';
    Node.className += space + classesToAdd.join(' ');
  }
};

export default addClasses;
