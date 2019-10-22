export const withActionPath = (path, objWithActionNames) => {
  for (const key in objWithActionNames) {
    if (objWithActionNames.hasOwnProperty(key)) {
      objWithActionNames[key] = `${path}/${objWithActionNames[key]}`;
    }
  }
  return objWithActionNames;
};