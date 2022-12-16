export {};

const input = Deno.readTextFileSync("./input");
const lines = input.split("\n");

let currentPath: string[] = [];
const selfSizes: Record<string, number> = {};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.startsWith("$ cd ")) {
    if (line === "$ cd /") {
      currentPath = [""];
    } else if (line === "$ cd ..") {
      currentPath.pop();
    } else {
      currentPath.push(line.slice("$ cd ".length));
    }

    continue;
  }

  if (line.startsWith("$ ")) {
    continue;
  }

  if (/^\d/.test(line)) {
    const formattedPath = currentPath.join("/");
    const fileSize = Number(line.split(" ")[0]);
    if (selfSizes[formattedPath] === undefined) {
      selfSizes[formattedPath] = 0;
    }

    selfSizes[formattedPath] += fileSize;
  }
}

Object.entries(selfSizes).forEach(([path, size]) => {
  let currentPath = "";
  console.log({ path });
  path
    .split("/")
    .slice(1, -1)
    .forEach((parentPath) => {
      currentPath += `/${parentPath}`;
      if (selfSizes[currentPath] === undefined) {
        selfSizes[currentPath] = 0;
      }
      selfSizes[currentPath] += size;
    });
});

console.log(selfSizes);

const sorted = Object.entries(selfSizes)
  .filter(([_, size]) => size <= 100000)
  .sort((a, z) => z[1] - a[1]);
console.log(sorted.map((dir) => dir[1] + " " + dir[0]));

console.log(
  sorted.reduce((total, [path, size]) => {
    console.log(path);
    return total + size;
  }, 0)
);
