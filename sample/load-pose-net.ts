import * as estimation from "../lib/estimation";

async function main() {
  await estimation.initialize();
  console.log("Model Loaded");
}

main();
