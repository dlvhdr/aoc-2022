export {};

const input = Deno.readTextFileSync("./input");
const lines = input.split("\n").filter((l) => l !== "");

let score = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const [p1, p2] = line.split(",");

  const [p1Start, p1End] = p1.split("-").map((r) => Number(r));
  const [p2Start, p2End] = p2.split("-").map((r) => Number(r));

  if (
    (p1Start >= p2Start && p1End <= p2End) ||
    (p2Start >= p1Start && p2End <= p1End)
  ) {
    score++;
  }
}

console.log(score);
