function arraySum(array: Array<number>) {
  return array.reduce((prev, curr) => prev + curr);
}

let ground = [0, 0];
let groundY = 0;

/**
 * 바닥의 높이를 구하는 함수입니다.
 * 최근 30프레임의 평균 발 높이를 반환합니다.
 * @param pose 포즈 데이터 배열
 */
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

/**
 * 두점의 거리를 구하는 함수입니다.
 * @param p1 점1
 * @param p2 점2
 */
export function getLength(p1: any, p2: any) {
  let dx = p2["x"] - p1["x"];
  let dy = p2["y"] - p1["y"];

  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}

/**
 * 세점의 사이의 각도를 구하는 함수입니다.
 * @param p1 점1
 * @param p2 점2
 * @param p3 점3
 */
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

const prePose: any = [];

/**
 * 관절 정점의 벡터를 계산합니다.
 * @param pointNum 관절 번호
 * @param threshold 임계치
 */
export function getVector(pointNum: any, threshold: number) {
  let length = getLength(
    prePose[0]["keypoints"][pointNum]["position"],
    prePose[3]["keypoints"][pointNum]["position"]
  );

  let vectorX =
    prePose[0]["keypoints"][pointNum]["position"]["x"] -
    prePose[3]["keypoints"][pointNum]["position"]["x"];

  let vectorY =
    prePose[0]["keypoints"][pointNum]["position"]["y"] -
    prePose[3]["keypoints"][pointNum]["position"]["y"];

  vectorX /= length;
  vectorY /= length;

  length /= 3.0;

  if (length < threshold) {
    vectorX = 0;
    vectorY = 0;
    length = 0;
  }

  return [length, vectorX, vectorY];
}
