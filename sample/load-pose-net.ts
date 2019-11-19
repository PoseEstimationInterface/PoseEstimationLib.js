import * as pose from "../lib/pose";

async function main() {
  await pose.initialize();
  console.log("Model Loaded");
}

main();
