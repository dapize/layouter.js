import calPercentage from './calPercentage';

const relativeMeasures = ['%', 'rem', 'em', 'ex', 'vw', 'vh'];

const processedNumber = (n: string) => {
  let nProcessed;
  if (n.includes('/')) {
    nProcessed = n.split('/');
    nProcessed = calPercentage(
      parseFloat(nProcessed[0]),
      parseFloat(nProcessed[1])
    );
  } else if (n === 'auto') {
    nProcessed = 'auto';
  } else {
    const relativeUnits = relativeMeasures.filter(unit => {
      return n.includes(unit);
    });
    if (relativeUnits.length) {
      nProcessed = n;
    } else {
      nProcessed = n === '0' ? n : n + 'px';
    }
  }
  return nProcessed;
};

export default processedNumber;
