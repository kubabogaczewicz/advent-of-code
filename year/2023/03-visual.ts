import chalk from "chalk";
import path from "node:path";
import { gearAxes, parseInput } from "./03-solution";

const inputFile = Bun.file(path.resolve(import.meta.dir, "03-input.txt"));
const input = await inputFile.text();

const lines = input.split("\n");

const rowCount = lines.length;
const colCount = lines[0].length;

const { gears, symbols } = parseInput(lines);
for (const gear of gears) {
  gear.axes = gearAxes(gear, symbols);
}

// Prints a single line of input, but number are colored green or red depending
// on whether they are on an axis or not.
function printLine(lineNumber: number) {
  const line = lines[lineNumber];
  const localGear = gears.filter((gear) => gear.line === lineNumber);
  let col = 0;
  while (col < line.length) {
    const gearAtCol = localGear.find(
      (gear) => gear.startCol <= col && col <= gear.endCol,
    );
    if (gearAtCol) {
      const color = gearAtCol.axes.length > 0 ? chalk.green : chalk.red;
      process.stdout.write(color(gearAtCol.teeth.toString()));
      col += gearAtCol.endCol - gearAtCol.startCol + 1;
    } else {
      process.stdout.write(line[col]);
      col++;
    }
  }
}

for (let row = 0; row < rowCount; row++) {
  printLine(row);
  process.stdout.write("\n");
}
