export {};

const input = Deno.readTextFileSync("./input");
const lines = input.split("\n");

const stacks: string[][] = [];
const CRATE_LEN = 3;

const numberedLine = lines.find((line) => line.startsWith(" 1 "));
if (!numberedLine) {
  Deno.exit(1);
}
const numCrates = Number(numberedLine.slice(numberedLine.length - 3).at(1));
let startOfInstructionsIdx = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  let currCrateIdx = 0;
  while (currCrateIdx < numCrates) {
    const start = currCrateIdx * (CRATE_LEN + 1);
    const crate = line.slice(start, start + CRATE_LEN);
    const crateLetterMatches = /\[[A-Z]\]/.exec(crate);

    if (stacks[currCrateIdx] === undefined) {
      stacks[currCrateIdx] = [];
    }

    if (crateLetterMatches?.length) {
      const letter = crateLetterMatches[0];
      stacks[currCrateIdx].push(letter[1]);
    }
    currCrateIdx++;
  }

  if (line === "") {
    startOfInstructionsIdx = i + 1;
    break;
  }
}

for (let i = startOfInstructionsIdx; i < lines.length; i++) {
  const line = lines[i];
  if (line === "") {
    continue;
  }
  const [_, numInstructions, source, dest] =
    /move (\d+) from (\d+) to (\d+)/.exec(line)!;

  const liftedCrates = stacks[Number(source) - 1].splice(
    0,
    Number(numInstructions)
  );
  stacks[Number(dest) - 1].unshift(...liftedCrates);
}

console.log(
  stacks
    .map((stack) => stack[0])
    .flat()
    .join("")
);
