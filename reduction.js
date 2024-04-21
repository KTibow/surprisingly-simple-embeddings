/*
hey!
this file brings the embeddings to 0.6% of the size by pruning unused ones, and calculates the idf factors.
basically, we take the word embeddings, see which ones are used (or popular in english), remove the unused ones and discredit the heavily used ones (lower idf factor), and put it into a new file.
*/
import glob from "fast-glob";
import { readFile, writeFile } from "fs/promises";
import { tokenize } from "./_lib.js";

console.log("listing used tokens");
const tokensOccurences = {};
let docCount = 0;
for (const file of await glob("esphome-docs/**/*.rst")) {
  if (file == "esphome-docs/guides/supporters.rst") continue;
  const content = await readFile(file, "utf8");
  for (const token of new Set(tokenize(content))) {
    if (!tokensOccurences[token]) tokensOccurences[token] = 0;
    tokensOccurences[token]++;
  }
  docCount++;
}

let content = await readFile("./wiki-100k.txt", "utf8");
content = content.replace(/^#.*\n/gm, "");
content = content.split("\n").slice(0, 3000).join(" ");
let contentT = tokenize(content);

let progress = 0;
while (progress < 1036) {
  const token = contentT.shift();
  if (tokensOccurences[token] == undefined) {
    tokensOccurences[token] = 0;
    progress++;
  }
}

console.log("loading embeddings");
const embeddingsStr = await readFile("./glove.twitter.27B.25d.txt", "utf8");

console.log("processing embeddings");
const rows = [];

for (const embedding of embeddingsStr.split("\n")) {
  const w = embedding.split(" ")[0];
  if (tokensOccurences[w] == undefined) continue;
  const fractionIncluded = (tokensOccurences[w] + 1) / docCount;
  const idf = Math.log(1 / fractionIncluded);
  rows.push(
    `${w} ${idf.toFixed(3)} ${embedding
      .split(" ")
      .slice(1)
      .map((x) => parseFloat(x).toFixed(3))
      .join(" ")}`
  );
}
rows.sort();

console.log("writing", rows.length, "rows");
await writeFile("./glove-25d-reduced.txt", rows.join("\n"));
