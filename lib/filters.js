export function careerOngoing(content) {
  const order = {
    'Work Experience': 1,
    'Education': 2
  };

  return content
    .sort((a, b) => order[a.heading] - order[b.heading])
    .map(({ icon, items, heading, quickStatLabel }) => items.reduce(
      (acc, item) =>
        item.shorthand ? acc.concat([icon, item.shorthand, quickStatLabel || heading]) : acc, []
    ))
    .filter(subArr => subArr.length);
}
