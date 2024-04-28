export function compareFields(a: any, b: any): number {
  const localeCompareResult = a.localeCompare(b, undefined, {
    numeric: true,
    sensitivity: 'base',
  });

  if (localeCompareResult < 0) {
    return -1;
  } else if (localeCompareResult > 0) {
    return 1;
  } else {
    return 0;
  }
}
