//optionall -can use this function to make reducer leaner....
export const updateObject = (oldObject, updatedProperties) => {
  return { ...oldObject, ...updatedProperties };
};
