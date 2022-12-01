export {};

const input = Deno.readTextFileSync("./input");
const lines = input.split("\n");

let max = 0;
let current = 0;
lines.forEach((line) => {
  if (line === "") {
    current = 0;
    return;
  }

  current += Number(line);
  if (current > max) {
    max = current;
  }
});

console.log(max);
