const {
  secondsToDatePlusWeek,
  trimDateString,
  calculateAvgScore,
  addListeningDates,
} = require("./formatters");

describe("Trimming the date string - trimDateString", () => {
  it("returns an empty string when passed one", () => {
    expect(trimDateString("")).toBe("");
  });
  it("shortens the date string correctly", () => {
    const input = "Mon Mar 15 2021 12:00:00 GMT+0000 (Greenwich Mean Time)";
    const expectedOutput = "Mon Mar 15";
    expect(trimDateString(input)).toBe(expectedOutput);
  });
});

describe("Calculating average score from album reviews - calculateAvgScore", () => {
  it("returns a string of 'N/A' if passed an empty array", () => {
    expect(calculateAvgScore([])).toBe("N/A");
  });
  it("goes through array of reviews and returns an average of all the scores", () => {
    const input = [
      {
        album: "Conflict of Interest",
        author: "Ben",
        score: "7",
        artist: "Ghetts",
        reviewBody:
          "Having never really listen to Ghetts before I didn’t know what to expect from this album, overall I really enjoyed it. Having only given two full listens to the album due to it’s length I think it really needs more time to fully appreciate it. I definitely think this will grow on me with more listens.  ",
      },
      {
        artist: "Ghetts",
        album: "Conflict of Interest",
        score: "7.5",
        author: "Lew",
        reviewBody:
          "Really bloody good. Overall massively consistent effort with some real highlights. Never thought I'd enjoy a 6-minute-plus grime track but Autobiography is great. Some dips in quality, but overall an emotional hour long ride with many high points. Favourite song is Squeeze - ethereal tones and trap beats yes please!",
      },

      {
        author: "Will",
        artist: "Ghetts",
        album: "Conflict of Interest",
        reviewBody:
          "Great introspective album from Ghetts. One of the better uk rap albums of the last couple of years. There’s a middle chunk of tunes that are a bad combo of subdued and long. Picks back up for the finish though and overall really good ",
        score: "7.7",
      },
    ];
    expect(calculateAvgScore(input)).toBe("7.4");
  });
});

describe("Adds a week to seconds - secondsToDatePlusWeek", () => {
  it("returns a timestamp object", () => {
    const input = 1613995200;
    expect(typeof secondsToDatePlusWeek(input)).toBe("object");
  });
  it("returns a timestamp object, which is the right date when turned into a string", () => {
    const input = 1613995200;
    const output = secondsToDatePlusWeek(input);
    const outputString = output.toString();
    const expectedOutput =
      "Mon Mar 01 2021 12:00:00 GMT+0000 (Greenwich Mean Time)";
    expect(outputString).toBe(expectedOutput);
  });
});

describe("Adding listening dates to arr of albums - addListeningDates", () => {
  it("returns empty arr if passed empty arr", () => {
    expect(addListeningDates([])).toEqual([]);
  });
});
