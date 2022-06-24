const addClasses = (
  Node: HTMLElement | Element,
  classesNames: string,
  overwrite?: boolean
): Promise<void> => {
  return new Promise((resolve) => {
    const names = classesNames.split(' ');
    let classesToAdd: string[] = names;
    if (!overwrite) {
      classesToAdd = names.filter((name) => !Node.classList.contains(name));
      if (!classesToAdd.length) {
        resolve();
        return;
      }
    }

    const obsNode = new MutationObserver((mutations) => {
      const target = mutations[0].target;
      const currentClasses = (target as Element).className.split(' ');
      const containsAll = names.every((element) =>
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

    if (overwrite) {
      Node.className = classesNames;
    } else {
      const space = Node.hasAttribute('class') ? ' ' : '';
      Node.className += space + classesToAdd.join(' ');
    }
  });
};

export default addClasses;
