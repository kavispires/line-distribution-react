export const filterColors = (used = []) => {
  const colorList = ['white', 'black', 'red', 'tomato', 'peach', 'pale', 'dirt', 'brown', 'orange', 'gold', 'yellow', 'yellowGreen', 'olive', 'green', 'darkGreen', 'springGreen', 'forest', 'teal', 'cyan', 'blue', 'navy', 'violet', 'blueViolet', 'purple', 'redViolet', 'pink', 'hotPink', 'grey', 'silver', 'darkGrey'];
  return colorList.filter(color => used.indexOf(color) === -1 );
};
