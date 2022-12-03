export {};

const input = Deno.readTextFileSync("./input");
const lines = input.split("\n").slice();

let score = 0;
for (let i = 0; i < lines.length; i += 3) {
  let dups: string[] = [];
  const group = lines.slice(i, i + 3);
  group.forEach((line) => {
    const items = line.split("");
    if (dups.length === 0) {
      dups = items;
      return;
    }
    dups = dups.filter((d) => items.includes(d));
  });
  if (dups.length === 0) {
    continue;
  }
  const dup = dups[0];
  const against = dup === dup.toLowerCase() ? "a" : "A";
  let newScore = dup.charCodeAt(0) - against.charCodeAt(0) + 1;
  if (dup === dup.toUpperCase()) {
    newScore += 26;
  }
  score += newScore;
}

console.log(score);
