import path from "node:path";

const inputFile = Bun.file(path.resolve(import.meta.dir, "03-input.txt"));
const input = await inputFile.text();

const lines = input.split("\n");

class Gear {
  axes: string[] = [];
  constructor(
    readonly teeth: number,
    readonly line: number,
    readonly startCol: number,
    readonly endCol: number,
  ) {}

  touches(row: number, col: number) {
    return (
      row >= this.line - 1 &&
      row <= this.line + 1 &&
      col >= this.startCol - 1 &&
      col <= this.endCol + 1
    );
  }
}
class Axis {
  constructor(
    readonly symbol: string,
    readonly row: number,
    readonly col: number,
  ) {}

  [Bun.inspect.custom]() {
    return `${this.symbol}(${this.row},${this.col})}`;
  }
}

type ParseState =
  | { mode: "null" }
  | { mode: "gear"; startCol: number; value: number };

export function parseInput(input: string[]) {
  const gears = [] as Gear[];
  const symbols = new Array<Axis[]>(input.length).fill([]);
  for (let row = 0; row < input.length; row++) {
    const line = input[row];
    const axes = [] as Axis[];
    let parseState: ParseState = { mode: "null" };
    for (let col = 0; col < line.length; col++) {
      const symbol = line[col];
      if (/\d/.test(symbol)) {
        if (parseState.mode === "null") {
          parseState = { mode: "gear", startCol: col, value: Number(symbol) };
        } else if (parseState.mode === "gear") {
          parseState.value = parseState.value * 10 + Number(symbol);
        }
      } else {
        if (parseState.mode === "gear") {
          gears.push(
            new Gear(parseState.value, row, parseState.startCol, col - 1),
          );
          parseState = { mode: "null" };
        }
        if (symbol !== ".") {
          axes.push(new Axis(symbol, row, col));
        }
      }
    }
    if (parseState.mode === "gear") {
      gears.push(
        new Gear(parseState.value, row, parseState.startCol, line.length - 1),
      );
    }
    symbols[row] = axes;
  }
  return { gears, symbols };
}

export function gearAxes(gear: Gear, symbols: Axis[][]) {
  const minCol = gear.startCol - 1;
  const maxCol = gear.endCol + 1;
  const minRow = Math.max(0, gear.line - 1);
  const maxRow = Math.min(symbols.length - 1, gear.line + 1);
  const foundAxes = [] as string[];
  for (let row = minRow; row <= maxRow; row++) {
    const ss = symbols[row];
    for (const axis of ss) {
      if (axis.col >= minCol && axis.col <= maxCol) {
        foundAxes.push(axis.symbol);
      }
    }
  }
  return foundAxes;
}

export function part1(input: string[]) {
  const { gears, symbols } = parseInput(input);
  for (const gear of gears) {
    gear.axes = gearAxes(gear, symbols);
  }
  return gears
    .filter((gear) => gear.axes.length > 0)
    .reduce((a, b) => a + b.teeth, 0);
}

console.log("Part 1:", part1(lines));

export function part2(input: string[]) {
  const { gears, symbols } = parseInput(input);
  let finalRation = 0;
  for (const axis of symbols.flat().filter((axis) => axis.symbol === "*")) {
    const affectedGears = gears.filter((gear) =>
      gear.touches(axis.row, axis.col),
    );
    if (affectedGears.length === 2) {
      finalRation += affectedGears[0].teeth * affectedGears[1].teeth;
    }
  }
  return finalRation;
}

console.log("Part 2:", part2(lines));
