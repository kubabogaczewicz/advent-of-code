import path from "node:path";

const inputFile = Bun.file(path.resolve(import.meta.dir, "02-input.txt"));
const input = await inputFile.text();

const lines = input.split("\n");

function bagPower(bag: Bag) {
  return bag.blue * bag.green * bag.red;
}

type Bag = { blue: number; green: number; red: number };
class Game {
  id: number;
  bags: Bag[];
  minimalBag: Bag;

  constructor(id: number, bags: Bag[]) {
    this.id = id;
    this.bags = bags;
    this.minimalBag = this.bags.reduce(
      (minimalBag, bag) => {
        return {
          blue: Math.max(minimalBag.blue, bag.blue),
          green: Math.max(minimalBag.green, bag.green),
          red: Math.max(minimalBag.red, bag.red),
        };
      },
      { blue: 0, green: 0, red: 0 },
    );
  }

  [Bun.inspect.custom]() {
    return `Game<${this.id}>{ bags:${this.bags
      .map(({ blue, green, red }) => `[b${blue} g${green} r${red}]`)
      .join(",")}, minimalBag: [b${this.minimalBag.blue} g${
      this.minimalBag.green
    } r${this.minimalBag.red}] }`;
  }
}

export function parse(input: string): Game {
  const [_, id, bags] = input.match(/Game (\d+): (.*)/)!;
  return new Game(
    Number(id),
    bags.split(";").map((bag) => {
      const green = Number(/(\d+) green/.exec(bag)?.[1] || 0);
      const blue = Number(/(\d+) blue/.exec(bag)?.[1] || 0);
      const red = Number(/(\d+) red/.exec(bag)?.[1] || 0);
      return { green, blue, red };
    }),
  );
}

export function part1(input: string[]) {
  const games = input.map(parse);
  return games
    .filter((game) =>
      game.bags.every(
        ({ blue, green, red }) => blue <= 14 && green <= 13 && red <= 12,
      ),
    )
    .map((game) => game.id)
    .reduce((a, b) => a + b, 0);
}

console.log("Part 1:", part1(lines));

export function part2(input: string[]) {
  const games = input.map(parse);
  return games
    .map((game) => bagPower(game.minimalBag))
    .reduce((a, b) => a + b, 0);
}

console.log("Part 2:", part2(lines));
