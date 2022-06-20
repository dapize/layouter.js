const addClasses = (
  classesNames: string[],
  Node: HTMLElement | Element
): Promise<void> => {
  return new Promise(resolve => {
    const classesToAdd = classesNames.filter(
      name => !Node.classList.contains(name)
    );
    if (!classesToAdd.length) resolve();

    const obsNode = new MutationObserver(mutations => {
      const target = mutations[0].target;
      const currentClasses = (target as Element).className.split(' ');
      const containsAll = classesNames.every(element =>
        currentClasses.includes(element)
      );
      if (containsAll) {
        obsNode.disconnect();
        resolve();
      }
    });
    obsNode.observe(Node, {
      childList: false,
      subtree: false,
      attributes: true,
      attributeFilter: ['class'],
      characterData: false,
    });

    const space = Node.hasAttribute('class') ? ' ' : '';
    Node.className += space + classesToAdd.join(' ');
  });
};

export default addClasses;
