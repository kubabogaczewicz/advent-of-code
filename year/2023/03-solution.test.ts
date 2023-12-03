import { expect, test } from "bun:test";
import path from "node:path";
import { part1, part2 } from "./03-solution";

const inputFile = Bun.file(path.resolve(import.meta.dir, "03-input.txt"));
const input = await inputFile.text();

const lines = input.split("\n");

const example_p1 = [
  "467..114..",
  "...*......",
  "..35..633.",
  "......#...",
  "617*......",
  ".....+.58.",
  "..592.....",
  "......755.",
  "...$.*....",
  ".664.598..",
];

test("part 1", () => {
  expect(part1(example_p1)).toBe(4361);
  expect(part1(["...-2"])).toBe(2);
});

test("part 2", () => {
  expect(part2(example_p1)).toBe(467835);
});
