let ground = [0, 0];
let groundY = 0;

var prePose = [];

function arraySum(array: Array<number>) {
  return array.reduce((prev, curr) => prev + curr);
}

export function getGroundY(pose: any) {
  let rightFootY = pose["keypoints"][16]["position"]["y"];

  rightFootY -= (rightFootY - groundY) * 0.3;
  if (ground.length > 30) {
    ground.pop();
  }
  if (pose["keypoints"][16]["score"] > 0.5) {
    ground.unshift(rightFootY);
  }

  groundY = arraySum(ground) / ground.length;
  return groundY;
}

export function getLength(p1: any, p2: any) {
  let dx = p2["x"] - p1["x"];
  let dy = p2["y"] - p1["y"];

  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}

export function getAngle(p1: any, p2: any, p3: any) {
  const dx1 = p2["x"] - p1["x"];
  const dy1 = p2["y"] - p1["y"];
  const dx2 = p2["x"] - p3["x"];
  const dy2 = p2["y"] - p3["y"];

  const abs1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
  const abs2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

  const dp = dx1 * dx2 + dy1 * dy2;
  return Math.acos(dp / (abs1 * abs2)) * (180 / Math.PI);
}
