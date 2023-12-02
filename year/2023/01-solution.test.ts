import { expect, test } from "bun:test";
import { part1, part2 } from "./01-solution";

test("part1", () => {
  expect(part1(["ala1ola3e"])).toBe(13);
  expect(part1(["ala1ola3e", "mick29"])).toBe(42);
  expect(part1(["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"])).toBe(
    142,
  );
});

test("part2", () => {
  expect(part2(["ala1ola3e"])).toBe(13);
  expect(part2(["two1ola3e", "mick29"])).toBe(52);
  expect(part2(["onetwo"])).toBe(12);
  expect(part2(["threefour"])).toBe(34);
  expect(part2(["sixfive"])).toBe(65);
  expect(part2(["seveneight"])).toBe(78);
  expect(part2(["nine"])).toBe(99);
  expect(part2(["fiveight"])).toBe(58);
  expect(
    part2([
      "two1nine",
      "eightwothree",
      "abcone2threexyz",
      "xtwone3four",
      "4nineeightseven2",
      "zoneight234",
      "7pqrstsixteen",
    ]),
  ).toBe(281);
});
