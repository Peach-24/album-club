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

export const calculateAvgScore = (arr) => {
  let total = 0;
  arr.forEach((review) => {
    total += Number(review.score);
  });
  return (total / arr.length).toFixed(1);
};

export const addListeningDates = (arr) => {
  let latestEndDate = "";
  let first = arr[0];
  first["start_date"] = first.created_at.toDate().toString();
  first["end_date"] = secondsToDatePlusWeek(first.created_at.seconds);
  latestEndDate = secondsToDatePlusWeek(first.created_at.seconds);

  for (let i = 1; i < arr.length; i++) {
    arr[i]["start_date"] = latestEndDate;
    let nextStartDate = Date.parse(arr[i]["start_date"]);
    arr[i]["end_date"] = secondsToDatePlusWeek(nextStartDate / 1000);
    latestEndDate = arr[i]["end_date"];
  }

  return arr;
};
