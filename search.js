import glob from "fast-glob";
import { readFile } from "fs/promises";
import { tokenize } from "./_lib.js";

const embeddingsStr = await readFile("./glove-25d-reduced.txt", "utf8");
const embeddings = Object.fromEntries(
  embeddingsStr.split("\n").map((x) => [
    x.split(" ")[0],
    {
      idf: parseFloat(x.split(" ")[1]),
      values: x
        .split(" ")
        .slice(2)
        .map((x) => parseFloat(x)),
    },
  ])
);

const embed = (tokens) => {
  let output = Array.from({ length: 25 }, () => 0);
  let total = 0;
  for (let token of tokens) {
    if (!embeddings[token]) {
      continue;
    }
    const { idf, values } = embeddings[token];

    for (let i = 0; i < values.length; i++) {
      output[i] += values[i] * idf;
    }
    total += idf;
  }

  if (total == 0) return null;
  return output.map((x) => x / total);
};
const cosine = (a, b) => {
  const a_norm = a.map((x) => x * x).reduce((a, b) => a + b);
  const b_norm = b.map((x) => x * x).reduce((a, b) => a + b);
  return (
    a.map((x, i) => x * b[i]).reduce((a, b) => a + b) /
    Math.sqrt(a_norm * b_norm)
  );
};

const pages = [];
for (const file of await glob("esphome-docs/**/*.rst")) {
  const content = await readFile(file, "utf8");
  const tokens = tokenize(content.split("\n")[0]);
  const embedding = embed(tokens);

  if (!embedding) continue;
  pages.push({ file, tokens, embedding });
}

const input = process.argv[2];
const inputEmbedding = embed(tokenize(input));

const results = pages
  .map((x) => ({
    ...x,
    similarity: cosine(x.embedding, inputEmbedding),
  }))
  .sort((a, b) => b.similarity - a.similarity)
  .slice(0, 10);
console.log(results);
