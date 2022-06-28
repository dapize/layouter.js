import regError from "./regError";

const directiveValues = (Node: HTMLElement | Element, directives: string[]): string | Error => {
  const directiveValues = directives.map( item => Node.getAttribute(item)).filter( item => item).join(' ');
  return !directiveValues ? regError(
    'Empty',
    'The value of the directives "' + directives.join(', ') + '" are empty',
    Node
  ) : directiveValues;
}

export default directiveValues
