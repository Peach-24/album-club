export const secondsToDatePlusWeek = (secs) => {
  secs += 604800;
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  return t;
};

export const trimDateString = (str) => {
  let splits = str.split(" ");
  let selected = [];
  for (let i = 0; i < 3; i++) {
    selected.push(splits[i]);
  }
  return selected.join(" ");
};
