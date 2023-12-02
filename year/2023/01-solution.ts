import path from "node:path";

const inputFile = Bun.file(path.resolve(import.meta.dir, "01-input.txt"));
const input = await inputFile.text();

const lines = input.split("\n");

function convertToNumber(str: string) {
  switch (str) {
    case "one":
      return 1;
    case "two":
      return 2;
    case "three":
      return 3;
    case "four":
      return 4;
    case "five":
      return 5;
    case "six":
      return 6;
    case "seven":
      return 7;
    case "eight":
      return 8;
    case "nine":
      return 9;
    default:
      return parseInt(str, 10);
  }
}

export const part1 = (input: string[]) =>
  input
    .map((line) => [...line.matchAll(/0|1|2|3|4|5|6|7|8|9/g)].flat())
    .filter(Boolean) // just to be safe in case a line does not contain any numbers
    .map((lineNumbers) => parseInt(lineNumbers.at(0)! + lineNumbers.at(-1), 10))
    .reduce((a, b) => a + b, 0);

console.log("Part 1:", part1(lines));

export const part2 = (input: string[]) =>
  input
    .map((line) =>
      [
        ...line.matchAll(
          /(?=(0|1|2|3|4|5|6|7|8|9|one|two|three|four|five|six|seven|eight|nine))/g,
        ),
      ].flatMap((match) => match[1]),
    )
    .map((lineNumbers) => lineNumbers.map(convertToNumber))
    .map((lineNumbers) => lineNumbers.at(0)! * 10 + lineNumbers.at(-1)!)
    .reduce((a, b) => a + b, 0);

console.log("Part 2:", part2(lines));
