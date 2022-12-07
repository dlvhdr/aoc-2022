export {};

const input = Deno.readTextFileSync("./input");
const chars = input.split("");

const lastFour = [];
for (let i = 0; i < chars.length; i++) {
  if (new Set(lastFour).size === 14) {
    console.log(i);
    break;
  }

  const char = chars[i];
  if (lastFour.length === 14) {
    lastFour.shift();
  }
  lastFour.push(char);
}
