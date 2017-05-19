export const filterColors = (used = []) => {
  const colorList = ['white', 'black', 'red', 'tomato', 'peach', 'pale', 'dirt', 'brown', 'orange', 'gold', 'yellow', 'yellowGreen', 'olive', 'green', 'darkGreen', 'springGreen', 'forest', 'teal', 'cyan', 'blue', 'navy', 'violet', 'blueViolet', 'purple', 'redViolet', 'pink', 'hotPink', 'grey', 'silver', 'darkGrey'];
  return colorList.filter(color => used.indexOf(color) === -1 );
};

export const getBoxSize = (num) => {
  if (num % 10 === 0) return 'xs'; // 5 cols
  else if (num % 4 === 0 && num > 4) return 'sm'; // 4 cols
  else if (num % 3 === 0 && num < 10) return 'md'; // 3 cols
  else if (num % 2 === 0 && num < 5) return 'lg'; // 2 cols
  else if (num > 10 && num % 10 < num) return 'xs';
  else if (num % 3 < 2) return 'sm';
  else return 'md';
};

export const whosSinging = (arr) => {
	if (arr.length === 0) return '-';
	else if (arr.length === 1) return `${arr[0]} is singing.`;
	else return `${arr.join(' and ')} are singing`;
};
