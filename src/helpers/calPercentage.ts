const calPercentage = ( n1: number, n2: number ): string => {
  const cal = (n1 * 100) / n2;
  const haveDecimal = (cal - Math.floor(cal)) !== 0;
  const result = haveDecimal ? cal.toFixed(3) : cal;
  return result + '%'
}

export default calPercentage;
