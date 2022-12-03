export {};

const input = Deno.readTextFileSync("./input");
const lines = input.split("\n").filter(Boolean);

let score = 0;
const values = {
  X: 1,
  Y: 2,
  Z: 3,
  A: 1,
  B: 2,
  C: 3,
};
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const [p1, p2] = line.split(" ");
  score += values[p2];

  if (values[p1] === values[p2]) {
    score += 3;
  } else if (p1 === "A" && p2 === "Y") {
    score += 6;
  } else if (p1 === "B" && p2 === "Z") {
    score += 6;
  } else if (p1 === "C" && p2 === "X") {
    score += 6;
  }
  console.log(score);
}

console.log(score);
