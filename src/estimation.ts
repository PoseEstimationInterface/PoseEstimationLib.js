import * as posenet from "@tensorflow-models/posenet";

let net: posenet.PoseNet;

export async function initialize() {
  net = await posenet.load({
    architecture: "ResNet50",
    outputStride: 16,
    inputResolution: 500,
    multiplier: 1,
    quantBytes: 1
  });
}

export async function estimatePose(input: any, flipHorizontal: boolean) {
  if (!net) {
    throw new Error("not initialized, must call initialize");
  }

  return await net.estimatePoses(input, {
    decodingMethod: "single-person",
    flipHorizontal
  });
}

export async function estimatePoses(input: any, flipHorizontal: boolean) {
  if (!net) {
    throw new Error("not initialized, must call initialize");
  }

  return await net.estimatePoses(input, {
    decodingMethod: "multi-person",
    flipHorizontal
  });
}
