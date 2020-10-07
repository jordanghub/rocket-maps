export const sortAlphabetically = (key: string) => (a: any, b: any) => {
  if (a[key].toLowerCase() < b[key].toLowerCase()) {
    return -1;
  }
  if (a[key].toLowerCase() > b[key].toLowerCase()) {
    return 1;
  }
  return 0;
};

export const sortAlphabeticallyReverse = (key: string) => (a: any, b: any) => {
  if (a[key].toLowerCase() < b[key].toLowerCase()) {
    return 1;
  }
  if (a[key].toLowerCase() > b[key].toLowerCase()) {
    return -1;
  }
  return 0;
};
