export {};

const input = Deno.readTextFileSync("./input");
const lines = input.split("\n");

let max = [0, 0, 0];
let current = 0;
lines.forEach((line) => {
  if (line === "") {
    current = 0;
    return;
  }

  current += Number(line);
  if (max[0] < current) {
    max[0] = Number(current);
    max = max.sort((a, z) => a - z);
  }
});

console.log(max.reduce((curr, sum) => curr + sum, 0));
