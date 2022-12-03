export {};

const input = Deno.readTextFileSync("./input");
const lines = input.split("\n").filter(Boolean);

let score = 0;
const values = {
  A: 1,
  B: 2,
  C: 3,
};
const losers = {
  A: "C",
  B: "A",
  C: "B",
};
const winners = {
  C: "A",
  A: "B",
  B: "C",
};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const [p1, p2] = line.split(" ");

  if (p2 === "X") {
    score += values[losers[p1]];
  } else if (p2 === "Y") {
    score += values[p1];
    score += 3;
  } else {
    score += values[winners[p1]];
    score += 6;
  }
}

console.log(score);
