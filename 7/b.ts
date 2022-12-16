export {};

const input = Deno.readTextFileSync("./input");
const lines = input.split("\n");

type Dir = {
  name: string;
  parent: Dir | undefined;
  selfSize: number;
  dirs: Dir[];
};

let rootDir: Dir | undefined = undefined;
let currentDir: Dir | undefined = undefined;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.startsWith("$ cd ")) {
    if (line === "$ cd /") {
      if (rootDir === undefined) {
        rootDir = {
          name: "/",
          selfSize: 0,
          dirs: [],
          parent: undefined,
        };
        currentDir = rootDir;
      }
    } else if (line === "$ cd ..") {
      currentDir = currentDir?.parent;
    } else {
      currentDir = currentDir?.dirs.find(
        (dir) => dir.name === line.slice("$ cd ".length)
      );
    }

    continue;
  }

  if (line.startsWith("$ ")) {
    continue;
  }

  if (line.startsWith("dir ")) {
    const parent = currentDir;
    currentDir!.dirs.push({
      name: line.slice("dir ".length),
      parent: parent,
      dirs: [],
      selfSize: 0,
    });

    continue;
  }

  if (/^\d/.test(line)) {
    const fileSize = Number(line.split(" ")[0]);
    currentDir!.selfSize += fileSize;
  }
}

const calcTotalSizes = (dir: Dir) => {
  let sum = 0;
  dir.dirs.forEach((subDir) => {
    calcTotalSizes(subDir);
    sum += subDir.selfSize;
  });

  dir.selfSize += sum;
};

calcTotalSizes(rootDir!);

let min = rootDir!.selfSize;
console.log("taken", rootDir!.selfSize);
const totalFree = 70000000 - rootDir!.selfSize;
console.log("free", totalFree);
const needToFree = 30000000 - totalFree;
console.log("need to free", needToFree);

const findSmallestToFree = (dir: Dir) => {
  if (dir.selfSize > needToFree && dir.selfSize <= min) {
    min = dir.selfSize;
  }
  dir.dirs.forEach((subDir) => {
    findSmallestToFree(subDir);
  });
};

findSmallestToFree(rootDir!);
console.log({ min });
